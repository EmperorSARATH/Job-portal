

export default function PersonalDetail() {


    return (
        <div className="h-screen pt-16">
            <div className="heading text-left">
                <h1>Personal Detail</h1>
            </div>
            <form className="space-y-6 max-w-lg">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300 text-black"
                        placeholder="Enter your name"
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                        type="tel"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300 text-black"
                        placeholder="Enter your phone number"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300 text-black"
                        placeholder="Enter your email"
                    />
                </div>

                {/* Twitter */}
                <div>
                    <label className="block text-sm font-medium mb-1">Twitter</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300 text-black"
                        placeholder="@yourhandle"
                    />
                </div>

                {/* Profile Summary */}
                <div>
                    <label className="block text-sm font-medium mb-1">Profile Summary</label>
                    <textarea
                        className="w-full border border-gray-300 rounded-lg p-2 h-28 resize-none focus:outline-none focus:ring focus:ring-blue-300 text-black"
                        placeholder="Write a short profile summary..."
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Save
                </button>
            </form>
        </div>
    )
}
