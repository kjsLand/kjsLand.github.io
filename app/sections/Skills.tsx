const skills = {
    "Programming Languages":
    [
        "Python",
        "JavaScript",
        "C++"
    ],
    "Web Technologies": 
    [
        "Next.js", 
        "React", 
        "AWS", 
        "HTML", 
        "CSS", 
        "Tailwind CSS", 
        "PostgreSQL", 
        "SQL"
    ],
    "Tools & Frameworks":
    [
    "Git", 
    "GitHub Actions", 
    "Agile", 
    "FastAPI", 
    "Selenium", 
    "Jupyter Notebooks", 
    "CI/CD"
    ]
};

export default function Skills() {
    return (
        <div id="skills">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Skills
              </h2>
              <p className="mt-4 text-sm md:text-base opacity-80 font-sans">
                All the skills I've accumulated thus far.
              </p>
            </div>

            <div className="mt-7 max-w-xl mx-auto flex flex-wrap gap-3 justify-center">
                <text>Programming Languages</text>
                {skills["Programming Languages"].map((s) => (
                    <span
                        key={s}
                        className="
                            text-[10px] px-3 py-2 rounded-md
                            bg-white/5
                            border border-white/10
                            text-white/85
                        "
                        >
                        {s}
                    </span>
                ))}
            </div>

            <div className="mt-7 max-w-xl mx-auto flex flex-wrap gap-3 justify-center">
                <text>Tools & Frameworks</text>
                {skills["Tools & Frameworks"].map((s) => (
                    <span
                        key={s}
                        className="
                            text-[10px] px-3 py-2 rounded-md
                            bg-white/5
                            border border-white/10
                            text-white/85
                        "
                        >
                        {s}
                    </span>
                ))}
            </div>

            <div className="mt-7 max-w-xl mx-auto flex flex-wrap gap-3 justify-center">
                <p>Web Technologies</p>
                {skills["Web Technologies"].map((s) => (
                    <span
                        key={s}
                        className="
                            text-[10px] px-3 py-2 rounded-md
                            bg-white/5
                            border border-white/10
                            text-white/85
                        "
                        >
                        {s}
                    </span>
                ))}
            </div>

        </div>
    );
}