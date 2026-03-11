"use client";

import { useEffect, useRef, useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputId?: string;
  label?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  inputId = "search-input",
  label,
}: SearchBarProps) {
  const [local, setLocal] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setLocal(v);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onChange(v), 300);
  }

  return (
    <div className="px-4 py-3">
      <label htmlFor={inputId} className="sr-only">
        {label || placeholder}
      </label>
      <input
        id={inputId}
        type="text"
        value={local}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full h-11 px-4 rounded-lg bg-bg-card border border-border text-text-primary placeholder:text-text-muted text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      />
    </div>
  );
}
