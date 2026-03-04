interface CreatorHeaderProps {
  name: string;
  bio: string;
}

export function CreatorHeader({ name, bio }: CreatorHeaderProps) {
  return (
    <div className="bg-primary-dark px-4 py-6">
      <h1 className="text-2xl font-bold text-text-inverse">{name}</h1>
      {bio && (
        <p className="mt-2 text-sm text-text-inverse opacity-80 line-clamp-4">
          {bio}
        </p>
      )}
    </div>
  );
}
