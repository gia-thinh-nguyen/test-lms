'use client'
import React, { useState } from "react";
import DeleteUserButton from "./DeleteUserButton";

export default function UserDropdown({ label, count, users }) {
    const [open, setOpen] = useState(false);
    // Role-based color classes
    const getRoleColorClass = (role) => {
        switch(role) {
        case 'admin':
            return 'text-red-600 font-semibold';
        case 'teacher':
            return 'text-blue-600 font-medium';
        case 'student':
            return 'text-green-600';
        default:
            return 'text-gray-600';
        }
    };
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
            {users.map((user, idx) => {
                const firstName = user.firstName;
                const lastName = user.lastName;
                const fullName = `${firstName} ${lastName}`;
                return (
                    <div key={idx} className="flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded-full uppercase font-bold ${getRoleColorClass(user.role)} bg-gray-100`}>
                            {user.role}
                          </span>
                          <span className="font-medium text-gray-900">{fullName}</span>
                        </div>
                        <span className="text-gray-500 text-xs mt-1">{user.emailAddress}</span>
                      </div>
                      <DeleteUserButton userId={user.id} />
                    </div>
                );
                })}
          </div>
        </div>
      )}
    </div>
  );
}
