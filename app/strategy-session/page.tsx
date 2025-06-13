// app/strategy-session/page.tsx
import MultiStepForm from "./MultiStepForm";

export default function StrategySessionPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark py-12 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-background-dark rounded-xl shadow-lg p-6">
        <h1 className="text-heading text-2xl font-bold mb-4 text-center">
          Book Your Free Strategy Session
        </h1>
        <p className="text-body text-center mb-8">
          Answer a few quick questions so we can tailor your session to your business.
        </p>
        <MultiStepForm />

      </div>
    </main>
  );
}
