import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

type ContactItem = {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
};

const contacts: ContactItem[] = [
  {
    label: "GitHub",
    value: "github.com/kjsLand",
    href: "https://github.com/kjsLand",
    icon: <FiGithub className="w-7 h-7" />,
  },
  {
    label: "LinkedIn",
    value: "Linkedin.com/in/kevin-land-401b88250",
    href: "https://www.linkedin.com/in/kevin-land-401b88250",
    icon: <FiLinkedin className="w-7 h-7" />,
  },
  {
    label: "Email",
    value: "kevin.js.land@gmail.com",
    href: "mailto:kevin.js.land@gmail.com",
    icon: <FiMail className="w-7 h-7" />,
  },
  {
    label: "Blog",
    value: "@kevin_docs",
    href: "https://medium.com/@kevin_docs",
    icon: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
    </svg>
  ),
  },
];

function ContactCard({ item, index }: { item: ContactItem; index: number }) {
return (
      <a href={item.href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-blue-400/40 transition-all duration-200"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Icon */}
      <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-500/30 group-hover:text-blue-300 transition-all duration-200">
        {item.icon}
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-white/40 leading-none mb-0.5">{item.label}</p>
        <p className="text-sm font-medium text-white/80 group-hover:text-white truncate transition-colors duration-200">{item.value}</p>
      </div>

      {/* Arrow */}
      <svg className="ml-auto shrink-0 w-3.5 h-3.5 text-white/20 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">

        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Link Tree</h2>
        </div>

        <div className="max-w-sm mx-auto flex flex-col gap-2.5">
          {contacts.map((c, i) => (
            <ContactCard key={c.label} item={c} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}