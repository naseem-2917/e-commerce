import Navbar from './Navbar';
import Footer from './Footer';
import BottomNavigation from './BottomNavigation';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
            <Navbar />
            <main className="pt-16 pb-20 md:pb-0">
                {children}
            </main>
            <div className="hidden md:block">
                <Footer />
            </div>
            <BottomNavigation />
        </div>
    );
}
