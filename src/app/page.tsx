"use client"; // Ensure client-side rendering 
import { useRef, useState, useEffect } from "react";
import HomeUserSelection from "./components/homeUserSelection";
import "./page.css";
import { useRouter } from "next/navigation";

export default function SmoothScrollPage() {
    const nextSectionRef = useRef<HTMLDivElement>(null);

    const handleArrowClick = () => {
        nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const phrases = [
        "Explore Opportunities",
        "Welcome to Job Portal",
        "Collaborate with Brilliant Minds",
    ];

    const [fade, setFade] = useState(true);

    const [currentIndex, setCurrentIndex] = useState(0);
    
    const router = useRouter();


    const icons = [
        { src: "/Images/java2.png", className: "icon1" },
        { src: "/Images/js2.png", className: "icon2" },
        { src: "/Images/github2.png", className: "icon3" },
        { src: "/Images/c++2.png", className: "icon4" },
        /*       { src: "/Images/go.png", className: "icon5" } */
    ];


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % phrases.length);
        }, 4500);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-100">

        {/* Background decoration */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />

        {/* Navbar */}
        <nav className="relative z-20 flex items-center justify-between px-8 md:px-16 py-6">

            <div className="text-2xl font-bold text-gray-900">
                Job<span className="text-indigo-600">Portal</span>
            </div>

            <div className="hidden md:flex items-center gap-10 text-gray-700">
                {/* <button className="hover:text-indigo-600 transition"> */}
                {/*     Browse Jobs */}
                {/* </button> */}
                {/**/}
                {/* <button className="hover:text-indigo-600 transition"> */}
                {/*     Employers */}
                {/* </button> */}
                {/**/}
                {/* <button className="hover:text-indigo-600 transition"> */}
                {/*     About Us */}
                {/* </button> */}
                {/**/}
                {/* <button className="hover:text-indigo-600 transition"> */}
                {/*     Contact */}
                {/* </button> */}
            </div>

            <button
                onClick={() => handleArrowClick()}
                className="
                    px-6 py-3
                    rounded-xl
                    text-white
                    font-semibold
                    bg-gradient-to-r from-indigo-600 to-purple-600
                    shadow-lg shadow-indigo-300/40
                    hover:scale-105
                    transition
                "
            >
                Sign In
            </button>
        </nav>


        {/* HERO */}
        <div className="
            relative z-10
            max-w-7xl
            mx-auto
            px-8 md:px-16
            pt-16 md:pt-24
            grid md:grid-cols-2
            gap-16
            items-center
        ">

            {/* LEFT SIDE */}
            <div>

                <div className="
                    inline-flex
                    items-center
                    gap-2
                    px-4 py-2
                    rounded-full
                    bg-white/70
                    backdrop-blur
                    border border-indigo-100
                    shadow-sm
                    text-indigo-600
                    text-sm
                    font-medium
                    mb-6
                ">
                    ✨ Find. Apply. Grow.
                </div>


                <h1 className="
                    text-5xl md:text-7xl
                    font-extrabold
                    leading-tight
                    text-gray-900
                ">
                    Find Your

                    <span className="
                        block
                        text-transparent
                        bg-clip-text
                        bg-gradient-to-r
                        from-indigo-600
                        via-purple-600
                        to-blue-500
                    ">
                        Dream Job
                    </span>
                </h1>


                <p className="
                    mt-6
                    text-lg
                    md:text-xl
                    text-gray-600
                    max-w-xl
                    leading-relaxed
                ">
                    Discover opportunities from top companies,
                    showcase your skills, and take the next step
                    in your career.
                </p>


                {/* SEARCH CARD */}
                <div className="
                    mt-10
                    p-4
                    md:p-5
                    rounded-2xl
                    bg-white/80
                    backdrop-blur-xl
                    border border-white
                    shadow-2xl
                    shadow-indigo-200/40
                ">

                    <div className="
                        flex flex-col
                        md:flex-row
                        gap-3
                    ">

                        {/* JOB */}
                        <div className="
                            flex-1
                            flex items-center
                            gap-3
                            px-4 py-3
                            rounded-xl
                            border border-gray-200
                            bg-white
                        ">

                            <span className="text-gray-400">
                                💼
                            </span>

                            <select
                                className="
                                    w-full
                                    outline-none
                                    bg-transparent
                                    text-gray-700
                                "
                            >
                                <option>Job Title or Keyword</option>
                                <option>Frontend Developer</option>
                                <option>Backend Developer</option>
                                <option>Full Stack Developer</option>
                                <option>UI/UX Designer</option>
                            </select>

                        </div>

                        {/* SEARCH BUTTON */}
                        <button
                            onClick={() => router.push("/public-jobs")}
                            className="
                                px-8 py-3
                                rounded-xl
                                font-semibold
                                text-white
                                bg-gradient-to-r
                                from-indigo-600
                                to-purple-600
                                shadow-lg
                                shadow-indigo-300/40
                                hover:scale-[1.03]
                                active:scale-95
                                transition
                            "
                        >
                            Search Jobs
                        </button>

                    </div>


                    {/* POPULAR SEARCHES */}
                    <div className="
                        flex
                        flex-wrap
                        items-center
                        gap-2
                        mt-4
                    ">

                        <span className="text-sm text-gray-500">
                            Popular:
                        </span>

                        {[
                            "Frontend Developer",
                            "Backend Developer",
                            "Full Stack",
                            "UI/UX Designer"
                        ].map((item) => (

                            <button
                                key={item}
                                className="
                                    px-3 py-1.5
                                    text-xs
                                    rounded-full
                                    bg-indigo-50
                                    text-indigo-600
                                    hover:bg-indigo-100
                                    transition
                                "
                            >
                                {item}
                            </button>

                        ))}

                    </div>

                </div>

            </div>


            {/* RIGHT SIDE */}
            <div className="
                relative
                hidden min-[1055px]:flex
                items-center
                justify-center
                h-[500px]
            ">

                {/* ORBIT */}
                <div className="
                    absolute
                    w-[420px]
                    h-[420px]
                    rounded-full
                    border border-indigo-200/70
                    skew-y-[-10deg]
                " />

                <div className="
                    absolute
                    w-[330px]
                    h-[330px]
                    rounded-full
                    border border-purple-200/60
                    skey-x-[10deg]                 
                    " />

                {/* CENTER */}
                <div className="
                    relative
                    z-10
                    w-56
                    h-56
                    rounded-3xl
                    bg-white/80
                    backdrop-blur-xl
                    border border-white
                    shadow-2xl
                    shadow-indigo-200/50
                    flex
                    items-center
                    justify-center
                    hover:scale-105
                    transition
                ">

                    <div className="text-center">

                        <div className="
                            text-7xl
                            mb-3
                        ">
                            💼
                        </div>

                        <div className="
                            font-bold
                            text-gray-800
                        ">
                            Your Career
                        </div>

                        <div className="
                            text-indigo-500
                            text-sm
                        ">
                            starts here
                        </div>

                    </div>

                </div>


                {/* FLOATING ICONS */}

                <div className="
                    absolute
                    top-4
                    right-16
                    w-16 h-16
                    rounded-2xl
                    bg-white
                    shadow-xl
                    flex items-center justify-center
                    text-2xl
                    animate-bounce
                ">
                    💻
                </div>


                <div className="
                    absolute
                    top-32
                    left-4
                    w-16 h-16
                    rounded-2xl
                    bg-white
                    shadow-xl
                    flex items-center justify-center
                    text-2xl
                ">
                    👥
                </div>


                <div className="
                    absolute
                    bottom-20
                    right-10
                    w-16 h-16
                    rounded-2xl
                    bg-white
                    shadow-xl
                    flex items-center justify-center
                    text-2xl
                ">
                    🏢
                </div>


                <div className="
                    absolute
                    bottom-10
                    left-20
                    w-16 h-16
                    rounded-2xl
                    bg-white
                    shadow-xl
                    flex items-center justify-center
                    text-2xl
                ">
                    📈
                </div>

            </div>

        </div>


        {/* SCROLL INDICATOR */}
        <div
            onClick={handleArrowClick}
            className="
                absolute
                bottom-8
                left-1/2
                -translate-x-1/2
                flex
                flex-col
                items-center
                cursor-pointer
                group
            "
        >

            <span className="
                text-sm
                text-gray-500
                mb-2
                group-hover:text-indigo-600
                transition
            ">
                Scroll to explore
            </span>

            <div className="
                w-12 h-12
                rounded-full
                bg-white
                shadow-lg
                flex
                items-center
                justify-center
                text-indigo-600
                group-hover:translate-y-1
                transition
            ">
                ↓
            </div>

        </div>

    </section>


    {/* USER SELECTION */}
    <section
        id="user-selection"
        ref={nextSectionRef}
        className="
            min-h-screen
            bg-gray-50
            flex
            items-center
            justify-center
            px-6
            py-20
        "
    >

        <HomeUserSelection />

    </section>

</>
    );
}
