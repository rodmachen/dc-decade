import { StoryCard } from "./StoryCard";

interface Story {
  id: number;
  title: string;
  feature: string;
  sequenceNumber: number;
  type: { name: string };
}

interface StoryListProps {
  stories: Story[];
}

export function StoryList({ stories }: StoryListProps) {
  if (stories.length === 0) return null;

  return (
    <div className="mt-4">
      <h2 className="text-base font-bold text-text-primary px-4 mb-2">Stories</h2>
      {stories.map((story) => (
        <StoryCard
          key={story.id}
          title={story.title}
          feature={story.feature}
          typeName={story.type.name}
          sequenceNumber={story.sequenceNumber}
        />
      ))}
    </div>
  );
}
