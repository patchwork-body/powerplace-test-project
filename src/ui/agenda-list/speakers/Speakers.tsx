import { memo } from 'react';

export type Speaker = {
  id: number;
  name: string;
};

type SpeakersProps = {
  speakers: Speaker[];
};

export const Speakers = memo(function Speakers({ speakers }: SpeakersProps) {
  if (speakers.length === 0) {
    return null;
  }

  return (
    <span data-testid="agenda-point-speakers" style={{ fontStyle: 'italic' }}>
      ({speakers.map(({ name }) => name).join(' ')})
    </span>
  );
});
