import { TestimonialCard } from "@/components/ui/TestimonialCard";

const testimonials = Array.from({ length: 12 }, (_, i) => ({
  name: `User ${i + 1}`,
  date: "May 15, 2025",
  rating: (i % 5) + 1,
  title: "Amazing service!",
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatem.",
  avatarUrl: `https://i.pravatar.cc/150?img=${i + 10}`,
}));

export const TestimonialsSection = () => (
  <section className="w-full overflow-hidden py-12">
    <div className="mx-auto max-w-6xl px-4">
      <h2 className="mb-6 text-heading font-bold text-white">What our clients say</h2>
      <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth scrollbar-hide">
        {testimonials.map((testimonial, i) => (
          <TestimonialCard key={i} {...testimonial} />
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;

