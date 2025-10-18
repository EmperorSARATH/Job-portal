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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % phrases.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="flex items-center justify-center flex-col h-screen">
                <div className="current-page-content">

                    <h1
                        className={`"text-center text-5xl custom-h1" custom-h1 ${fade ? "fade-in" : "fade-out"}`}
                        style={{ fontFamily: "'Lobster', cursive" }}

                    >
                        {phrases[currentIndex]}
                    </h1>
                    <div className="arrow-container" onClick={handleArrowClick}>
                        <span className="arrow text-2xl">{"▼"}</span>
                    </div>
                </div>
            </div>

            {/* New Section */}
            <HomeUserSelection ref={nextSectionRef} />
        </>
    );
}
