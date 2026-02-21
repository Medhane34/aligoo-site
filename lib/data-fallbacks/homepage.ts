
// Mock data to survive Sanity API quota limits
// Designed to match the Raw GROQ response expected by fetch functions in lib/homepage.ts

import { Span } from "next/dist/trace";

export const FALLBACK_HERO = {
    badgeText_am: "💥 7 ዶላር ሞክረን",
    badgeText_en: "Welcome to Our V2 Site!",
    headlineText1_am: "ክሊኮችን ደንበኛዎችን እና ሽያጮች",
    headlineText1_en: "Digital marketing that",
    headlineText2_am: "የሚያመጣ",
    headlineText2_en: "delivers",
    headlineText3_am: "የዲጅታል ማርኪቲንግ አገልግሎት",
    headlineText3_en: "clarity, clicks, and conversions",
    primaryButtonText_am: "🚀ሰትራቲጅክ ምክር ቀጠሮ ያዝ",
    primaryButtonText_en: "🚀 Book a Consultation",
    primaryButtonUrl: "https://aligoo-digital.agency/strategy-session",
    secondaryButtonText_am: "👇አገልግሎት ለማየት",
    secondaryButtonText_en: "👇Explore our Service",
    secondaryButtonUrl: "https://aligoo-digital.agency/#service-section ",
    subheading_am: "ብልህ የቢዝነሰ ዌብሳይቶችን እንገነባለን፣ ዉጤታማ ማስታወቂያ ካምፔኖችን ፣ እና ሰዎችን በእውነት ወደ እርምጃ የሚያነሳሳ ኮንቶንቶችን እናዘጋጃለን ።",
    subheading_en: "Aligoo is a full-service digital marketing agency based in Addis Ababa. We build smart websites, run killer ad campaigns, and craft content that actually gets people to act.",
};

export const FALLBACK_ABOUT = {
    sectionHeading_en: "WHO ARE WE",
    sectionHeading_am: "እኛ ማን ነን",
    accentText_en: "Built in Addis. Obsessed with Growth",
    accentText_am: "አዲስ አበባ ውስጥ የተገነባ። ከዕድገት ጋር የተዛመደ ማንነት",
    paragraphs_en: [
        "At Aligoo, we're not just a digital marketing agency — we're your behind-the-scenes growth partners. Based in Addis Ababa and built with purpose, our mission is to help forward-thinking brands break through the noise with clarity, creativity, and measurable results.",
        "We blend strategic thinking with creative craftsmanship, turning ambitious ideas into campaigns, websites, and content that drive real business impact."
    ],
    paragraphs_en2: [
        "We blend strategic thinking with creative craftsmanship, turning ambitious ideas into campaigns, websites, and content that drive real business impact. Whether you’re a startup or scaling enterprise, we meet you where you are — and take you where you want to be."
    ],
    paragraphs_am: [
        "አሊጎ፣ እኛ ዲጂታል ማርኪቲንግ ኤጀንሲ ብቻ አይደለንም — ከጀርባ የእድገትህ አጋሮች ነን።",
        "በአዲስ አበባ የተመሠረተና በዓላማ የተገነባ፣ የፊት አርቀዉ ለሚያሰቡ ቢዝነሶች በግልጽነት፣ በፈጠራ፣ እና ሊለካ በሚችል ውጤት እንዲያልፉ መርዳት ዓላማችን ነው",

    ],
    paragraphs_am2: [
        "ስትራቴጂካዊ አስተሳሰብን ከፈጠራ ጥበብ ጋር በማዋሃድ፣ ተነሳሽ ሃሳቦችን ወደ እውነተኛ የንግድ ተፅዕኖ የሚያመጡ ካምፔኖችን፣ ዌብሳይቶችን እና ኮንቶንቶችን እንቀይራለን",

    ],

    imageUrl: "/images/about-fallback.jpg",
    imageAlt: "Team working together",
    buttonText_en: "Read More About Us",
    buttonText_am: "ስለ እኛ የበለጠ ያንብቡ",
    buttonUrl: "/about"
};

export const FALLBACK_STATS = {
    stats_en: [
        { label: "Clients", value: 50, suffix: "+", duration: 2 },
        { label: "Projects", value: 120, suffix: "+", duration: 2 },
        { label: "Years", value: 4, suffix: "+", duration: 2 },
        { label: "Client Retention", value: 85, suffix: "%", duration: 2 }
    ],
    stats_am: [
        { label: "ደንበኞች", value: 50, suffix: "+", prefix: "", duration: 2 },
        { label: "ፕሮጀክቶች", value: 120, suffix: "+", prefix: "", duration: 2 },
        { label: "ዓመታት", value: 4, suffix: "+", prefix: "", duration: 2 },
        { label: "የደንበኞች የሚያመጣ", value: 85, suffix: "%", prefix: "", duration: 2 }
    ],
    // Alias for projection
    stats: [

        { label: "Clients", value: 50, suffix: "+", duration: 2 },
        { label: "Projects", value: 120, suffix: "+", duration: 2 },
        { label: "Years", value: 4, suffix: "+", duration: 2 },
        { label: "Client Retention", value: 85, suffix: "%", duration: 2 }
    ],

    footerText_en: "CREATIVE POSSIBILITIES",
    footerText_am: "ማለቂያ የሌላቸው አማራጮች"
};

export const FALLBACK_SERVICES = {
    sectionHeading_en: "Our Services",
    sectionHeading_am: "አገልግሎቶቻችን",
    accentText_en: "What We Offer",
    accentText_am: "የምንሰጣቸው አገልግሎቶች",
    columns_en: [
        {
            title: "Strategy ",
            description: "We dive deep into your brand, audience, and market — so every move we make is backed by insight, not guesswork.",
            services: [
                { title: "Digital Marketing Strategy", description: "Make the right moves, in the right channels, at the right time.", link: `en/services/digital-marketing`, iconUrl: null },
                { title: "Content Strategy", description: "Build a brand story people actually care about.", link: `en/services/content-strategy`, iconUrl: null },
                { title: "Funnel Mapping", description: "Design journeys that convert strangers into superfans.", link: `en/services/funnel-mapping`, iconUrl: null }
            ]
        },
        {
            title: "Design",
            description: "We don’t just make things look good — we design with purpose, personality, and performance in mind.",
            services: [
                { title: "Web Design", description: "Beautiful, blazing-fast websites that work hard for your brand.", link: `en/services/web-design`, iconUrl: null },
                { title: "Graphic Design", description: "Scroll-stopping visuals that turn interest into clicks.", link: `en/services/graphic-design`, iconUrl: null },

            ]
        },
        {
            title: "Execution",
            description: "This is where the magic happens. From ads to analytics, we bring your strategy to life — and keep optimizing for results.",
            services: [
                { title: "Facebook & Instagram Ads", description: "Modern, responsive websites.", link: `en/services/web-design`, iconUrl: null },
                { title: "SEO", description: "Rank higher on Google.", link: `en/services/seo`, iconUrl: null },
                { title: "TikTok Ads", description: "Optimize customer journey.", link: `en/services/tiktok-ad`, iconUrl: null }
            ]
        }
    ],
    columns_am: [
        {
            title: "ስትራቴጂ",
            description: "በብራንድህ፣ በታዳሚዎችህ፣ እና በገበያህ ውስጥ በጥልቀት እንገባለን — እያንዳንዱ እርምጃ በግንዛቤ የተደገፈ ይሆናል፣ በግምት አይደለም።",
            services: [
                { title: "ዲጂታል ግብይት ስትራቴጂ", description: "ትክክለኛውን እርምጃ በትክክለኛው ቻናል በትክክለኛው ጊዜ ያድርጉ።", link: `en/services/digital-marketing`, iconUrl: null },
                { title: "የይዘት ስትራቴጂ", description: "ሰዎች በእውነት የሚጨነቁበት የብራንድ ታሪክ ይገንቡ።", link: `en/services/content-strategy`, iconUrl: null },
                { title: "የፈንገል ካርታ", description: "እንግዳዎችን ወደ ሱፐርፋን የሚቀይሩ ጉዞዎችን ዲዛይን ያድርጉ።", link: `en/services/funnel-mapping`, iconUrl: null }
            ]
        },
        {
            title: "ዲዛይን",
            description: "ነገሮችን ቆንጆ ለማድረግ ብቻ አይደለም — በዓላማ፣ በግላዊነት፣ እና በአፈጻጸም ዲዛይን እናደርጋለን።",
            services: [
                { title: "ድር ጣቢያ ዲዛይን", description: "ቆንጆ፣ በጣም ፈጣን ድር ጣቢያዎች ለብራንድህ በትጋት ይሰራሉ።", link: `en/services/digital-marketing`, iconUrl: null },
                { title: "ግራፊክ ዲዛይን", description: "ፍላጎትን ወደ ክሊክ የሚቀይሩ ስክሮል-ማቆሚያ ቪዥዋሎች።", link: `en/services/digital-marketing`, iconUrl: null }
            ]
        },
        {
            title: "ትግበራ",
            description: "ይህ ነው ጠንቋይው የሚሆነው። ከማስታወቂያ እስከ ትንታኔ፣ ስትራቴጅህን ወደ ሕይወት እናመጣለን — እና ውጤቶችን ለማሳደግ ቀጣይነት ያለው ማሻሻያ እናደርጋለን።",
            services: [
                { title: "ፌስቡክ እና ኢንስታግራም ማስታወቂያዎች", description: "ዘመናዊ፣ ምላሽ የሚሰጡ ድር ጣቢያዎች።", link: "/services/web-design", iconUrl: null },
                { title: "SEO", description: "በጉግል ላይ ከፍ አድርግ።", link: "/services/seo", iconUrl: null },
                { title: "ቲክቶክ ማስታወቂያዎች", description: "የደንበኛ ጉዞን አሻሽል።", link: "/services/tiktok-ad", iconUrl: null }
            ]
        }
    ],
    // Alias for projection
    columns: [
        {
            title: "Strategy ",
            description: "We dive deep into your brand, audience, and market — so every move we make is backed by insight, not guesswork.",
            services: [
                { title: "Digital Marketing Strategy", description: "Make the right moves, in the right channels, at the right time.", link: `en/services/digital-marketing`, iconUrl: null },
                { title: "Content Strategy", description: "Build a brand story people actually care about.", link: `en/services/content-strategy`, iconUrl: null },
                { title: "Funnel Mapping", description: "Design journeys that convert strangers into superfans.", link: `en/services/funnel-mapping`, iconUrl: null }
            ]
        },
        {
            title: "Design",
            description: "We don’t just make things look good — we design with purpose, personality, and performance in mind.",
            services: [
                { title: "Web Design", description: "Beautiful, blazing-fast websites that work hard for your brand.", link: `en/services/content-strategy`, iconUrl: null },
                { title: "Graphic Design", description: "Scroll-stopping visuals that turn interest into clicks.", link: `en/services/content-strategy`, iconUrl: null },

            ]
        },
        {
            title: "Execution",
            description: "This is where the magic happens. From ads to analytics, we bring your strategy to life — and keep optimizing for results.",
            services: [
                { title: "Facebook & Instagram Ads", description: "Modern, responsive websites.", link: "/services/web-design", iconUrl: null },
                { title: "SEO", description: "Rank higher on Google.", link: "/services/seo", iconUrl: null },
                { title: "TikTok Ads", description: "Optimize customer journey.", link: "/services/tiktok-ad", iconUrl: null }
            ]
        }
    ]
};

export const FALLBACK_PROCESS = {
    sectionHeading_en: "Our Process",
    sectionHeading_am: "አሰራራችን",
    accentText_en: "How We Work",
    accentText_am: "እንዴት እንደምንሰራ",
    steps_en: [
        { icon: "🚀", heading: "Get Started", description: "Fill out our contact form — tell us about your biz, your goals, your challenges, your wildest dreams (ok, maybe not all of them... yet). The more you share, the better we show up for you." },
        { icon: "📅", heading: "Book a Call", description: "Once we get your info, we’ll reach out to lock in a discovery call. This is where we listen hard, ask the right questions, and map out your best next move. Strategy mode: activated. 🚀" },
        { icon: "📄", heading: "Get Your Proposal", description: "No copy-paste offers here. You’ll get a tailored game plan packed with smart strategies, clear deliverables, transparent pricing, and realistic timelines. No fluff. No surprises." },
        { icon: "🤝", heading: " Let’s Build Together", description: "When you say go, we get moving. Expect regular updates, smooth communication, and work that actually delivers results — not just pretty reports." }
    ],
    steps_am: [
        { icon: "🚀", heading: "ጀምር", description: "የእውቂያ ፎርማችንን ሙላ — ስለ ንግድህ፣ ስለ ግቦችህ፣ ስለ ፈተናዎችህ፣ ስለ ተነሳሽ ህልሞችህ (ሁሉንም አይደለም… ገና) ንገረን። በተቻለህ መጠን ብዙ ትናገር፣ እኛም የተሻለ እንታደርግልሃለን።" },
        { icon: "📅", heading: "የጥሪ ቀጠሮ ይያዝ", description: "መረጃህን ካገኘን በኋላ፣ የግኝት ጥሪ ለማዘጋጀት እናነጋግርሃለን። እዚህ በትኩረት እንዳዘለን፣ ትክክለኛ ጥያቄዎችን እንጠይቃለን፣ እና የአንተን ቀጣይ ምርጥ እርምጃ እንመዘዝርልሃለን። ስትራቴጂ ሞድ፡ ተነሳ! 🚀" },
        { icon: "📄", heading: "ፕሮፖዛልህን ተቀበል", description: "እዚህ ኮፒ-ፔስት ቅናሾች የሉም። ብልህ ስትራቴጂዎች፣ ግልጽ ውጤቶች፣ ግልጽ ዋጋ፣ እና ተጨባጭ ጊዜ ያላቸው ለአንተ ብቻ የተዘጋጁ የጨዋታ እቅዶች ታገኛለህ። ምንም ተረት ተረት። ምንም ድንገተኛ ነገር።" },
        { icon: "🤝", heading: "አብረን እንገነባ", description: "አዎ ብለህ እንደተናገርክ፣ እኛ ወዲያውኑ እንንቀሳቀሳለን። ተከታታይ ዝማኔዎች፣ ለስላሳ ግንኙነት፣ እና በእውነት ውጤት የሚያመጡ ሥራዎች ትጠብቅ — ቆንጆ ሪፖርቶች ብቻ አይደለም።" }

    ],
    // Alias for projection
    steps: [
        { icon: "🚀", heading: "Get Started", description: "Fill out our contact form — tell us about your biz, your goals, your challenges, your wildest dreams (ok, maybe not all of them... yet). The more you share, the better we show up for you." },
        { icon: "📅", heading: "Book a Call", description: "Once we get your info, we’ll reach out to lock in a discovery call. This is where we listen hard, ask the right questions, and map out your best next move. Strategy mode: activated. 🚀" },
        { icon: "📄", heading: "Get Your Proposal", description: "No copy-paste offers here. You’ll get a tailored game plan packed with smart strategies, clear deliverables, transparent pricing, and realistic timelines. No fluff. No surprises." },
        { icon: "🤝", heading: " Let’s Build Together", description: "When you say go, we get moving. Expect regular updates, smooth communication, and work that actually delivers results — not just pretty reports." }
    ]
};


export const FALLBACK_WHY_US = {
    sectionHeading_en: "Why Choose Us",
    sectionHeading_am: "ለምን እኛን ይምረጡ",
    accentText_en: "This isn’t your average digital agency. Here’s why.",
    accentText_am: "የአሊጉ ልዩነት",
    reasons_en: [
        { emoji: "🐺", title: "We’re Built for the Underdogs", description: "We love working with small to medium-sized businesses — especially those overlooked by big agencies. We meet you where you are, and help you scale with strategy, not fluff.", gradient: "from-blue-500 to-cyan-500", span: "col-span-1" },
        { emoji: "📊", title: "Results Come First — Always", description: "We don’t throw buzzwords or pretty mockups. Everything we do is tied to clear goals: more traffic, more leads, more conversions. Creative work that actually performs.", gradient: "from-green-500 to-emerald-700", span: "col-span-1 row-span-2" },
        { emoji: "🌍", title: "Deep Local Understanding", description: "Based in Addis, we speak your market’s language — literally and culturally. We get the nuance of local buying behavior, and we bring it into your campaigns and design.", gradient: "from-orange-500 to-red-700", span: "col-span-1" },
        { emoji: "🎨", title: "Design with Soul", description: "Every pixel, word, and layout choice is intentional. Because your brand deserves more than templates — it needs a site and strategy that feels like you and wows your audience.", gradient: "from-purple-500 to-pink-500", span: "col-span-1" },
        { emoji: "📈", title: "Made for Growth — Not Just Launch", description: "A beautiful site is just step one. We build with marketing in mind — SEO, speed, funnel design, and flexibility — so your site doesn’t just look great, it performs and evolves.", gradient: "from-teal-500 to-cyan-700", span: "col-span-1" },
        { emoji: "🤝", title: "We’re With You, Not Above You", description: "No corporate ego. No confusing lingo. We partner like real people — collaborative, clear, responsive. We’ll treat your project like it’s our own.", gradient: "from-yellow-500 to-orange-700", span: "md:col-span-2 lg:col-span-2" },



    ],
    reasons_am: [
        { emoji: "🐺", title: "ለውሬዎቹ ተገንብተናል", description: "ትንንሽና መካከለኛ ንግዶችን መሥራት እንወዳለን — በተለይ ትላልቅ ኤጀንሲዎች የማያዩትን። በሆንክበት እንገናኝሃለን፣ በስትራቴጂ እንድታድግ እንረዳሃለን — በተረት ተረት አይደለም።", gradient: "from-blue-500 to-cyan-500", span: "col-span-1" },
        { emoji: "📊", title: "ውጤት ሁልጊዜ ቅድሚያ ነው", description: "በቃላት እንጣላቅ፣ ቆንጆ ሞክአፕ አናሳይም። የምናደርገው ሁሉ ከግልጽ ግቦች ጋር የተያያዘ ነው፡ ተጨማሪ ትራፊክ፣ ተጨማሪ መሪዎች፣ ተጨማሪ ሽያጮች። በእውነት የሚሰራ ፈጠራ።", gradient: "from-green-500 to-emerald-700", span: "col-span-1 row-span-2" },
        { emoji: "🌍", title: "ጥልቅ የአካባቢ ግንዛቤ", description: "በአዲስ የተመሠረተን እኛ የገበያህን ቋንቋ በቃልና በባህል እንናገራለን። የአካባቢ ደንበኛ የመግዛት አካሄድ ጥቃቅን ነገሮችን እንረዳለን፣ እና ወደ ዘመቻህና ዲዛይንህ እናስገባዋለን።", gradient: "from-orange-500 to-red-700", span: "col-span-1" },
        { emoji: "🎨", title: "ነፍስ ያለው ዲዛይን", description: "እያንዳንዱ ፒክስል፣ ቃል፣ እና አቀማመጥ በዓላማ የተመረጠ ነው። ብራንድህ ቴምፕሌት ብቻ ሳይሆን እንደ አንተ የሚሰማውና ታዳሚዎችህን የሚያስደንቅ ድር ጣቢያና ስትራቴጂ ይገባዋል።", gradient: "from-purple-500 to-pink-500", span: "col-span-1" },
        { emoji: "📈", title: "ለእድገት የተዘጋጀ — ለመጀመር ብቻ አይደለም", description: "ቆንጆ ድር ጣቢያ የመጀመሪያው እርምጃ ብቻ ነው። እኛ ግብይትን አስቦ እንገነባለን — SEO፣ ፍጥነት፣ ፈንገል ዲዛይን፣ እና ተለዋዋጭነት — ድር ጣቢያህ ቆንጆ ብቻ ሳይሆን የሚሰራና የሚያድግ ይሆናል።", gradient: "from-teal-500 to-cyan-700", span: "col-span-1" },
        { emoji: "🤝", title: "ከአንተ ጋር ነን፣ ከላይ አይደለንም", description: "ምንም ኮርፖሬት እብሪት። ምንም ግራ የሚያጋባ ቋንቋ። እንደ እውነተኛ ሰዎች እንተባበራለን — በጋራ፣ በግልጽ፣ በፍጥነት ምላሽ ሰጪ። ፕሮጀክትህን እንደ የራሳችን እንመለከተዋለን።", gradient: "from-yellow-500 to-orange-700", span: "md:col-span-2 lg:col-span-2" },
    ],
    // Alias for projection
    reasons: [
        { emoji: "🐺", title: "We’re Built for the Underdogs", description: "We love working with small to medium-sized businesses — especially those overlooked by big agencies. We meet you where you are, and help you scale with strategy, not fluff.", gradient: "from-blue-500 to-cyan-500", span: "col-span-1" },
        { emoji: "📊", title: "Results Come First — Always", description: "We don’t throw buzzwords or pretty mockups. Everything we do is tied to clear goals: more traffic, more leads, more conversions. Creative work that actually performs.", gradient: "from-green-500 to-emerald-700", span: "col-span-1 row-span-2" },
        { emoji: "🌍", title: "Deep Local Understanding", description: "Based in Addis, we speak your market’s language — literally and culturally. We get the nuance of local buying behavior, and we bring it into your campaigns and design.", gradient: "from-orange-500 to-red-700", span: "col-span-1" },
        { emoji: "🎨", title: "Design with Soul", description: "Every pixel, word, and layout choice is intentional. Because your brand deserves more than templates — it needs a site and strategy that feels like you and wows your audience.", gradient: "from-purple-500 to-pink-500", span: "col-span-1" },
        { emoji: "📈", title: "Made for Growth — Not Just Launch", description: "A beautiful site is just step one. We build with marketing in mind — SEO, speed, funnel design, and flexibility — so your site doesn’t just look great, it performs and evolves.", gradient: "from-teal-500 to-cyan-700", span: "col-span-1" },
        { emoji: "🤝", title: "We’re With You, Not Above You", description: "No corporate ego. No confusing lingo. We partner like real people — collaborative, clear, responsive. We’ll treat your project like it’s our own.", gradient: "from-yellow-500 to-orange-700", span: "md:col-span-2 lg:col-span-2" },

    ]
};

export const FALLBACK_TESTIMONIALS = {
    heading_en: "Client Love",
    heading_am: "የደንበኞች አስተያየት",
    subheading_en: "Feedback That Fuels Us",
    subheading_am: "ለእኛ ጉልበት የሚሆነን ግብረ መልስ",
    testimonials_en: [
        { name: "Yordanos G/silassie", username: "Founder, Kassina Sweets", body: [{ _key: "fb1", children: [{ text: "Aligo Marketing solution was the perfect partner for to help me grow my online business and I was very impressed with their service. They created a custom ads plan that suited my budget and goals, and helped me reach more customers across different platforms. They also provided me with detailed reports and insights on how to optimize my campaigns and increase my ROI. Aligo Marketing solution is a professional and reliable advertising company that I would highly recommend to anyone looking for online advertising solutions.!" }] }] },
        { name: "Abeslome Banjaw", username: "Owner, Aberhot Interior Designs", body: [{ _key: "fb1", children: [{ text: "Aligo Marketing solution was the best solution and partner for to help me grow my architectural business and I was very impressed with their service. Their custom ad plan, tailored to my budget and objectives, helped me connect with a wider audience across Ethiopia. I saw a significant increase in brand awareness and customer engagement, ultimately leading to a generating quality leads and 3x Return on my investement, I am very flattered to have them boost my company /abrehot designs/and I thank them with all my heart. Thanks aligoo" }] }] },
        { name: "Zelalem Sima", username: "CEO, Zelalem Law Office", body: [{ _key: "fb1", children: [{ text: "The web Developing company Aligoo and its founding partner Daniel has been very compassionate and timely in delivering their development. I also like to thank Daniel for his relentless effort of making time for this project and his unwavering commitment to his work. I had a pleasure working with them !!!" }] }] },
        { name: "Tenbit Ermiyas", username: "Marketing Manager, Charity Foundation", body: [{ _key: "fb1", children: [{ text: "Overall very pleased with Daniel and his friendliness with Me. He did everything I asked in a timely matter. I will definitely be recommending him to other companies. Thanks for such good work." }] }] },
        { name: "Ruta kesete", username: "Owner, Ruth KT hair", body: [{ _key: "fb1", children: [{ text: "Aligo Digital Betam new mamesegnew, tiru page nachu yserachulgn amesegnalew." }] }] },
        { name: "Ephrem Hirut Export", username: "CEO, Hirtu Export", body: [{ _key: "fb1", children: [{ text: "Well experienced web designer" }] }] },
        { name: "Kaleb", username: "CEO, AdReady Tech Solutions", body: [{ _key: "fb1", children: [{ text: "Had a great experience getting our website redesigned . Would recommend to all" }] }] },
        { name: "Seid Mouna", username: "Founder, Seya Ethiopia Tours", body: [{ _key: "fb1", children: [{ text: "Here i am for appreciation! Daniel or aligoo did i great job for Me. his best website designer , he did My website on time and on exact way what i ask him to have. Thank you dani Thank you Aligoo" }] }] },

    ],
    testimonials_am: [
        { name: "ዮርዳኖስ ገ/ሥላሴ", username: "መስራች፣ ቃሲና ስዊትስ", body: [{ _key: "fb1", children: [{ text: "አሊጎ ማርኬቲንግ ለኦንላይን ንግዴ እንድበረታ ተስማሚ አጋር ነበር፣ አገልግሎታቸውም በጣም አስደነቀኝ። ለበጀቴና ለግቦቼ የሚስማማ ብጁ የማስታወቂያ እቅድ ፈጥረውልኝ፣ በተለያዩ መድረኮች ደንበኞችን እንድደርስ ረድተውኝ። ዘመቻዎቼን እንዴት ማሻሻልና ROI ማሳደግ እንደምችል በዝርዝር ሪፖርቶችና ግንዛቤዎች አቅርበውልኝ። አሊጎ ማርኬቲንግ ፕሮፌሽናልና ታማኝ የማስታወቂያ ኩባንያ ነው፣ ኦንላይን ማስታወቂያ ለሚፈልግ ሁሉ በልበ ሙሉነት እመክራለሁ!" }] }] },
        { name: "አበሶሎሜ ባንጃው", username: "ባለቤት፣ አበርሆት ኢንተርየር ዲዛይን", body: [{ _key: "fb1", children: [{ text: "አሊጎ ማርኬቲንግ ለአርክቴክቸር ንግዴ እንድበረታ በጣም ጥሩ መፍትሄና አጋር ነበር፣ አገልግሎታቸውም በጣም አስደነቀኝ። ለበጀቴና ለእቅዴ የተበጁ ማስታወቂያዎች አዘጋጅተውልኝ፣ በኢትዮጵያ ውስጥ ያሉትን ተመልካቾች እንድደርስ ረድተውኝ። የብራንድ ግንዛቤና የደንበኛ ተሳትፎ በከፍተኛ ደረጃ ጨመረ፣ በመጨረሻም ጥራት ያላቸውን መሪዎች አመጣና በኢንቨስትመንቴ 3x ተመላሽ አስገኝቷል። ኩባንዬን /አበርሆት ዲዛይንስ/ እንዲያድግ ስላደረጉ በጣም ደስ ብሎኛል፣ ከልብ አመሰግናለሁ። እናመሰግናለን አሊጎ!" }] }] },
        { name: "ዘላለም ሲማ", username: "ሲኢኦ፣ ዘላለም የህግ ጽ/ቤት", body: [{ _key: "fb1", children: [{ text: "የድር ጣቢያ ልማት ኩባንያ አሊጎ እና መስራች አጋሩ ዳንኤል በልማታቸው በተግባር በጣም ተግባብተውና በሰዓቱ አቅርበዋል። ዳንኤል ለዚህ ፕሮጀክት ጊዜ በማግኘትና ለሥራው ባሳየው የማያወላውል ቁርጠኝነት እናመሰግናለን። ከእነሱ ጋር መሥራት በጣም ደስ አሰኝ!!!" }] }] },
        { name: "ተንበት እርምያስ", username: "የግብይት ሥራ አስኪያጅ፣ ቻሪቲ ፋውንዴሽን", body: [{ _key: "fb1", children: [{ text: "በአጠቃላይ ከዳንኤልና ከተግባብነቱ በጣም ረክቻለሁ። የጠየቅኩትን ሁሉ በሰዓቱ አድርጎልኛል። በተቻለኝ ሌሎች ኩባንያዎችን እመክራለሁ። ለጥሩው ሥራ እናመሰግናለን!" }] }] },
        { name: "ሩታ ከሴተ", username: "ባለቤት፣ ሩት ኬቲ ፀጉር", body: [{ _key: "fb1", children: [{ text: "አሊጎ ዲጂታል በጣም አመሰግናለሁ፣ ቆንጆ ገፅ አድርገ�, አመሰግናለሁ።" }] }] },
        { name: "ኤፍሬም ሂሩት ኤክስፖርት", username: "ሲኢኦ፣ ሂርቱ ኤክስፖርት", body: [{ _key: "fb1", children: [{ text: "በጣም ልምድ ያለው የድር ጣቢያ ዲዛይነር" }] }] },
        { name: "ካሌብ", username: "ሲኢኦ፣ አድሬዲ ቴክ ሶሉሽንስ", body: [{ _key: "fb1", children: [{ text: "ድር ጣቢያችንን እንደገና ለመንደፍ በጣም ጥሩ ልምድ ነበረን። ለሁሉም እመክራለሁ" }] }] },
        { name: "ሴይድ ሙና", username: "መስራች፣ ሴያ ኢትዮጵያ ቱርስ", body: [{ _key: "fb1", children: [{ text: "እዚህ ለማመስገን መጣሁ! ዳንኤል ወይም አሊጎ ለእኔ በጣም ጥሩ ሥራ ሠርተዋል። ምርጥ የድር ጣቢያ ዲዛይነር ነው፣ ድር ጣቢያዬን በሰዓቱና በትክክለኛው መንገድ እንደፈለግኩት አድርጎልኛል። እናመሰግናለን ዳኒ፣ እናመሰግናለን አሊጎ!" }] }] },
    ],
    // Alias
    testimonials: [
        { name: "Yordanos G/silassie", username: "Founder, Kassina Sweets", body: [{ _key: "fb1", children: [{ text: "Aligo Marketing solution was the perfect partner for to help me grow my online business and I was very impressed with their service. They created a custom ads plan that suited my budget and goals, and helped me reach more customers across different platforms. They also provided me with detailed reports and insights on how to optimize my campaigns and increase my ROI. Aligo Marketing solution is a professional and reliable advertising company that I would highly recommend to anyone looking for online advertising solutions.!" }] }] },
        { name: "Abeslome Banjaw", username: "Owner, Aberhot Interior Designs", body: [{ _key: "fb1", children: [{ text: "Aligo Marketing solution was the best solution and partner for to help me grow my architectural business and I was very impressed with their service. Their custom ad plan, tailored to my budget and objectives, helped me connect with a wider audience across Ethiopia. I saw a significant increase in brand awareness and customer engagement, ultimately leading to a generating quality leads and 3x Return on my investement, I am very flattered to have them boost my company /abrehot designs/and I thank them with all my heart. Thanks aligoo" }] }] },
        { name: "Zelalem Sima", username: "CEO, Zelalem Law Office", body: [{ _key: "fb1", children: [{ text: "The web Developing company Aligoo and its founding partner Daniel has been very compassionate and timely in delivering their development. I also like to thank Daniel for his relentless effort of making time for this project and his unwavering commitment to his work. I had a pleasure working with them !!!" }] }] },
        { name: "Tenbit Ermiyas", username: "Marketing Manager, Charity Foundation", body: [{ _key: "fb1", children: [{ text: "Overall very pleased with Daniel and his friendliness with Me. He did everything I asked in a timely matter. I will definitely be recommending him to other companies. Thanks for such good work." }] }] },
        { name: "Ruta kesete", username: "Owner, Ruth KT hair", body: [{ _key: "fb1", children: [{ text: "Aligo Digital Betam new mamesegnew, tiru page nachu yserachulgn amesegnalew." }] }] },
        { name: "Ephrem Hirut Export", username: "CEO, Hirtu Export", body: [{ _key: "fb1", children: [{ text: "Well experienced web designer" }] }] },
        { name: "Kaleb", username: "CEO, AdReady Tech Solutions", body: [{ _key: "fb1", children: [{ text: "Had a great experience getting our website redesigned . Would recommend to all" }] }] },
        { name: "Seid Mouna", username: "Founder, Seya Ethiopia Tours", body: [{ _key: "fb1", children: [{ text: "Here i am for appreciation! Daniel or aligoo did i great job for Me. his best website designer , he did My website on time and on exact way what i ask him to have. Thank you dani Thank you Aligoo" }] }] },
    ]
};

export const FALLBACK_CTA = {
    heading: "Ready to Grow?",
    subheading: "Let's take your business to the next level.",
    primaryButtonText: "Contact Us",
    primaryButtonUrl: "/contact",
    secondaryButtonText: "View Services",
    secondaryButtonUrl: "/services"
};

export const FALLBACK_CASE_STUDIES = {
    casestudyPosts: [
        {
            _id: "fallback-1",
            title: "Transforming E-Commerce Success",
            goalsSummary: "Increase online sales and improve customer engagement through strategic digital marketing.",
            challengeSummary: "Low conversion rates and minimal social media presence were limiting growth potential.",
            imageUrl: "/page-content-images/about-us-section.png",
            service: "Digital Marketing",
            slug: "transforming-ecommerce-success",
            hasImage: true,
            hasService: true
        },
        {
            _id: "fallback-2",
            title: "Building a Modern Web Presence",
            goalsSummary: "Create a fast, beautiful, and conversion-optimized website for a growing startup.",
            challengeSummary: "Outdated website with poor mobile experience and slow loading times.",
            imageUrl: "/page-content-images/about-us-ourway-1.png",
            service: "Web Design",
            slug: "building-modern-web-presence",
            hasImage: true,
            hasService: true
        },
        {
            _id: "fallback-3",
            title: "Social Media Campaign Excellence",
            goalsSummary: "Drive brand awareness and engagement through targeted social media advertising.",
            challengeSummary: "Limited reach and engagement on social platforms despite quality content.",
            imageUrl: "/page-content-images/tik-tok-arewematch.png",
            service: "Social Media Marketing",
            slug: "social-media-campaign-excellence",
            hasImage: true,
            hasService: true
        },
        {
            _id: "fallback-4",
            title: "SEO Strategy That Delivers",
            goalsSummary: "Improve search engine rankings and organic traffic for competitive keywords.",
            challengeSummary: "Poor search visibility and low organic traffic despite valuable content.",
            imageUrl: "/page-content-images/seoservice-process.png",
            service: "SEO",
            slug: "seo-strategy-delivers",
            hasImage: true,
            hasService: true
        },
        {
            _id: "fallback-5",
            title: "Content Marketing Revolution",
            goalsSummary: "Establish thought leadership and drive qualified leads through strategic content.",
            challengeSummary: "Lack of consistent content strategy and minimal audience engagement.",
            imageUrl: "/page-content-images/ourprocess-digital.png",
            service: "Content Strategy",
            slug: "content-marketing-revolution",
            hasImage: true,
            hasService: true
        }
    ]
};

// Helper functions to transform fallback data to match GROQ query responses
// These functions simulate what GROQ does when it aliases language-specific fields

export const getFallbackStats = (lang: 'en' | 'am' = 'en') => {
    const base = FALLBACK_STATS as any;
    return {
        stats: base[`stats_${lang}`] || base.stats_en,
        [`footerText_${lang}`]: base[`footerText_${lang}`]
    };
};

export const getFallbackServices = (lang: 'en' | 'am' = 'en') => {
    const base = FALLBACK_SERVICES as any;
    return {
        [`sectionHeading_${lang}`]: base[`sectionHeading_${lang}`],
        [`accentText_${lang}`]: base[`accentText_${lang}`],
        columns: base[`columns_${lang}`] || base.columns_en
    };
};

export const getFallbackProcess = (lang: 'en' | 'am' = 'en') => {
    const base = FALLBACK_PROCESS as any;
    return {
        [`sectionHeading_${lang}`]: base[`sectionHeading_${lang}`],
        [`accentText_${lang}`]: base[`accentText_${lang}`],
        steps: base[`steps_${lang}`] || base.steps_en
    };
};

export const getFallbackWhyUs = (lang: 'en' | 'am' = 'en') => {
    const base = FALLBACK_WHY_US as any;
    return {
        [`sectionHeading_${lang}`]: base[`sectionHeading_${lang}`],
        [`accentText_${lang}`]: base[`accentText_${lang}`],
        reasons: base[`reasons_${lang}`] || base.reasons_en
    };
};

export const getFallbackTestimonials = (lang: 'en' | 'am' = 'en') => {
    const base = FALLBACK_TESTIMONIALS as any;
    return {
        [`heading_${lang}`]: base[`heading_${lang}`],
        [`subheading_${lang}`]: base[`subheading_${lang}`],
        testimonials: base[`testimonials_${lang}`] || base.testimonials_en
    };
};
