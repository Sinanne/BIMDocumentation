import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="layout-grid">
            <Header />
            <Sidebar />
            <main className="content-area">
                {children}
            </main>
        </div>
    );
}
