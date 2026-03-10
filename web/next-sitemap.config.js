/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://aligoo-digital.agency",
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Serve only one sitemap.xml
  exclude: [
    '/proposal', '/proposal/*', '/*/proposal/*',
    '/telegram', '/telegram/*', '/*/telegram/*',
    '/test', '/test/*', '/*/test/*',
    '/maintenance', '/maintenance/*', '/*/maintenance/*',
    '/strategy-session', '/strategy-session/*', '/*/strategy-session/*',
    '/services-back', '/services-back/*', '/*/services-back/*',
    '/'
  ],
  additionalPaths: async (config) => {
    const result = [];
    const langs = ['en', 'am'];
    const services = [
      'facebook-ad',
      'graphic-design',
      'web-design',
      'funnel-mapping',
      'content-marketing',
      'seo',
      'tiktok-ad',
      'digital-marketing'
    ];

    for (const lang of langs) {
      // Core pages
      result.push(await config.transform(config, `/${lang}/blog`));
      result.push(await config.transform(config, `/${lang}/works`));
      result.push(await config.transform(config, `/${lang}/about`));
      result.push(await config.transform(config, `/${lang}/contact`));

      // Services
      for (const service of services) {
        result.push(await config.transform(config, `/${lang}/services/${service}`));
      }
    }

    // Root domain without lang - removed because it redirects to /en
    // result.push(await config.transform(config, `/`));

    return result;
  },
};

module.exports = config; // Use module.exports instead of export default