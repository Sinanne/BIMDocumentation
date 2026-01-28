"use client";

import { ThemeProvider } from "./ThemeProvider";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <div className="layout-grid">
                <Header />
                <Sidebar />
                <main className="content-area">
                    {children}
                </main>
            </div>
        </ThemeProvider>
    );
}
