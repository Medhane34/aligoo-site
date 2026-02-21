# Maintenance Mode Strategy & Design Plan

## 🎨 Visual Design Concept: "Updating the Engine"

Since Aligoo is a digital agency, the maintenance page shouldn't just say "We'll be back". It should reinforce the brand's tech-forward identity.

**Theme:** "Upgrading our Core"
**Colors:** Aligoo Orange (`#e78a53`), Deep Black/Grey (`#0a0a0a`), and Clean White.
**Vibe:** Premium, Industrial, Digital.

### **Layout Structure**
1.  **Centerpiece**: A sleek, animated geometric element (using Framer Motion).
    *   *Idea:* A rotating 3D cube or a pulsing digital node network using the orange accent color.
2.  **Headline**: "We're Leveling Up."
3.  **Subtext**: "The Aligoo experience is being upgraded. We'll be back online in [Duration/Short time]."
4.  **Action Buttons**:
    *   **"Contact Us"**: `mailto:info@aligoo.com` (Primary Button)
    *   **"Call Us"**: `tel:+251...` (Secondary/Outline Button)
5.  **Social Footer**: Icons for Instagram/Telegram/LinkedIn to keep engagement alive elsewhere.

---

## 🛠 Technical Implementation Plan

We will implement this using **Next.js Middleware + Environment Variables**. This allows you to toggle maintenance mode ON/OFF instantly via Vercel Dashboard without re-deploying code.

### 1. The Component (`app/maintenance/page.tsx`)
A standalone page that does *not* use the main layout (to avoid navigation bars appearing).
-   **Features**:
    -   `framer-motion` for smooth entrance.
    -   `lucide-react` for icons.
    -   **Email Capture Form** (Optional): "Notify me when you're back."

### 2. The Middleware (`middleware.ts`)
We will modify your existing `clerkMiddleware` to check for a `MAINTENANCE_MODE` environment variable first.

**Logic Flow:**
1.  User visits `/any-page`.
2.  Middleware checks: Is `MAINTENANCE_MODE === "true"`?
3.  **Yes**: Rewrite to `/maintenance`.
4.  **No**: Proceed to website (normal behavior).
5.  **Exception**: Always allow `/studio` (Sanity), `/api` (Backend), and static assets so *you* can still work.

### 3. Vercel Configuration (How to toggle)
You won't need to push code to turn it on/off.
1.  Go to **Vercel Dashboard** > **Settings** > **Environment Variables**.
2.  Add `MAINTENANCE_MODE` = `true`.
3.  Redeploy (or specific "Promote" depending on setup, usually requires a redeploy for Env vars to stick on Edge).

---

## ⚖️ Alternatives: "Partial" Fallback

Since we **already fixed the Homepage** with the fallback system, you don't necessarily need to block the *entire* site.

**Alternative Option: "Construction Zones"**
Instead of a global maintenance wall, we can:
1.  Keep **Home** active (since it works).
2.  Redirect **broken pages** (like `Works` or `Blog` if they fail) to a "Coming Soon" page individually.

**Recommendation:**
Given your request for next 5 days of work, a **Global Maintenance Page** is the safest bet to avoid users seeing half-broken pages while you fix them one by one. Once you fix a section (e.g. Services), you can potentially turn off maintenance mode if you are confident.

---

## 📅 Next Steps Execution
1.  **Design**: I will build the `app/maintenance/page.tsx` with high-end animations.
2.  **Config**: I will update `middleware.ts`.
3.  **You**: Set the Env Var on Vercel.
