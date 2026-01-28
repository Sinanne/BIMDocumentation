"use client";

import { docsData } from "@/data/docs";
import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="sidebar-area hidden md:block">
            <nav className="flex flex-col gap-6 px-4 py-2">
                {docsData.map((section, idx) => (
                    <div key={idx}>
                        <h3 className="sidebar-section-title">
                            {section.title}
                        </h3>
                        <ul className="flex flex-col gap-0.5">
                            {section.items.map((item, i) => (
                                <li key={i}>
                                    <Link
                                        href={`/docs/${item.slug}`}
                                        className="sidebar-link"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    );
}
