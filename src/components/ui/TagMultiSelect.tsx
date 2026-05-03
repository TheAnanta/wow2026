'use client';

import React, { useEffect, useRef, useState } from 'react';

type Props = {
  options: string[];
  value: string[];
  onChange: (val: string[]) => void;
  placeholder?: string;
  maxSelected?: number;
};

export default function TagMultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Search and select tags',
  maxSelected,
}: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = options.filter(
    (opt) =>
      opt.toLowerCase().includes(query.toLowerCase()) &&
      !value.includes(opt)
  );

  const addTag = (tag: string) => {
    if (maxSelected && value.length >= maxSelected) return;
    onChange([...value, tag]);
    setQuery('');
    setOpen(false);
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {/* Selected tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-2 rounded-full border border-[#8ab4f8]/40 bg-[#4285f4]/14 px-3 py-1 text-sm font-medium text-[#d2e3fc]"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-[#d2e3fc] transition hover:text-[#f28b82]"
              aria-label={`Remove ${tag}`}
            >
              x
            </button>
          </span>
        ))}
      </div>

      {/* Input */}
      <input
        type="text"
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        placeholder={placeholder}
        className="w-full rounded-[8px] border border-white/20 bg-[#141517] px-4 py-3 text-sm text-white placeholder:text-[#9aa0a6] shadow-sm transition hover:border-white/35 focus:border-[#4285f4] focus:outline-none focus:ring-2 focus:ring-[#4285f4]/30"
      />

      {/* Dropdown */}
      {open && (
        <div className="mt-2 max-h-52 overflow-y-auto rounded-[8px] border border-white/18 bg-[#141517] py-1 text-white shadow-[0_18px_50px_rgba(0,0,0,0.38)]">
          {filtered.length > 0 ? (
            filtered.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => addTag(opt)}
                className="block w-full px-4 py-2.5 text-left text-sm text-[#e8eaed] transition hover:bg-white/10 focus:bg-white/10 focus:outline-none"
              >
                {opt}
              </button>
            ))
          ) : (
            <div className="px-4 py-2.5 text-sm text-[#9aa0a6]">
              No results
            </div>
          )}
        </div>
      )}
    </div>
  );
}
