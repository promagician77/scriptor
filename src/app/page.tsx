import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import Logo from "@/components/landing/logo"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full bg-transparent fixed top-0 z-50">
        <div className="container mx-auto px-8 py-8 flex items-center justify-between">
          <div className="flex items-center">
            <Logo />
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/login" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-transparent hover:bg-white/20 text-white border border-white/80 rounded-full px-7 py-2.5 transition-all text-sm font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative h-screen w-full">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=2070&auto=format&fit=crop"
              alt="Writing desk with laptop and coffee"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-5xl mx-auto leading-tight">
              Turn your creative vision into a professional screenplay
            </h1>
            <p className="text-white/90 mt-6 text-lg md:text-xl max-w-3xl">
              Screen writing, story development, and production tools for film & TV, and interactive media.
            </p>
            <Link
              href="/get-started"
              className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full px-8 py-3 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </section>

      </main>
    </div>
  )
}

function NavItem({ label }: { label: string }) {
  return (
    <div className="relative group">
      <button className="flex items-center text-white hover:text-gray-300 transition-colors text-sm font-medium">
        {label} <ChevronDown className="ml-1 h-3.5 w-3.5 opacity-70" />
      </button>
      <div className="absolute left-0 mt-2 w-48 bg-black/90 backdrop-blur-sm rounded shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        <Link href="#" className="block px-4 py-2 text-sm text-white hover:bg-white/10">
          Option 1
        </Link>
        <Link href="#" className="block px-4 py-2 text-sm text-white hover:bg-white/10">
          Option 2
        </Link>
        <Link href="#" className="block px-4 py-2 text-sm text-white hover:bg-white/10">
          Option 3
        </Link>
      </div>
    </div>
  )
}

