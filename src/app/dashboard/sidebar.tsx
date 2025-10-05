"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../store/userSlice";
import { AppDispatch } from "../store/store";
import Cookies from 'js-cookie';
import Image from "next/image";
interface SidebarProps {
  name?: string,
  type?: string
}
export default function Sidebar({ name, type }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const path: string | undefined = type != undefined ? "/EmployerLogin" : undefined;
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.clear();
    Cookies.remove('JWT');
    console.log("path ======",path);
    router.replace(path ?? "/login");
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isOpen && !(event.target as HTMLElement).closest("#sidebar")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);


  return (
    <div className="relative">
      {/* Circular Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
      >
        <Image
          src="/profile.jpg"
          alt="Profile"
          className="w-10 h-10 rounded-full"
          width={2}
          height={2}
        />
      </button>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed top-16 right-4 w-64 h-40 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-4 transition-all duration-300 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
          }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-black">{name}</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-600">
            ✖
          </button>
        </div>
        <ul className="flex flex-col gap-2">
          <li>
            <a href="#" className="text-gray-700 hover:text-gray-900 hover:bg-gray-200">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-gray-900 hover:bg-gray-200">
              Settings
            </a>
          </li>
          <li>
            <button onClick={handleLogout}>
              <a href="#" className="text-gray-700 hover:text-gray-900 hover:bg-gray-200">
                Logout
              </a>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

