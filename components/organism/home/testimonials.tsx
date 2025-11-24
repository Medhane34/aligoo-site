// app/home/TestimonialsSectionScroll.tsx
'use client'

import { Marquee } from "@/components/ui/marquee"
import { AccentText, SectionHeading } from "@/components/ui/typography"
import { GlowOutlineButton } from "@/components/atoms/button"
import { Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type Testimonial = {
  name: string
  username: string
  body: any[]
  imageUrl?: string
  imageAlt?: string
}

type Props = {
  heading: string
  subheading: string
  testimonials: Testimonial[]
}

const TestimonialCard = ({
  img,
  name,
  username,
  body,
}: {
  img?: string
  name: string
  username: string
  body: any[]
}) => {
  return (
    <div className="relative w-full max-w-xs overflow-hidden rounded-3xl border border-gray-200 bg-background-light/50 p-10 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.05)_inset] dark:border-white/10 dark:bg-gradient-to-b dark:from-white/5 dark:to-white/[0.02] dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]">
      <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-[#FF595E]/10 to-transparent blur-md"></div>

      <div className="text-foreground/90 leading-relaxed">
        {body?.map((block: any) => (
          <p key={block._key} className="mb-3 last:mb-0">
            {block.children?.map((child: any) => child.text).join('')}
          </p>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2">
        {img ? (
          <Image
            src={img}
            alt={name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-300 border-2 border-dashed" />
        )}
        <div className="flex flex-col">
          <div className="leading-5 font-medium tracking-tight text-foreground">{name}</div>
          <div className="leading-5 tracking-tight text-muted-foreground">{username}</div>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsSectionScroll({ heading, subheading, testimonials }: Props) {
  if (!testimonials?.length) return null

  const firstColumn = testimonials.slice(0, 3)
  const secondColumn = testimonials.slice(3, 6)
  const thirdColumn = testimonials.slice(6, 9)

  return (
    <section id="testimonials" className="mb-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-[540px]">
          <SectionHeading className="text-heading uppercase text-center">
            {heading}
          </SectionHeading>
          <AccentText className="normal-case text-center">
            {subheading}
          </AccentText>
        </div>

        <div className="my-16 flex max-h-[738px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <div>
            <Marquee pauseOnHover vertical className="[--duration:20s]">
              {firstColumn.map((t, i) => (
                <TestimonialCard
                  key={i}
                  img={t.imageUrl}
                  name={t.name}
                  username={t.username}
                  body={t.body}
                />
              ))}
            </Marquee>
          </div>

          <div className="hidden md:block">
            <Marquee reverse pauseOnHover vertical className="[--duration:25s]">
              {secondColumn.map((t, i) => (
                <TestimonialCard
                  key={i}
                  img={t.imageUrl}
                  name={t.name}
                  username={t.username}
                  body={t.body}
                />
              ))}
            </Marquee>
          </div>

          <div className="hidden lg:block">
            <Marquee pauseOnHover vertical className="[--duration:30s]">
              {thirdColumn.map((t, i) => (
                <TestimonialCard
                  key={i}
                  img={t.imageUrl}
                  name={t.name}
                  username={t.username}
                  body={t.body}
                />
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