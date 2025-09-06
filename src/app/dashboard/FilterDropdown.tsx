import { apiClient } from "@/lib/apiClient";
import { useEffect, useState } from "react";

interface FilterDropdownProps {
  onFilterChange: (filter: string | null) => void;
}

export default function FilterDropdown({ onFilterChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);


  const [locationSearchTerm, setLocationSearchTerm] = useState('');
  const [locationResults, setLocationResults] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (openCategory === 'Location' && locationSearchTerm.trim() !== '') {
        apiClient(`http://localhost:8080/api/locations?search=${encodeURIComponent(locationSearchTerm)}`)
          .then((response) => response.json())
          .then((data) => {
            const cities = data.map((item: { city: string }) => item.city);
            setLocationResults(cities);

          })
          .catch((err) => {
            console.error('Location search failed', err);
          });
      } else {
        setLocationResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [locationSearchTerm, openCategory]);




  const options = [
    {
      label: "Category",
      type: "category",
      children: ["Books", "Electronics", "Clothing"],
    },
    {
      label: "Location",
      type: "Location",
      children: ["Ernakulam", "Bangalore", "Chennai"],
    },
    {
      label: "Rating",
      type: "rating",
      children: ["1 Star", "2 Stars", "3+ Stars"],
    },
  ];

  const toggleCategory = (label: string) => {
    setOpenCategory(openCategory === label ? null : label);
  };

  const handleSelectCity = (city: string) => {
    if (city === 'nill') {
      onFilterChange(null);
      setSelectedCity(null);
    } else {
      onFilterChange(city);
      console.log("Selected city:", city);
      setSelectedCity(city);
    }

    // You can also call an API or update parent state here
  };

  return (
    <div className="relative inline-block">
      <button
        className="p-2 bg-gray-200 rounded text-black"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {/* Simple Text or Icon */}
        🔍 Filter
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-gray-300 rounded shadow z-50">
          {options.map((option) => (
            <div key={option.label} className="border-b last:border-b-0 text-black">
              <button
                onClick={() => toggleCategory(option.label)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 font-medium"
              >
                {option.label}
              </button>
              {openCategory === option.label && (
                <div className="pl-6 py-1 bg-gray-50">
                  {option.label === "Location" && (
                    <>
                      <input
                        type="text"
                        placeholder="Search location..."
                        value={locationSearchTerm}
                        onChange={(e) => setLocationSearchTerm(e.target.value)}
                        className="w-full px-2 py-1 mb-2 border border-gray-300 rounded text-black"
                      />
                      {locationResults.map((result) => (
                        <div
                          key={result}
                          className={`px-2 py-1 text-sm cursor-pointer rounded 
              ${selectedCity === result ? "bg-green-200" : "hover:bg-gray-100"}`}                          onClick={() => handleSelectCity(result)}
                        >
                          {result}
                        </div>
                      ))}
                    </>
                  )}

                  {selectedCity && (
                    <button
                      onClick={() => handleSelectCity("nill")}
                      className="mt-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}

                </div>
              )}
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

