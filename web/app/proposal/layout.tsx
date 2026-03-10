import { ClerkProvider } from "@clerk/nextjs";

export default function ProposalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ClerkProvider>{children}</ClerkProvider>;
}
