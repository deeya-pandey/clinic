"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const isActivePath = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export function NavLinks({ items }: { items: { href: string; label: string }[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-7">
        {items.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`border-b py-1 text-[0.95rem] transition-colors hover:text-forest ${
                  active ? "border-forest text-forest" : "border-transparent text-charcoal"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
