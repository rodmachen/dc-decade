interface NameVariant {
  id: number;
  name: string;
  isOfficialName: boolean;
}

interface NameVariantsProps {
  variants: NameVariant[];
}

export function NameVariants({ variants }: NameVariantsProps) {
  if (variants.length === 0) return null;

  return (
    <div className="px-4 py-4">
      <h2 className="text-base font-bold text-text-primary mb-2">Name Variants</h2>
      <ul className="space-y-1">
        {variants.map((v) => (
          <li key={v.id} className="text-sm text-text-secondary flex items-center gap-2">
            <span>{v.name}</span>
            {v.isOfficialName && (
              <span className="text-xs bg-accent text-text-inverse px-1.5 py-0.5 rounded">
                Official
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
