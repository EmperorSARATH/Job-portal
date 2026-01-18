import React from "react";

const DirectChat: React.FC = () => {
  return (
    <div
      className="
        fixed bottom-4 right-4
        w-80 h-96
        bg-white
        rounded-lg
        shadow-2xl
        z-50
        flex flex-col
      "
    >
      {/* Header */}
      <div className="p-3 border-b font-semibold text-gray-800">
        Direct Chat
      </div>

      {/* Messages area */}
      <div className="flex-1 p-3 overflow-y-auto text-sm text-gray-700">
        <p>Chat opened</p>
      </div>

      {/* Input */}
      <div className="p-2 border-t">
        <input
          type="text"
          placeholder="Type a message..."
          className="
            w-full
            px-3 py-2
            text-sm
            border rounded-md
            focus:outline-none focus:ring-2 focus:ring-gray-300
            text-black
          "
        />
      </div>
    </div>
  );
};

export default DirectChat;

