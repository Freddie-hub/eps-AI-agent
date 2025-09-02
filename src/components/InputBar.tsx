import { Plus, Mic, Waves } from "lucide-react";

export default function InputBar() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-full w-full max-w-xl text-gray-400">
      {/* Left Icon */}
      <button className="hover:text-white">
        <Plus size={20} />
      </button>

      {/* Placeholder */}
      <div className="flex-1 text-sm text-gray-400">
        Ask anything
      </div>

      {/* Right Icons */}
      <button className="hover:text-white">
        <Mic size={20} />
      </button>
      <button className="hover:text-white">
        <Waves size={20} />
      </button>
    </div>
  );
}
