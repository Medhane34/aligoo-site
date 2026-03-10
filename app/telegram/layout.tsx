import { ClerkProvider } from "@clerk/nextjs";

export default function TelegramLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ClerkProvider>{children}</ClerkProvider>;
}
