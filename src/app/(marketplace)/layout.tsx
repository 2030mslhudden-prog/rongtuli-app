import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
