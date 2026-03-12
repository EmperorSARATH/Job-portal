"use client"; // Ensure client-side rendering 
import { useRef, useState, useEffect } from "react";
import HomeUserSelection from "./components/homeUserSelection";
import "./page.css";

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


    const icons = [
        { src: "/Images/Java.png", className: "icon1" },
        { src: "/Images/javascript.png", className: "icon2" },
        { src: "/Images/github.png", className: "icon3" },
        { src: "/Images/C++.png", className: "icon4" },
        { src: "/Images/go.png", className: "icon5" }
    ];


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % phrases.length);
        }, 4500);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div
                className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center"
            // style={{ backgroundImage: `url(/Images/pic${currentIndex}.jpg)` }}
            >
                <div className="absolute inset-0 bg-white"></div>

                {/* TOP SECTION */}
                <div className="relative z-10 flex flex-col items-center mt-10">
                    {/**/}
                    {/* <h2 className="text-4xl text-white font-bold mb-8"> */}
                    {/*     Find Your Dream Job */}
                    {/* </h2> */}

                    <div className="orbit-section">

                        {/* Center Text */}
                        <h2 className="orbit-title text-black">
                            Find Your Dream Tech Job
                        </h2>

                        {/* Orbit Container */}
                        <div className="orbit-wrapper">

                            {icons.map((icon, index) => (
                                <div key={index} className={`orbit-item ${icon.className}`}>
                                    <img src={icon.src} alt="tech" />
                                </div>
                            ))}

                        </div>

                    </div>
                </div>

                {/* MAIN PHRASE */}
                <div className="relative z-10 text-center mt-10">


                    {/* DOWN ARROW */}
                    <div className="arrow-container mt-2" onClick={handleArrowClick}>
                        <span className="scroll-arrow">▼</span>
                    </div>

                </div>

            </div>

            <div
                id="user-selection"
                className="flex items-center justify-center h-screen bg-gray-100"
            >

                {/* New Section */}
                <HomeUserSelection ref={nextSectionRef} />
            </div>

        </>
    );
}
