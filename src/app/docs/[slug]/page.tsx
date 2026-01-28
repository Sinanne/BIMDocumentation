import { getTopic, getPrevNext, docsData } from "@/data/docs";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export async function generateStaticParams() {
    const params: { slug: string }[] = [];
    for (const tier of docsData) {
        for (const module of tier.modules) {
            for (const item of module.items) {
                params.push({ slug: item.slug });
            }
        }
    }
    return params;
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function DocPage({ params }: PageProps) {
    const { slug } = await params;
    const topic = getTopic(slug);
    const { prev, next } = getPrevNext(slug);

    if (!topic) {
        notFound();
    }

    return (
        <article className="max-w-none">
            <Breadcrumbs />

            <div className="prose max-w-none mb-12">
                <ReactMarkdown>
                    {topic.content}
                </ReactMarkdown>
            </div>

            <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--border-color)' }}>
                <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    {prev ? (
                        <Link
                            href={`/docs/${prev.slug}`}
                            className="flex-1 p-4 rounded-lg border transition-all hover:shadow-md group"
                            style={{
                                borderColor: 'var(--border-color)',
                                backgroundColor: 'var(--bg-secondary)'
                            }}
                        >
                            <div className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Previous</div>
                            <div className="font-semibold group-hover:text-blue-500 transition-colors" style={{ color: 'var(--text-primary)' }}>
                                {prev.title}
                            </div>
                        </Link>
                    ) : <div className="flex-1" />}

                    {next ? (
                        <Link
                            href={`/docs/${next.slug}`}
                            className="flex-1 p-4 rounded-lg border transition-all hover:shadow-md group text-right"
                            style={{
                                borderColor: 'var(--border-color)',
                                backgroundColor: 'var(--bg-secondary)'
                            }}
                        >
                            <div className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Next</div>
                            <div className="font-semibold group-hover:text-blue-500 transition-colors" style={{ color: 'var(--text-primary)' }}>
                                {next.title}
                            </div>
                        </Link>
                    ) : <div className="flex-1" />}
                </div>
            </div>
        </article>
    );
}
