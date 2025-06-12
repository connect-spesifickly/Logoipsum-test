import { Toaster } from "@/components/ui/sonner";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {children}
        <Toaster />
      </main>
    </div>
  );
}
