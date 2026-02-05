const skills = [
    "Python",
    "Javascript",
    "Next.js",
    "CSS",
    "Tailwind",
    "Postgressql",
    "AWS",
    "HTML",
    "Github Actions",
    "Agile",
    "FastAPI",
    "Selenium", 
    "Unit Testing",
    "Jupyter Notebooks", 
];

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
                {skills.map((s) => (
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