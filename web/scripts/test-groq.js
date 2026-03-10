// scripts/test-groq.js
// Run this with: node scripts/test-groq.js
// It will list categories and for each category run the same query used by fetchBlogPosts

const path = require('path');
// Load dotenv if available (optional). If dotenv isn't installed, continue using process.env.
try {
  // eslint-disable-next-line global-require
  require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });
} catch (e) {
  // dotenv not installed — that's okay if env vars are provided by the environment
}

const { client } = require('../src/sanity/client');
const { groq } = require('next-sanity');

async function listCategories() {
  const cats = await client.fetch(groq`*[_type == "category"]{_id, title_en, "slug": slug.current}`);
  return cats;
}

async function testForSlug(slug) {
  const query = groq`
    *[_type == "post" && publishedAt < now() && category->slug.current == $categorySlug] {
      _id, title_en, slug, publishedAt, "category": category->{_id, title_en, "slug": slug.current}
    }
  `;
  const posts = await client.fetch(query, { categorySlug: slug });
  return posts;
}

(async function main(){
  try {
    const cats = await listCategories();
    console.log('Found categories:', cats.length);
    for (const c of cats) {
      console.log('\n== Testing slug:', c.slug, 'title:', c.title_en);
      const posts = await testForSlug(c.slug);
      console.log('Posts found:', posts.length);
      if (posts.length > 0) {
        console.log(posts.map(p => ({ _id: p._id, title: p.title_en, category: p.category }))); 
      }
    }
  } catch (err) {
    console.error('Error running tests:', err);
    process.exit(1);
  }
})();
