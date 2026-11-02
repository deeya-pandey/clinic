"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useRef } from "react";
import { Logo } from "./Logo";
import { isActivePath } from "./NavLinks";
import { buttonClass } from "./ui";

/** Uses a native modal dialog, which provides focus trapping and Escape handling. */
export function MobileNavigation({
  items,
  bookLabel,
}: {
  items: { href: string; label: string }[];
  bookLabel: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const close = () => dialog.current?.close();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
        className="inline-flex size-11 items-center justify-center rounded-md border border-line text-forest"
      >
        <Menu aria-hidden className="size-5" />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog
        ref={dialog}
        aria-label="Menu"
        className="m-0 ml-auto h-dvh max-h-none w-full max-w-sm bg-paper p-0 text-charcoal"
      >
        <div className="flex h-full flex-col px-5 py-4">
          <div className="flex items-center justify-between" onClick={close}>
            <Logo />
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-md border border-line text-forest"
            >
              <X aria-hidden className="size-5" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-6 flex-1 overflow-y-auto">
            <ul className="divide-y divide-line">
              {items.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={`block py-3.5 font-serif text-2xl ${active ? "text-forest" : "text-charcoal"}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <Link href="/appointments" onClick={close} className={`${buttonClass()} mt-4 w-full`}>
            {bookLabel}
          </Link>
        </div>
      </dialog>
    </div>
  );
}
