import { docsData } from "@/data/docs";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Topic Map - BIMDocs",
    description: "Complete table of contents for BIMDocs",
};

export default function TopicMap() {
    return (
        <div className="max-w-5xl mx-auto py-12 px-6">
            <h1 className="text-4xl font-bold mb-4 text-[var(--text-primary)]">Topics</h1>
            <p className="text-xl text-[var(--text-secondary)] mb-12 max-w-2xl">
                A complete overview of all documentation modules and topics.
            </p>

            <div className="space-y-16">
                {docsData.map((tier, tierIdx) => (
                    <div key={tierIdx} className="relative">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent-color)] text-white flex items-center justify-center font-bold text-sm">
                                {tierIdx + 1}
                            </span>
                            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                                {tier.title}
                            </h2>
                        </div>

                        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3 pl-0 md:pl-12">
                            {tier.modules.map((module, moduleIdx) => (
                                <div key={moduleIdx} className="break-inside-avoid">
                                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-color)]">
                                        {module.title}
                                    </h3>
                                    <ul className="space-y-2">
                                        {module.items.map((item, itemIdx) => (
                                            <li key={itemIdx}>
                                                <Link
                                                    href={`/docs/${item.slug}`}
                                                    className="group flex items-start gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors"
                                                >
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--border-color)] group-hover:bg-[var(--accent-color)] flex-shrink-0 transition-colors"></span>
                                                    <span className="text-sm leading-relaxed">{item.title}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
