"use client";
import { useRouter } from "next/navigation";
//
// interface EmployeeDashboardSidebarProps {
//     user: any;
// }

type Props = {
    activeSection: string;
    setActiveSection: (section: string) => void;
    user?:any;
};

export default function EmployeeDashboardSidebar({
    activeSection,
    setActiveSection,
    user
}: Props) {

    const router = useRouter();

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5  sticky top-24 flex flex-col justify-between">

            {/* TOP SECTION */}
            <div>

                {/* PROFILE */}
                <div className="flex flex-col items-center text-center border-b border-gray-200 pb-6">

                    <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                        {user?.username?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <h2 className="mt-4 text-lg font-semibold text-gray-800">
                        {user?.username || "User"}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Software Developer
                    </p>

                    {/* PROFILE COMPLETION */}
                    <div className="w-full mt-5">

                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Profile Completion</span>
                            <span>75%</span>
                        </div>

                        <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">

                            <div className="h-full w-[75%] bg-blue-500 rounded-full"></div>

                        </div>
                    </div>
                </div>

                {/* NAVIGATION */}
                <div className="mt-6 space-y-2">

                    <button onClick={()=>setActiveSection("jobs")} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition">
                        <span>🏠</span>
                        Discover Jobs
                    </button>

                    <button
                        onClick={() => setActiveSection("appliedJobs")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeSection === "appliedJobs"
                                ? "bg-blue-50 text-blue-700 font-medium hover:bg-blue-100"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        📄 Applied Jobs
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition">
                        <span>⭐</span>
                        Saved Jobs
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition">
                        <span>📅</span>
                        Interviews
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition">
                        <span>💬</span>
                        Messages
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition">
                        <span>⚙️</span>
                        Settings
                    </button>

                </div>

                {/* QUICK STATS */}
                <div className="mt-8 border-t border-gray-200 pt-6">

                    <h3 className="text-sm font-semibold text-gray-700 mb-4">
                        Your Activity
                    </h3>

                    <div className="space-y-3">

                        <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">

                            <span className="text-sm text-gray-600">
                                Applications
                            </span>

                            <span className="font-semibold text-gray-800">
                                12
                            </span>

                        </div>

                        <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">

                            <span className="text-sm text-gray-600">
                                Saved Jobs
                            </span>

                            <span className="font-semibold text-gray-800">
                                8
                            </span>

                        </div>

                        <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">

                            <span className="text-sm text-gray-600">
                                Interviews
                            </span>

                            <span className="font-semibold text-gray-800">
                                2
                            </span>

                        </div>

                    </div>
                </div>
            </div>

            {/* BOTTOM SECTION */}
            <div className="border-t border-gray-200 pt-4 mt-6">

                <button className="w-full rounded-xl bg-red-50 text-red-600 py-3 font-medium hover:bg-red-100 transition">
                    Logout
                </button>

            </div>
        </div>
    );
}
