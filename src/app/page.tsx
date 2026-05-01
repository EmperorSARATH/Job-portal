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

                    <div className="orbit-section ">
                        <div className="w-full">
                            {/* Center Text */}
                            <h2 className="orbit-title text-black w-full whitespace-nowrap">
                                WELCOME TO JOB PORTAL
                            </h2>
                        </div>



                        {/* Orbit Container */}
                        {/* <div className="orbit-wrapper"> */}
                        {/**/}
                        {/*     {icons.map((icon, index) => ( */}
                        {/*         <div key={index} className={`orbit-item ${icon.className}`}> */}
                        {/*             <img src={icon.src} alt="tech" /> */}
                        {/*         </div> */}
                        {/*     ))} */}
                        {/**/}
                        {/* </div> */}

                    </div>

                    <div className="border-4 border-black rounded-xl flex flex-row gap-3  ">

                        <div className="flex flex-row  gap-8 z-10">
                            <select className="border-2 border-black rounded-lg p-2 text-black">
                                <option>Job</option>
                                <option>Frontend Developer</option>
                                <option>Backend Developer</option>
                                <option>Full Stack Developer</option>
                            </select>

                            <select className="border-2 border-black rounded-lg p-2 text-black">
                                <option>Location</option>
                                <option>Kerala</option>
                                <option>Trivandrum</option>
                                <option>Bangalore</option>
                            </select>

                            <button className="text-black bg-green-200 rounded-lg p-2 border-2 border-green-300">Search</button>
                        </div>
                    </div>
                </div>

                {/* MAIN PHRASE */}
                <div className="relative z-10 text-center mt-10">


                </div>

            </div>

            <div
                id="user-selection"
                className="flex items-center justify-center h-screen bg-gray-100"
            >
                {/* DOWN ARROW */}
                <div className="arrow-container mt-2" onClick={handleArrowClick}>
                    <span className="scroll-arrow">▼</span>
                </div>



                {/* New Section */}
                <HomeUserSelection ref={nextSectionRef} />
            </div>

        </>
    );
}
