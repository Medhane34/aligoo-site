# Sanity API Fallback Strategy (Emergency Survival Mode)
**Documentation & Implementation Guide**

---

## 🚨 The Situation
Your Sanity API quota (250k calls/month) has been exceeded. This normally causes the website to crash because every page relies on fetching content from Sanity. 

**The Solution:** We implemented an **Interceptor Pattern** that catches these failures and seamlessly serves static "fallback" data instead. The site remains online, fully functional, and fast.

---

## 🏗 Architecture: How it Works

We did **not** need to modify every page or component. Instead, we applied a fix at the *source*.

### The "Interceptor" (Wrapper)
We modified the central `src/sanity/client.ts` file. 

1.  **Original Client**: We create the standard Sanity client.
2.  **Intercept Fetch**: We override the `fetch` method.
3.  **Try/Catch Logic**:
    *   **Try**: It attempts to fetch data from Sanity API.
    *   **Catch**: If it fails (e.g., Quota Error), it looks at the `query` string to decide what data you were asking for.
    *   **Serve Fallback**: It returns the matching static JSON object from `lib/sanity-fallback-data.ts`.

**Why this is effective:**
*   **Zero Component Changes**: Your `HeroSection`, `AboutUs`, etc., still think they are calling Sanity. They receive data in the exact same format effectively "tricking" them into rendering.
*   **Automatic Restoration**: Once your quota resets (or if you upgrade), the "Try" block will succeed again, and the site will automatically start showing live data.

---

## 📂 Fallback Data Organization

Currently, we have a single file `lib/sanity-fallback-data.ts` for the homepage. As you expand this to other pages, we recommend the following folder structure to keep things clean.

### Recommended Structure
```text
/lib
  /data-fallbacks
     index.ts        <-- Exports everything
     homepage.ts     <-- Hero, Services, Stats
     about-page.ts   <-- About page specific content
     services/
        seo.ts       <-- SEO Service page content
        web-design.ts
     blog.ts         <-- Mock blog posts
```

### Naming Convention
Use constant names that match theGROQ query type to make mapping easy:
-   `FALLBACK_HOMEPAGE_HERO`
-   `FALLBACK_SERVICE_SEO`

---

## 📝 Implementation Guide: Adding New Pages

To protect a new page (e.g., "Graphic Design Service Page") from crashing:

### Step 1: Capture the Data
Go to your Sanity Studio (Vision Tool) or look at the console logs we added, and copy the **raw JSON response** for that page's query.

### Step 2: Create the Fallback
Add it to your data file (e.g., `lib/sanity-fallback-data.ts`):
```typescript
export const FALLBACK_GRAPHIC_DESIGN = {
   title: "Graphic Design",
   description: "We make cool logos...",
   // ... rest of the JSON
};
```

### Step 3: Register the Interceptor
Open `src/sanity/client.ts` and add a new detection line in the `fetchWrapper` function:

```typescript
// src/sanity/client.ts

if (queryStr.includes('"graphicDesign"')) return FALLBACK_GRAPHIC_DESIGN as unknown as R;
// OR if you query by slug
if (queryStr.includes('slug.current == "graphic-design"')) return FALLBACK_GRAPHIC_DESIGN as unknown as R;
```

**Tip**: The key is to find a unique string in your GROQ query (like `_type == "ctaSection"`) and match it.

---

## ✅ Verification
You can verify the fallback is working by:
1.  **Terminal Logs**: We added a warning log: `⚠️ Sanity Fetch Failed... Switching to Fallback Data.`
2.  **Visual Check**: If the site loads but content matches your static TS file instead of Studio updates.

---

## ❓ FAQ

**Q: Is Sanity configuration alone enough?**
A: No. Sanity config just connects to the API. If the API rejects you (Quota), the config can't save you. You *need* this client-side interception code.

**Q: Does this affect Server or Client components?**
A: **Both**. Since both use the same `client` imported from `src/sanity/client.ts`, both Server Components (SSR) and Client Components (CSR) are protected.

**Q: Do I need to build/deploy after changing fallback text?**
A: **Yes**. Since this data is hardcoded in the application bundle, you must redeploy for text changes to take effect.
