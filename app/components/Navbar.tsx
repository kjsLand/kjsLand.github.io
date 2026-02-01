"use client";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="font-semibold tracking-tight">
          Kevin<span className="text-indigo-600">.</span>
        </a>

        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-700">
          <a href="#work" className="hover:text-indigo-600 transition">
            Work
          </a>
          <a href="#about" className="hover:text-indigo-600 transition">
            About
          </a>
          <a href="#contact" className="hover:text-indigo-600 transition">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
