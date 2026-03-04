"use client";

export type SearchTab = "series" | "creators" | "issues";

interface SearchTabsProps {
  active: SearchTab;
  onChange: (tab: SearchTab) => void;
}

const tabs: { key: SearchTab; label: string }[] = [
  { key: "series", label: "Series" },
  { key: "creators", label: "Creators" },
  { key: "issues", label: "Issues" },
];

export function SearchTabs({ active, onChange }: SearchTabsProps) {
  return (
    <div className="flex px-4 gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex-1 py-2.5 text-sm font-medium rounded-lg min-h-[44px] transition-colors ${
            active === tab.key
              ? "bg-primary text-text-inverse"
              : "bg-bg-card text-text-secondary border border-border"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
