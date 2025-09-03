"use client";

export default function FilePreview({
  file,
  onRemove,
}: {
  file: File;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full text-sm">
      <span>{file.name}</span>
      <button
        onClick={onRemove}
        className="text-red-400 hover:text-red-600 font-bold"
      >
        ✕
      </button>
    </div>
  );
}
