import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main className="mx-auto max-w-[1200px] px-6 py-32 flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-[#888] max-w-md mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link 
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black hover:bg-[#ededed] transition-colors"
        >
          Return Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}