import { Footer } from "@/components/ui/footer/page";
import { Navbar } from "@/components/ui/navbar/main-navbar";
import { Toaster } from "@/components/ui/sonner";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="border-b-[1px] border-slate-200 " />
      <main className="flex-grow">
        {children}
        <Toaster />
      </main>
      <Footer />
    </div>
  );
}
