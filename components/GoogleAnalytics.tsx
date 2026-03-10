// components/GoogleAnalytics.tsx
'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function GoogleAnalytics() {
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        let fired = false;
        const fire = () => {
            if (!fired) {
                fired = true;
                setShouldLoad(true);
                cleanup();
            }
        };

        // Trigger on any real interaction (scroll, click, keypress)
        const timer = setTimeout(fire, 5000); // fallback after 5s
        window.addEventListener('scroll', fire, { once: true, passive: true });
        window.addEventListener('pointerdown', fire, { once: true });
        window.addEventListener('keydown', fire, { once: true });

        const cleanup = () => {
            window.removeEventListener('scroll', fire);
            window.removeEventListener('pointerdown', fire);
            window.removeEventListener('keydown', fire);
            clearTimeout(timer);
        };

        return cleanup;
    }, []);

    if (!shouldLoad) return null;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=G-RRB6DKZPQ9`}
                strategy="lazyOnload"  // or "lazyOnload" as fallback
            />
            <Script id="gtag-init" strategy="lazyOnload">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-RRB6DKZPQ9',{ 'debug_mode':true });
        `}
            </Script>
        </>
    );
}