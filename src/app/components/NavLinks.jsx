"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, label }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
        isActive
          ? "bg-mint text-primary shadow-sm"
          : "text-foreground hover:bg-mint/50 hover:text-primary"
      }`}
    >
      {label}
    </Link>
  );
}