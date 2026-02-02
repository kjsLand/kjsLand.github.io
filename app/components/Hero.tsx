import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import StatRow from "@/app/components/StatCard"

export default function Hero(){
    return (
        <section className="py-20 md:py-17">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Hi, I&apos;m Kevin 👋
                <br />
                <span className="text-indigo-600">Software Engineer</span>
              </h1>

              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                I'm a passionate developer that strives to have real world impact
                in areas such as Full Stack Development, AI, and Quantum Computing.
              </p>

              <StatRow />
            </div>
          </div>
        </section>
    )
}