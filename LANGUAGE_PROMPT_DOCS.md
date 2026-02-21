# Smart Location-Based Language Prompt Feature
**Technical Documentation & Feature Overview**

---

## 🚀 Overview
The **Smart Location-Based Language Prompt** is an intelligent user experience (UX) feature designed to automatically detect a visitor's geographic location and suggest their native language. This removes friction for international users, ensuring they can access content in the language they are most comfortable with, significantly improving engagement and reducing bounce rates.

Instead of an intrusive popup that blocks the entire screen immediately, this feature is designed to be **polite and behavior-aware**. It waits for user engagement signals (time on site or scroll depth) before appearing.

---

## ✨ Key Features & Functionalities

### 1. 🌍 Geo-IP Detection
-   **Precision Targeting**: Uses Vercel's Edge Network headers to identify the visitor's country of origin with high accuracy.
-   **Server-Side Logic**: Detection happens on a lightweight API route, ensuring no performance penalty on the client side.

### 2. 🧠 Smart Visibility Triggers
The prompt does not annoy users by appearing instantly. It intelligently waits for interest signals:
-   **Time-Based**: Appears after **5 seconds** of dwelling on the page.
-   **Scroll-Based**: Appears if the user scrolls past **40%** of the page height.
-   **Logic**: Whichever condition is met first triggers the prompt.

### 3. 💾 Intelligence & Persistence
-   **Preference Memory**: If a user dismisses the prompt or accepts the switch, their preference is saved in `localStorage`. They will **never** be bugged again.
-   **Context Aware**: If the user is already browsing the target language version (e.g., `/am/...`), the prompt stays hidden.

### 4. 🎨 Adaptive UI/UX
-   **Device Responsive**: 
    -   **Mobile**: Centers elegantly on the screen (Modal style) to avoid conflict with other floating elements like chat buttons.
    -   **Desktop**: Floats unobtrusively in the bottom-left corner.
-   **Animations**: Smooth entry/exit animations using `Framer Motion` for a premium feel.
-   **Visuals**: Includes country flag icons coverage and beautiful gradient borders.

---

## 🛠 Technical Architecture

The feature consists of three main parts:

### 1. The Detector (API Route)
A lightweight Next.js API route that reads the `x-vercel-ip-country` header.

**File:** `app/api/location/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    // Automatically populated by Vercel Edge Network
    const country = request.headers.get('x-vercel-ip-country') || 'US';
    return NextResponse.json({ country });
}
```

### 2. The Smart Component (Client-Side)
Handles the logic for timing, scrolling, checking preferences, and rendering the UI.

**File:** `components/LanguagePrompt.tsx`
*Key Snippet: Visibility Logic*
```typescript
useEffect(() => {
    // Check for existing preference or current language
    if (localStorage.getItem("language_preference") || pathname.startsWith("/am")) return;

    // Triggers
    const handleScroll = () => {
        if (getScrollPercent() > 40) showPrompt();
    };
    const timer = setTimeout(() => showPrompt(), 5000); // 5s Delay
    
    // ... cleanup logic
}, [pathname]);
```

### 3. Global Integration
The component is mounted once in the root layout to ensure it works across the entire application.

**File:** `app/layout.tsx`
```tsx
import LanguagePrompt from "@/components/LanguagePrompt";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
          <LayoutUI>
             <LanguagePrompt />
             {children}
          </LayoutUI>
      </body>
    </html>
  );
}
```

---

## 💼 Business Value for Clients
Why should clients include this feature in their website?

1.  **Reduced Bounce Rates**: Users often leave immediately if they see a foreign language. This prompt catches them with a friendly "Welcome" in their own language.
2.  **Higher Conversion**: Users are 72% more likely to buy or convert on a site in their native language.
3.  **Premium Perception**: Features like this signal that the brand is global, tech-savvy, and cares about user experience.
4.  **Non-Intrusive**: Unlike standard popups, this respects the user's focus by waiting for engagement signals.

---

## ⚙️ Customization Guide
-   **Target Country**: Change `if (data.country === 'ET')` in `LanguagePrompt.tsx` to any ISO 2-letter country code (e.g., 'DE' for Germany, 'FR' for France).
-   **Triggers**: Adjust the `setTimeout` (currently 5000ms) or scroll threshold (currently 40%) variables.
-   **Styling**: The component uses Tailwind CSS, making it easy to rebrand colors and positions.
