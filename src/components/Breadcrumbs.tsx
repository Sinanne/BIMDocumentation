"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getBreadcrumbs } from "@/data/docs";

export default function Breadcrumbs() {
    const pathname = usePathname();
    const slug = pathname?.split("/").pop();

    if (!slug) return null;

    const breadcrumbs = getBreadcrumbs(slug);

    if (!breadcrumbs) return null;

    return (
        <nav className="flex text-sm text-[var(--text-muted)] mb-6 overflow-x-auto whitespace-nowrap pb-2">
            <ol className="flex items-center space-x-2">
                <li>
                    <Link href="/" className="hover:text-[var(--accent-color)] transition-colors">
                        Home
                    </Link>
                </li>
                <li>
                    <span className="mx-1 text-gray-400">/</span>
                </li>
                <li>
                    <Link href="/topics" className="hover:text-[var(--accent-color)] transition-colors">
                        {breadcrumbs.tier}
                    </Link>
                </li>
                <li>
                    <span className="mx-1 text-gray-400">/</span>
                </li>
                <li>
                    <span className="text-[var(--text-secondary)] font-medium">
                        {breadcrumbs.module}
                    </span>
                </li>
                {/* Topic title is usually displayed as the main h1, so we can omit it or show it as disabled text */}
            </ol>
        </nav>
    );
}
