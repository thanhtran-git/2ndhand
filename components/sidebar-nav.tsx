import Link from "next/link";
import { cn } from "@/lib/utils";
import type React from "react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    items?: { href: string; title: string }[];
  }[];
}

export default function SidebarNav({
  className,
  items,
  ...props
}: SidebarNavProps) {
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <div key={item.href} className="space-y-1">
          <Link
            href={item.href}
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            {item.title}
          </Link>
          {item.items?.map((subItem) => (
            <Link
              key={subItem.href}
              href={subItem.href}
              className="block rounded-md px-6 py-1 text-sm text-muted-foreground hover:text-foreground"
            >
              {subItem.title}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
