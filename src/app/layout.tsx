import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CarSpec Search — Find Cars by Performance Specs",
  description: "Search and compare cars by horsepower, torque, 0-60, drivetrain, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="flex items-center gap-2">
                <span className="text-2xl font-bold text-blue-600">CarSpec</span>
                <span className="text-sm text-slate-400 font-medium hidden sm:inline">Search</span>
              </a>
              <div className="flex items-center gap-6">
                <a href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Search</a>
                <a href="/compare" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Compare</a>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-white border-t border-slate-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500">CarSpec Search — Find your car by the numbers.</p>
              <p className="text-xs text-slate-400">Specs are approximate and may vary by configuration.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}