"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, label }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
        isActive
          ? "bg-mint text-mint-foreground shadow-sm border border-primary/10"
          : "text-foreground/70 hover:bg-mint/50 hover:text-primary hover:border hover:border-primary/5"
      }`}
    >
      {label}
    </Link>
  );
}