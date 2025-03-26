import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { SparklesCore } from "@/components/sparkles";

export default function Home() {
  return (
    <main
      className="min-h-screen bg-black/[0.96] antialiased bg-cover bg-center relative overflow-hidden"
      // style={{
      //   backgroundImage: "url('https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2069&auto=format&fit=crop')",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      {/* Ambient background with moving particles */}
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
      </div>
    </main>
  );
}
