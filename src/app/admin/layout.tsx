
"use client";

import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      emoji: "📊",
    },
    {
      name: "Jobs",
      href: "/admin/jobs",
      emoji: "💼",
    },
    {
      name: "Users",
      href: "/admin/users",
      emoji: "👥",
    },
    {
      name: "Applications",
      href: "/admin/applications",
      emoji: "📄",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">

        {/* SIDEBAR */}
        <aside className="sticky top-0 h-screen w-64 border-r border-gray-200 bg-white px-4 py-6">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Panel
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your platform
            </p>
          </div>

          {/* NAVIGATION */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                <span>{item.emoji}</span>

                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* FOOTER */}
          <div className="mt-10 border-t border-gray-200 pt-4">
            <p className="text-xs text-gray-400">
              Internal dashboard
            </p>
          </div>

        </aside>

        {/* CONTENT */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </div>
  );
}
