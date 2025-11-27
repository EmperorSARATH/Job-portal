

"use client"

import { useState } from 'react';
import './page.css';
export default function Page() {

    const [activeSection, setActiveSection] = useState("github");
    return (
        <div className="flex h-screen w-full">
            {/* Sidebar */}
            <aside className="sidebar  bg-gray-100 border-r border-gray-300 p-6">
                <div className="avatar mb-4">
                    <img src="/Images/pic0.jpg" alt="avatar" />
                </div>
                <h1 className="text-xl font-semibold mb-4 text-black">Profile</h1>
                <h1 className='text-black mb-4'>-------------------------</h1>
                <ul className='text-black'>
                    <li><button onClick={()=>setActiveSection("")}>Personal Detail</button></li>
                    <li><button>Profile Summary</button></li>
                    <li><button>Skills</button></li>
                    <li><button>Saved jobs</button></li>
                    <li><button onClick={()=>setActiveSection("github")}>Github connect </button></li>


                </ul>
            </aside>
            <div className="right-screen flex-1 flex items-center justify-center p-6">

                {/* CONDITIONAL CONTENT */}
                {activeSection === "github" && (
                    <div className="bg-white shadow-lg rounded-xl p-8 w-96">
                        <h2 className="text-black text-xl font-semibold mb-4 text-center">Connect GitHub</h2>

                        <form className="space-y-4">
                            <div>
                                <label className="text-black">GitHub Username</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 p-2 rounded text-black"
                                    placeholder="Enter GitHub username"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
                            >
                                Connect
                            </button>
                        </form>
                    </div>
                )}

                {activeSection === "" && (
                    <p className="text-gray-500 text-lg">Select an item from the left menu</p>
                )}
            </div>


            {/* Main Content */}
            <main className="flex-1 p-6">
                {/* Empty for now */}
            </main>
        </div>
    );
}
