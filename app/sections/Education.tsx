import EducationSection from "@/app/components/EducationCard"

export default function Education() {
    return (
        <div id="education">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Education
              </h2>

              <EducationSection />

              <p> 7x Dean's List with magna cum laude and General Education Immersion in Economics</p>
            </div>
        </div>
    );
}