import { GlowOutlineButton, PrimaryButton } from "@/components/atoms/button"
import { Marquee } from "@/components/ui/marquee"
import { AccentText, SectionHeading } from "@/components/ui/typography"
import { textVariants } from "@/lib/motions/textVariants"
import { motion } from "framer-motion"
import { Zap } from "lucide-react"
import Link from "next/link"



const testimonials = [
  {
    name: "Yordanos G/silassie",
    username: "Founder, Kassina Sweets",
    body: "Aligo Marketing solution was the perfect partner for to help me grow my online business and I was very impressed with their service. They created a custom ads plan that suited my budget and goals, and helped me reach more customers across different platforms. They also provided me with detailed reports and insights on how to optimize my campaigns and increase my ROI. Aligo Marketing solution is a professional and reliable advertising company that I would highly recommend to anyone looking for online advertising solutions.",
    img: "/team/avatar-3.jpeg",
  },
  {
    name: "Abeslome Banjaw",
    username: "Owner, Aberhot Interior Designs",
    body: "Aligo Marketing solution was the best solution and partner for to help me grow my architectural business and I was very impressed with their service. Their custom ad plan, tailored to my budget and objectives, helped me connect with a wider audience across Ethiopia. I saw a significant increase in brand awareness and customer engagement, ultimately leading to a generating quality leads and 3x Return on my investement, I am very flattered to have them boost my company /abrehot designs/and I thank them with all my heart. Thanks aligoo",
    img: "/team/avatar-2.jpeg",
  },
  {
    name: "Zelalem Sima",
    username: "CEO, Zelalem Law Office",
    body: "The web Developing company Aligoo and its founding partner Daniel has been very compassionate and timely in delivering their development. I also like to thank Daniel for his relentless effort of making time for this project and his unwavering commitment to his work. I had a pleasure working with them !!!",
   img: "/team/avatar-2.jpeg",
  },
  {
    name: "Tenbit Ermiyas",
    username: "Marketing Manager, Charity Foundation",
    body: "Overall very pleased with Daniel and his friendliness with Me. He did everything I asked in a timely matter. I will definitely be recommending him to other companies. Thanks for such good work.",
  img: "/team/avatar-3.jpeg",
  },
  {
    name: "Ruta kesete",
    username: "Ruth KT hair",
    body: "Aligo Digital Betam new mamesegnew, tiru page nachu yserachulgn amesegnalew.",
   img: "/team/avatar-4.jpeg",
  },
  {
    name: "Ephrem Hirut Export",
    username: "CEO, Hirtu Export",
    body: "Well experienced web designer",
    img: "/team/avatar-1.jpeg",
  },
  {
    name: "Kaleb Araya",
    username: "CEO, Kaleb Tech Solutions",
    body: "Had a great experience getting our website redesigned . Would recommend to all",
    img: "/team/avatar-1.jpeg",
  },
  {
    name: "Seid Mouna",
    username: "Founder, Seya Ethiopia Tours",
    body: "Here i am for appreciation! Daniel or aligoo did i great job for Me. his best website designer , he did My website on time and on exact way what i ask him to have. Thank you dani Thank you Aligoo",
   img: "/team/avatar-1.jpeg",
  },
  /* {
    name: "James Roy",
    username: "@jamesrdev",
    body: "v0 is a lifesaver when deadlines are tight. Generate a component, tweak, and deploy instantly.",
    img: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
  }, */
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

const TestimonialCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <div className="relative w-full max-w-xs overflow-hidden rounded-3xl border border-gray-200 bg-background-light/50 p-10 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.05)_inset] dark:border-white/10 dark:bg-gradient-to-b dark:from-white/5 dark:to-white/[0.02] dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]">
      <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-[#FF595E]/10 to-transparent blur-md"></div>

      <div className="text-foreground/90 leading-relaxed">{body}</div>

      <div className="mt-5 flex items-center gap-2">
        <img src={img || "/placeholder.svg"} alt={name} height="40" width="40" className="h-10 w-10 rounded-full" />
        <div className="flex flex-col">
          <div className="leading-5 font-medium tracking-tight text-foreground">{name}</div>
          <div className="leading-5 tracking-tight text-muted-foreground">{username}</div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSectionScroll() {
  return (
    <section id="testimonials" className="mb-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-[540px]">
          

            <SectionHeading className="text-heading uppercase text-center">
              Client Love 
            </SectionHeading>
      <AccentText className="normal-case text-center">Feedback That Fuels Us</AccentText>

        </div>

        <div className="my-16 flex max-h-[738px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <div>
            <Marquee pauseOnHover vertical className="[--duration:20s]">
              {firstColumn.map((testimonial) => (
                <TestimonialCard key={testimonial.username} {...testimonial} />
              ))}
            </Marquee>
          </div>

          <div className="hidden md:block">
            <Marquee reverse pauseOnHover vertical className="[--duration:25s]">
              {secondColumn.map((testimonial) => (
                <TestimonialCard key={testimonial.username} {...testimonial} />
              ))}
            </Marquee>
          </div>

          <div className="hidden lg:block">
            <Marquee pauseOnHover vertical className="[--duration:30s]">
              {thirdColumn.map((testimonial) => (
                <TestimonialCard key={testimonial.username} {...testimonial} />
              ))}
            </Marquee>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 pb-1">
          <Link href="https://www.google.com/search?q=aligoo&sourceid=chrome&ie=UTF-8#mpd=~10252779069624549640/customers/reviews">
          <GlowOutlineButton size="md" icon={<Zap className="h-5 w-5" />} className="p-2">
            See all reviews
          </GlowOutlineButton>
          </Link>
          <div className="text-sm font-medium text-gray-500">4.9 out of 9</div>
        </div>
      </div>
    </section>
  )
}
