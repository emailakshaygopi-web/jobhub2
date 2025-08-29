import { ReactNode } from "react";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-white to-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
