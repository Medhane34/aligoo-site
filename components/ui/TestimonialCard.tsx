type Testimonial = {
  name: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  avatarUrl: string;
};

export const TestimonialCard = ({
  name,
  date,
  rating,
  title,
  content,
  avatarUrl,
}: Testimonial) => (
  <div className="min-w-[300px] max-w-[300px] shrink-0 snap-start rounded-2xl bg-neutral-900 p-4 text-white shadow-md">
    <div className="flex items-center gap-4">
      <img src={avatarUrl} alt={name} className="h-10 w-10 rounded-full object-cover" />
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-xs text-neutral-400">{date}</p>
      </div>
    </div>
    <div className="mt-4">
      <h4 className="font-bold">{title}</h4>
      <p className="text-sm text-neutral-300">{content}</p>
    </div>
    <div className="mt-3 flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? "text-yellow-400" : "text-neutral-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
        </svg>
      ))}
    </div>
  </div>
);
