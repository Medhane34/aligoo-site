# Intelligent Chat Support Widget
**Feature Documentation**

---

## 🚀 Overview
The **Chat Support Widget** is a high-performance, conversion-focused communication tool designed to bridge the gap between visitors and the support team. Unlike static "Contact Us" buttons, this widget behaves like an intelligent agent—appearing only when the user shows intent (scrolling) and actively engaging them with auto-greetings.

It offers a direct line to **WhatsApp**, the most popular messaging platform in the region, ensuring high open and response rates.

---

## ✨ Key Features

### 1. 🧠 Behavioral Visibility Triggers
The widget doesn't clutter the screen immediately. It respects the user's journey:
-   **Smart Scroll Detection**: Appears only after the user has scrolled **50%** of the page (showing interest).
-   **Short Page Awareness**: If a page is short (no scroll needed), it appears immediately to ensure accessibility.
-   **Result**: Keeps the initial landing view clean for maximum visual impact.

### 2. 👋 Engagement Automation
-   **Auto-Greeting Tooltip**: If the user sees the button but hasn't clicked it within **3 seconds**, a friendly tooltip ("Have questions? Chat with us!") pops up to nudge them.
-   **Notification Badge**: A pulsing green dot and an animated ripple effect draw subtle attention to the button without being annoying.

### 3. 💬 Seamless WhatsApp Integration
-   **Pre-filled Messages**: Clicking "Chat on WhatsApp" opens a conversation with a context-aware message: *"Hi Aligoo Team, I'm checking out your website..."*
-   **Direct Connection**: Bypasses forms and tickets, connecting users directly to a human agent.

### 4. 🎨 Premium UI/UX
-   **Personalized Profile**: Displays a support manager's name, role, and real avatar to build trust.
-   **Smooth Animations**: Utilizing `Framer Motion` for fluid entrance, exit, and expansion animations.
-   **Glassmorphism**: Uses a modern dark-glass effect (`backdrop-blur-xl`) to blend seamlessly with the site's aesthetic.

---

## 🛠 Technical Architecture

**Component:** `components/molecules/ChatSupport.tsx`

### Logic Flow
1.  **Mount**: Widget mounts but remains hidden (`isVisible = false`).
2.  **Scroll Listener**: Checks scroll depth.
    *   If `scrollY > windowHeight * 0.5` OR `docHeight <= windowHeight`, set `isVisible = true`.
3.  **Engagement Timer**: Once visible, a 3-second timer starts. If no click happens, `showGreeting` becomes true.
4.  **Interaction**: Clicking the FAB (Floating Action Button) expands the full chat card.

### Code Snippet (Configuration)
```typescript
export default function ChatSupportWidget() {
    // 🔧 Configuration Constants
    const managerName = "Aligoo Support"
    const managerRole = "Customer Success"
    const managerImage = "/team/avatar-1.jpeg" // Path to avatar
    const whatsappNumber = "251910584712" // Target WhatsApp number

    // ... logic implementation
}
```

---

## 💼 Business Value
1.  **Instant Trust**: Seeing a real person (avatar + name) reduces the "faceless corporation" feeling.
2.  **Zero-Friction Conversion**: WhatsApp is already installed on most users' phones. No new apps to download, no forms to fill.
3.  **Lead Capture**: Every conversation started captures a phone number automatically via WhatsApp.

---

## ⚙️ Customization Guide

### Changing the Support Agent
Locate the variables at the top of `ChatSupportWidget.tsx`:
-   **Name**: Update `managerName`.
-   **Role**: Update `managerRole`.
-   **Avatar**: Replace the file at `/public/team/avatar-1.jpeg` or update the `managerImage` path.

### Updating Contact Number
-   **WhatsApp**: Edit the `whatsappNumber` constant. **Note**: Use international format without `+` (e.g., `25191...`).

### Adjusting Triggers
-   **Scroll Threshold**: Search for `windowHeight * 0.5` (50%) and change to `0.3` (30%) or `0.7` (70%) as needed.
-   **Greeting Delay**: Search for `setTimeout(..., 3000)` and change `3000` to your desired milliseconds.
