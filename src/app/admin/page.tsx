// app/admin/page.tsx

"use client";

const stats = [
  {
    title: "Total Users",
    value: "1,245",
    emoji: "👥",
  },
  {
    title: "Jobs Posted",
    value: "542",
    emoji: "💼",
  },
  {
    title: "Applications",
    value: "8,412",
    emoji: "📄",
  },
  {
    title: "Growth",
    value: "+18%",
    emoji: "📈",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Overview of platform analytics and activity
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {stat.value}
                </h2>
              </div>

              <div className="rounded-xl bg-gray-100 p-3 text-2xl">
                {stat.emoji}
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* LEFT SECTION */}
        <div className="space-y-6 xl:col-span-2">

          {/* RECENT ACTIVITY */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Activity
              </h2>

              <button className="text-sm font-medium text-blue-600 hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-4">

              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                <div>
                  <p className="font-medium text-gray-800">
                    New recruiter registered
                  </p>

                  <p className="text-sm text-gray-500">
                    TechNova Solutions
                  </p>
                </div>

                <span className="text-xs text-gray-400">
                  2 mins ago
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                <div>
                  <p className="font-medium text-gray-800">
                    New job posted
                  </p>

                  <p className="text-sm text-gray-500">
                    Senior Frontend Engineer
                  </p>
                </div>

                <span className="text-xs text-gray-400">
                  15 mins ago
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                <div>
                  <p className="font-medium text-gray-800">
                    500+ applications received today
                  </p>

                  <p className="text-sm text-gray-500">
                    Platform engagement increasing
                  </p>
                </div>

                <span className="text-xs text-gray-400">
                  1 hour ago
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-6">

          {/* PLATFORM HEALTH */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Platform Health
            </h2>

            <div className="space-y-5">

              {/* ACTIVE JOBS */}
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Active Jobs
                  </span>

                  <span className="font-medium text-gray-800">
                    82%
                  </span>
                </div>

                <div className="h-2 rounded-full bg-gray-200">
                  <div className="h-2 w-[82%] rounded-full bg-black" />
                </div>
              </div>

              {/* SERVER STATUS */}
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Server Status
                  </span>

                  <span className="font-medium text-green-600">
                    Healthy
                  </span>
                </div>

                <div className="h-2 rounded-full bg-gray-200">
                  <div className="h-2 w-[95%] rounded-full bg-green-500" />
                </div>
              </div>

              {/* USER ENGAGEMENT */}
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    User Engagement
                  </span>

                  <span className="font-medium text-gray-800">
                    74%
                  </span>
                </div>

                <div className="h-2 rounded-full bg-gray-200">
                  <div className="h-2 w-[74%] rounded-full bg-blue-500" />
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
