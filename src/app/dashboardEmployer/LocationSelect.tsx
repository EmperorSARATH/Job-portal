"use client"
import { useState } from "react";


export default function LocationSelect({ formData, setFormData }) {
    const locations = ["Ernakulam", "Kochi"];

    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const filteredLocations = locations.filter(loc =>
        loc.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (loc: string) => {
        setFormData(prev => ({ ...prev, location: loc }));
        setQuery(loc);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <label className="block font-medium text-black mb-1">
                Location
            </label>

            {/* Input box */}
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                placeholder="Search location"
                className="w-full p-2 border border-black rounded text-black"
            />

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute w-full bg-white border border-black rounded mt-1 max-h-40 overflow-y-auto z-10 text-black">
                    {filteredLocations.length > 0 ? (
                        filteredLocations.map((loc, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelect(loc)}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                            >
                                {loc}
                            </div>
                        ))
                    ) : (
                        <div className="p-2 text-gray-500">No results</div>
                    )}
                </div>
            )}
        </div>
    );
}
