import React from "react";
import { Link } from "@heroui/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { ToastProvider } from "@heroui/toast";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <ToastProvider placement="bottom-right" />
            <Navbar isBordered maxWidth="xl" className="bg-background/70 backdrop-blur-md">
                <NavbarBrand>
                    <p className="font-bold text-inherit">Aligoo Telegram</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <Link color="foreground" href="/telegram/dashboard">
                            Overview
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="/telegram/dashboard/subscribers">
                            Subscribers
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="/telegram/dashboard/campaigns">
                            Campaigns
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <main className="container mx-auto max-w-7xl pt-8 px-6 flex-grow">
                {children}
            </main>
        </div>
    );
}
