import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100">
      <div className="container mx-auto px-4 py-10 flex flex-col sm:flex-row gap-6 items-center justify-between">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Kevin Land. All rights reserved.
        </p>

        <div className="flex items-center gap-4 text-gray-600">
          <a
            className="hover:text-indigo-600 transition"
            href="#"
            aria-label="GitHub"
          >
            <FiGithub className="h-5 w-5" />
          </a>
          <a
            className="hover:text-indigo-600 transition"
            href="#"
            aria-label="LinkedIn"
          >
            <FiLinkedin className="h-5 w-5" />
          </a>
          <a
            className="hover:text-indigo-600 transition"
            href="#contact"
            aria-label="Email"
          >
            <FiMail className="h-5 w-5" />
          </a>

          
        </div>
      </div>
    </footer>
  );
}
