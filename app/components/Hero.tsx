import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Hero(){
    return (
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Hi, I&apos;m Kevin 👋
                <br />
                <span className="text-indigo-600">Software Engineer</span>
              </h1>

              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                I create meaningful digital experiences through thoughtful design
                and clean code. Currently shaping the future at{" "}
                <span className="font-semibold">Trendyol Group</span>.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
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
          </div>
        </section>
    )
}