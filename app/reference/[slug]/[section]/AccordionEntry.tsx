'use client';

import { useState } from 'react';
import type { Entry, Block } from '../../../lib/types';

interface Props {
  entry: Entry;
  defaultOpen?: boolean;
}

export default function AccordionEntry({ entry, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`entry${open ? ' open' : ''}`}>
      {/* Head */}
      <div className="entry-head" onClick={() => setOpen((v) => !v)}>
        <span
          className="fn-name"
          dangerouslySetInnerHTML={{ __html: entry.fnName }}
        />
        {entry.badgeText && (
          <span className={`badge ${entry.badgeCls}`}>{entry.badgeText}</span>
        )}
        <svg
          className="chevron"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          width="18"
          height="18"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Body */}
      {open && (
        <div className="entry-body">
          <div className="entry-inner">
            {entry.blocks.map((block, i) => (
              <BlockRenderer key={i} block={block} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'meaning':
      return (
        <p
          className="meaning"
          dangerouslySetInnerHTML={{ __html: block.html ?? '' }}
        />
      );
    case 'slbl':
      return <div className="slbl">{block.text}</div>;
    case 'pre':
      return (
        <pre dangerouslySetInnerHTML={{ __html: block.html ?? '' }} />
      );
    case 'tip':
      return (
        <div
          className="tip"
          dangerouslySetInnerHTML={{ __html: block.html ?? '' }}
        />
      );
    case 'warn':
      return (
        <div
          className="warn"
          dangerouslySetInnerHTML={{ __html: block.html ?? '' }}
        />
      );
    case 'table':
      return (
        <div dangerouslySetInnerHTML={{ __html: block.html ?? '' }} />
      );
    default:
      return null;
  }
}
