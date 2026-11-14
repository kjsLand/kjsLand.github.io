import type { NavItem } from "@/app/components/layout/Navbar";

/** The navbar's page links, shared by every page. Add a page here to put it in the navbar. */
export const pageNav: NavItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "experience", label: "Experience", href: "/experience" },
];
