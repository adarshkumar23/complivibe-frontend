import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
export default async function StoryPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main className="mx-auto max-w-[800px] px-6 py-24">
        <h1 className="text-3xl font-bold mb-6">Story: {slug}</h1>
      </main>
      <Footer />
    </div>
  );
}