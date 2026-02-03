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
];

function ContactCard({ item }: { item: ContactItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="
        group
        rounded-2xl border border-gray-200 bg-white
        p-6
        flex items-center gap-4
        shadow-sm hover:shadow-xl
        transition-all duration-200
        hover:-translate-y-1
      "
    >
      {/* Icon */}
      <div
        className="
          w-14 h-14
          rounded-xl
          bg-blue-600/10 text-blue-600
          flex items-center justify-center
          transition
          group-hover:bg-blue-600
          group-hover:text-white
        "
      >
        {item.icon}
      </div>

      {/* Text */}
      <div>
        <p className="text-sm text-gray-500">{item.label}</p>
        <p className="font-medium text-gray-900">{item.value}</p>
      </div>
    </a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white-900">Contact</h2>
          <p className="mt-3 text-gray-600">
            Feel free to reach out or connect with me.
          </p>
        </div>

        <div className="max-w-3xl mx-auto px-15 justify-content-center gap-6 grid grid-rows-1 sm:grid-rows-3">
          {contacts.map((c) => (
            <ContactCard key={c.label} item={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
