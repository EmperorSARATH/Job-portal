
"use client"; // Ensure client-side rendering
import { useRef } from "react";
import HomeUserSelection from './components/homeUserSelection';
export default function SmoothScrollPage() {
  const nextSectionRef = useRef<HTMLDivElement>(null);

  const handleArrowClick = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col h-screen">
        <div className="current-page-content">
          <h1
            className="text-center text-5xl custom-h1"
            style={{ fontFamily: "'Lobster', cursive" }}
          >
            Welcome to Job-Portal
          </h1>
          <div className="arrow-container" onClick={handleArrowClick}>
            <span className="arrow text-2xl" >{"▼"}</span>
          </div>
        </div>
      </div>

      {/* New Section */}
      <HomeUserSelection ref={nextSectionRef} />
    </>
  );
}

