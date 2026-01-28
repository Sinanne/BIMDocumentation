"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsData } from "@/data/docs";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const currentSlug = pathname?.split("/").pop();

    // State to track expanded modules in mobile menu
    const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

    // Auto-expand active module
    useEffect(() => {
        if (!currentSlug) return;
        docsData.forEach((tier, tierIdx) => {
            tier.modules.forEach((module, moduleIdx) => {
                const hasTopic = module.items.some(item => item.slug === currentSlug);
                if (hasTopic) {
                    setExpandedModules(prev => {
                        const newSet = new Set(prev);
                        newSet.add(`${tierIdx}-${moduleIdx}`);
                        return newSet;
                    });
                }
            });
        });
    }, [currentSlug]);

    const toggleModule = (id: string) => {
        setExpandedModules(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 -mr-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                aria-label="Toggle menu"
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 bottom-0 left-0 z-50 w-[300px] bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 p-4 border-b border-[var(--border-color)]">
                        <Image
                            src={`${process.env.NODE_ENV === 'production' ? '/BIMDocs' : ''}/logo.png`}
                            alt="BIMDocs Logo"
                            width={32}
                            height={32}
                            className="rounded"
                        />
                        <span className="font-bold text-lg text-[var(--text-primary)]">BIMDocs</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="ml-auto p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-4">
                        <nav className="flex flex-col px-4 mb-6">
                            <Link
                                href="/"
                                className="block py-2 px-2 font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--accent-color)] rounded-md"
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/docs/1.1-what-is-bim"
                                className="block py-2 px-2 font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--accent-color)] rounded-md"
                                onClick={() => setIsOpen(false)}
                            >
                                Documentation
                            </Link>
                            <Link
                                href="/topics"
                                className="block py-2 px-2 font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--accent-color)] rounded-md"
                                onClick={() => setIsOpen(false)}
                            >
                                Topic Map
                            </Link>
                        </nav>

                        <div className="px-4 pb-10">
                            {docsData.map((tier, tierIdx) => (
                                <div key={tierIdx} className="mb-4">
                                    <h3 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-2 px-1">
                                        {tier.title}
                                    </h3>
                                    <div className="flex flex-col gap-1">
                                        {tier.modules.map((module, moduleIdx) => {
                                            const moduleId = `${tierIdx}-${moduleIdx}`;
                                            const isExpanded = expandedModules.has(moduleId);
                                            const hasActiveItem = module.items.some(item => item.slug === currentSlug);

                                            return (
                                                <div key={moduleIdx}>
                                                    <button
                                                        onClick={() => toggleModule(moduleId)}
                                                        className={`w-full flex items-center justify-between text-left px-2 py-2 rounded-md text-sm font-medium transition-colors ${hasActiveItem
                                                            ? "text-[var(--text-primary)] bg-[var(--bg-hover)]"
                                                            : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
                                                            }`}
                                                    >
                                                        <span className="truncate pr-2">{module.title}</span>
                                                        <svg
                                                            className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>

                                                    {isExpanded && (
                                                        <ul className="mt-1 ml-2 pl-2 border-l border-[var(--border-color)] flex flex-col gap-0.5">
                                                            {module.items.map((item, itemIdx) => (
                                                                <li key={itemIdx}>
                                                                    <Link
                                                                        href={`/docs/${item.slug}`}
                                                                        className={`block py-2 px-2 rounded-md text-sm ${item.slug === currentSlug
                                                                            ? "bg-blue-50 text-blue-600 font-medium dark:bg-blue-900/20 dark:text-blue-400"
                                                                            : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--accent-color)]"
                                                                            }`}
                                                                        onClick={() => setIsOpen(false)}
                                                                    >
                                                                        {item.title}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
