// components/sections/WorkSection.tsx
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { AccentText, SectionHeading } from "@/components/ui/typography";

export default function WorkSection() {

  const caseStudies = [
    {
      id: 1,
      imageSrc: "https://heroui.com/images/card-example-4.jpeg",
      title: "Stream the Acme event",
      category: "What to watch",
      challenge: "Our objective was to enhance our online presence and establish ourselves as thought leaders in the investment sector.",
      outcome: "The collaboration led to a 45% increase in organic web traffic and a significant rise in the firm’s search engine rankings, enhancing online authority and client engagement.",
      span: "col-span-12 sm:col-span-4",
    },
    {
      id: 2,
      imageSrc: "https://heroui.com/images/card-example-3.jpeg",
      title: "Contribute to the planet",
      category: "Plant a tree",
      challenge: "Breaking into a competitive market with a new SaaS product required strong brand visibility and lead generation.",
      outcome: "Implemented a multi-channel digital strategy that boosted website traffic by 80% and generated qualified leads, surpassing initial targets.",
      span: "col-span-12 sm:col-span-4",
    },
    {
      id: 3,
      imageSrc: "https://heroui.com/images/card-example-2.jpeg",
      title: "Creates beauty like a beast",
      category: "Supercharged",
      challenge: "Revitalizing online presence and increasing reservations after the pandemic.",
      outcome: "Developed a new website and social media campaign, resulting in a 30% increase in online reservations and improved local search rankings.",
      span: "col-span-12 sm:col-span-4",
    },
    // Keep the remaining cards as they are for now
  ];


  return (
    <section className="px-8 py-12 text-center bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      {/* Section Header */}
      
 <div className=" container flex flex-col md:flex-row items-center justify-between gap-8 mt-12">
            <div className="space-y-2 mb-8 justify-left justify-items-start">
            <AccentText>What We Do</AccentText>
            <SectionHeading className="text-3xl font-bold tracking-tight"> Our Work</SectionHeading>
        </div>
        <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white

        bg-gradient-to-r from-brand-primary-light to-brand-primary-dark // <-- NEW: Gradient using custom colors

        hover:from-brand-primary-dark hover:to-brand-primary-darker // <-- NEW: Hover state using custom colors

        shadow-lg transition-all duration-300">

        MORE CASE STUDIES 

        </button>
</div>

      <div className="max-full gap-4 grid grid-cols-12 grid-rows-2 px-8">
        {caseStudies.map((study) => (
          <Card
            key={study.id}
            className={`
              ${study.span}
              relative h-[300px] rounded-none overflow-hidden cursor-pointer group
            `}
          >
            {/* Main Image */}
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={study.imageSrc}
            />

            {/* Original CardHeader content (now hides on hover) */}
            <CardHeader className="absolute z-10 top-1 flex-col !items-start
              opacity-100 transition-opacity duration-300 group-hover:opacity-0
            ">
                <p className="text-tiny text-white uppercase font-bold">{study.category}</p>
                <h4 className="text-white font-medium text-large">{study.title}</h4>
            </CardHeader>

            {/* --- NEW: Top-Left Gradient Outline --- */}
            <div className="
              absolute top-0 left-0 
              w-0 h-[3px] // Start with 0 width, fixed height
              bg-gradient-to-r from-blue-500 to-purple-500 // Gradient color
              opacity-0 // Hidden by default
              group-hover:w-1/2 // Expands to half width on hover (top-left)
              group-hover:opacity-100 // Fully visible on hover
              transition-all duration-300 ease-out // Smooth animation
              z-30 // Ensure it's above other elements
             rounded-tl-xl
            "></div>

            <div className="
              absolute top-0 left-0 rounded-xl
              w-[3px] h-0 // Start with 0 height, fixed width
              bg-gradient-to-b from-blue-500 to-purple-500 // Gradient color (vertical)
              opacity-0 // Hidden by default
              group-hover:h-1/2 // Expands to half height on hover (top-left vertical)
              group-hover:opacity-100 // Fully visible on hover
              transition-all duration-300 ease-out // Smooth animation
              z-30
             rounded-tl-xl
            "></div>

            {/* --- NEW: Top-Right Gradient Outline --- */}
            <div className="
              absolute top-0 right-0 
              w-0 h-[3px] // Start with 0 width, fixed height
              bg-gradient-to-l from-blue-500 to-purple-500 // Gradient color (reversed)
              opacity-0 // Hidden by default
              group-hover:w-1/2 // Expands to half width on hover (top-right)
              group-hover:opacity-100 // Fully visible on hover
              transition-all duration-300 ease-out // Smooth animation
              z-30
             rounded-tr-xl

            "></div>

            <div className="
              absolute top-0 right-0 
              w-[3px] h-0 // Start with 0 height, fixed width
              bg-gradient-to-b from-purple-500 to-blue-500 // Gradient color (vertical, reversed for visual flow)
              opacity-0 // Hidden by default
              group-hover:h-1/2 // Expands to half height on hover (top-right vertical)
              group-hover:opacity-100 // Fully visible on hover
              transition-all duration-300 ease-out // Smooth animation
              z-30
              rounded-tr-xl
            "></div>


            {/* OVERLAY for Hover Effect */}
            <div className="
                absolute bottom-0 left-0 right-0
                h-0
                bg-black/80
                flex flex-col justify-end items-start
                p-6
                opacity-0
                group-hover:h-3/4
                group-hover:opacity-100
                transition-all duration-500 ease-in-out
                z-20
            ">
                <div className="
                    h-full
                    flex flex-col justify-end
                    text-white
                ">
                    {/* <p className="text-base font-semibold mb-2">The Challenge:</p> */}
                    
                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">{study.challenge}</p>
                    <p className="text-base font-semibold mb-2">The Outcome:</p>
                    <p className="text-sm text-gray-300 leading-relaxed">{study.outcome}</p>
                </div>
            </div>
            {/* Removed the CardFooter from the mapped cards, as it was conflicting with the overlay logic and not part of the case study data */}
            {/* If you need a footer for the case study cards, it needs to be part of the hover state or positioned differently */}
          </Card>
        ))}

        {/* Keeping your original last two cards as is for now, including their footers */}
        <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                  <p className="text-tiny text-white/60 uppercase font-bold">New</p>
                  <h4 className="text-black font-medium text-2xl">Acme camera</h4>
              </CardHeader>
              <Image
                  removeWrapper
                  alt="Card example background"
                  className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                  src="https://heroui.com/images/card-example-6.jpeg" />
              <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                  <div>
                      <p className="text-black text-tiny">Available soon.</p>
                      <p className="text-black text-tiny">Get notified.</p>
                  </div>
                  <Button className="text-tiny" color="primary" radius="full" size="sm">
                      Notify Me
                  </Button>
              </CardFooter>
          </Card>

          <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                  <p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p>
                  <h4 className="text-white font-medium text-xl">Your checklist for better sleep</h4>
              </CardHeader>
              <Image
                  removeWrapper
                  alt="Relaxing app background"
                  className="z-0 w-full h-full object-cover"
                  src="https://heroui.com/images/card-example-5.jpeg" />
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                  <div className="flex flex-grow gap-2 items-center">
                      <Image
                          alt="Breathing app icon"
                          className="rounded-full w-10 h-11 bg-black"
                          src="https://heroui.com/images/breathing-app-icon.jpeg" />
                      <div className="flex flex-col">
                          <p className="text-tiny text-white">Breathing App</p>
                          <p className="text-tiny text-white">Get a good night&#39;s sleep.</p>
                      </div>
                  </div>
                  <Button radius="full" size="sm">
                      Get App
                  </Button>
              </CardFooter>
          </Card>
      </div>
    </section>
  );
}