import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { World } from '@/types';

interface WorldChipProps {
  world: Pick<World, 'slug' | 'label' | 'emoji' | 'accent'>;
  size?: 'sm' | 'md';
  asLink?: boolean;
  className?: string;
}

export function WorldChip({ world, size = 'sm', asLink = false, className }: WorldChipProps) {
  const content = (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-semibold tracking-wide transition-all',
        size === 'sm' && 'px-2.5 py-0.5 text-[10px]',
        size === 'md' && 'px-3 py-1 text-xs',
        className
      )}
      style={{
        backgroundColor: world.accent.chip,
        color: world.accent.chipText,
      }}
    >
      <span className="text-[11px] leading-none">{world.emoji}</span>
      <span style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>{world.label}</span>
    </span>
  );

  if (asLink) {
    return (
      <Link to={`/worlds/${world.slug}`} className="hover:opacity-80 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}
