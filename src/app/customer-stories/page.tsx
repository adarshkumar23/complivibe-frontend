import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
export default function CustomerStoriesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main className="mx-auto max-w-[1200px] px-6 py-24 text-center">
        <h1 className="text-4xl font-bold mb-6">Customer Stories</h1>
      </main>
      <Footer />
    </div>
  );
}