import Link from "next/link";
import { cn } from "@/lib/utils";
import type React from "react";
import slugify from "slugify";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    title: string;
    items: { title: string; category: string }[];
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
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 bg-white ",
        className
      )}
      {...props}
    >
      <h1 className="text-xl font-bold">Kategorien</h1>
      {items.map((item) => (
        <div key={item.title} className="space-y-1">
          <span className="block rounded-md px-3 py-2 text-sm font-medium">
            {item.title}
          </span>
          {item.items?.map((subItem) => (
            <Link
              key={subItem.title}
              href={`/filter/${slugify(subItem.category)}/results`}
              className="block rounded-md px-6 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              {subItem.title}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
