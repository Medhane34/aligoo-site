// app/strategy-session/page.tsx
import MultiStepForm from "./MultiStepForm";
import HeadingAtom from "@/components/atoms/HeadingAtom";

export const revalidate = 3600;

export default function StrategySessionPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark py-12 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 p-8 md:p-10">

        {/* Page Header */}
        <div className="text-center mb-8 space-y-3">
          <HeadingAtom
            as="h1"
            size="md"
            title="Book Your Free Strategy Session"
            variant="default"
            align="center"
            className=""
          />
          <p className="text-text-light dark:text-text-dark text-base leading-relaxed max-w-md mx-auto">
            Answer a few quick questions so we can tailor your session to your business.
          </p>
        </div>

        <MultiStepForm />
      </div>
    </main>
  );
}
