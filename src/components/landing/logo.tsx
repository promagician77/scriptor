import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="text-white font-bold">
      <span className="flex flex-col">
        <span className="text-3xl tracking-tight">Scriptor</span>
        <span className="text-[10px] tracking-widest text-gray-400 -mt-1">SCREENWRITING TOOLS</span>
      </span>
    </Link>
  )
}

