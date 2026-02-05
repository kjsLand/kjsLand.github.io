
type StatCardProps = {
  number: string | number;
  title: string;
};

const stats: StatCardProps[] = [
    {
        number: 3,
        title: "Work Experiences",
    },
    {
        number: 2,
        title: "Degrees",
    },
    {
        number: 4,
        title: "Personal Projects",
    },
    {
        number: 2,
        title: "Papers",
    }
]

export function StatCard({ number, title }: StatCardProps) {
  return (
    <div
      className="
        w-52 h-52
        flex flex-col items-center justify-center text-center
        rounded-xl
        bg-gradient-to-br from-blue-500 to-blue-700
        text-white
        transition-all duration-300
        shadow-[inset_0_0_10px_rgba(255,255,255,0.25)]
        shadow-md hover:shadow-xl
        hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]
        hover:scale-105
      "
    >
      <p className="text-5xl font-bold leading-none">{number}</p>
      <h3 className="mt-3 text-base font-semibold text-white/95">{title}</h3>
    </div>
  );
}


export default function StatRow(){
    return (
        <div className="
                    group flex flex-row items-center text-center
                    justify-center gap-6
                    p-6 bg-blue backdrop-blur rounded-xl
                    transition-all duration-300
                ">
                    <StatCard {...stats[0]} />
                    <StatCard {...stats[1]} />
                    <StatCard {...stats[2]} />
                    <StatCard {...stats[3]} />
                </div>
    );

}