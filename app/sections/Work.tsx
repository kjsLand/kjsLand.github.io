import WorkExperienceCard from "@/app/components/WorkCard"

export default function Work() {
    return (
        <div id="work">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Work Experience
              </h2>

              <WorkExperienceCard />
            </div>
        </div>
    );
}