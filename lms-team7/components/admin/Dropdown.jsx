'use client'
import React, { useState } from "react";

export default function Dropdown({ label, count, users }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block text-left w-full mb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        <span>{label}: {count}</span>
        <span className={`ml-2 text-xl font-bold transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <div className="origin-top-right absolute left-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            {users.map((user, idx) => (
              <div key={idx} className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 cursor-pointer">
                {user.firstName} {user.lastName}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
