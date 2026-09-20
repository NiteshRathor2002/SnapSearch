import React from "react";
import { Search } from "lucide-react";

export const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="relative w-full group">
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
        <Search className="h-6 w-6 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
      </div>
      <input
        type="text"
        className="block w-full pl-14 pr-6 py-5 bg-slate-800 border border-slate-700 rounded-2xl text-lg text-slate-50 placeholder-slate-400 focus:outline-none focus:ring-[1px] focus:ring-indigo-500/50 focus:border-indigo-500/50 shadow-lg transition-all"
        placeholder="Search for text (e.g., 'invoice', 'Aadhaar')..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};
