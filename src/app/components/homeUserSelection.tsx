import Link from 'next/link';
import React, { forwardRef, useState } from 'react';

const HomeUserSelection = forwardRef<HTMLDivElement>((_, ref) => {
    const [hovered, setHovered] = useState<'employee' | 'employer' | null>(null);

    return (
        <div
            ref={ref}
            className="relative flex flex-col md:flex-row items-center justify-center h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden px-6 gap-8 md:gap-0"
        >
            {/* Employee Card */}
            <div
                onMouseEnter={() => setHovered('employee')}
                onMouseLeave={() => setHovered(null)}
                className={`group relative w-full max-w-sm border border-gray-200 shadow-lg rounded-2xl p-8 bg-white
                transition-all duration-300 ease-out
                hover:-translate-y-2 hover:shadow-2xl hover:border-green-400
                ${hovered === 'employer' ? 'md:scale-95 opacity-70' : 'md:scale-100'}`}
            >
                <div className="overflow-hidden rounded-xl mb-4">
                    <img
                        src="/Images/employee.jpg"
                        alt="Employee"
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                <h1
                    className="text-center text-4xl md:text-5xl text-black"
                    style={{ fontFamily: "'Lobster', cursive" }}
                >
                    Employee
                </h1>
                <p className="mt-3 text-center text-lg text-gray-500">
                    Looking for your next opportunity?
                </p>

                <div className="mt-6 flex flex-col gap-3">
                    <Link href="/login" className="w-full">
                        <button className="w-full bg-black text-white px-4 py-3 rounded-lg font-medium
                            transition-all duration-200 hover:bg-gray-800 hover:shadow-md active:scale-95">
                            Log In
                        </button>
                    </Link>
                    <Link href="/Registration/EmployeeReg" className="w-full">
                        <button className="w-full border-2 border-green-500 text-green-600 px-4 py-3 rounded-lg font-medium
                            transition-all duration-200 hover:bg-green-500 hover:text-white active:scale-95">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>

            {/* Divider */}
            <div className="hidden md:flex flex-col items-center justify-center mx-8 shrink-0">
                <span className="h-24 w-px bg-gray-300" />
                <span className="my-3 text-sm font-semibold text-gray-400 tracking-widest">OR</span>
                <span className="h-24 w-px bg-gray-300" />
            </div>

            {/* Employer Card */}
            <div
                onMouseEnter={() => setHovered('employer')}
                onMouseLeave={() => setHovered(null)}
                className={`group relative w-full max-w-sm border border-gray-200 shadow-lg rounded-2xl p-8 bg-white
                transition-all duration-300 ease-out
                hover:-translate-y-2 hover:shadow-2xl hover:border-blue-400
                ${hovered === 'employee' ? 'md:scale-95 opacity-70' : 'md:scale-100'}`}
            >
                <div className="overflow-hidden rounded-xl mb-4">
                    <img
                        src="/Images/employer.jpg"
                        alt="Employer"
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                <h1
                    className="text-center text-4xl md:text-5xl text-black"
                    style={{ fontFamily: "'Lobster', cursive" }}
                >
                    Employer
                </h1>
                <p className="mt-3 text-center text-lg text-gray-500">
                    Ready to find great talent?
                </p>

                <div className="mt-6 flex flex-col gap-3">
                    <Link href="/EmployerLogin" className="w-full">
                        <button className="w-full bg-black text-white px-4 py-3 rounded-lg font-medium
                            transition-all duration-200 hover:bg-gray-800 hover:shadow-md active:scale-95">
                            Log In
                        </button>
                    </Link>
                    <Link href="/Registration/EmployeeReg" className="w-full">
                        <button className="w-full border-2 border-blue-500 text-blue-600 px-4 py-3 rounded-lg font-medium
                            transition-all duration-200 hover:bg-blue-500 hover:text-white active:scale-95">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
});

HomeUserSelection.displayName = 'SecondSection';
export default HomeUserSelection;


