import Link from 'next/link';
import type { Library } from '../../../lib/libraries';
import type { Entry } from '../../../lib/types';
import AccordionEntry from './AccordionEntry';

interface Props {
  lib: Library;
  activeSection: string;
  entries: Entry[];
}

export default function SectionPage({ lib, activeSection, entries }: Props) {
  const activeMeta = lib.sections.find((s) => s.id === activeSection);

  return (
    <div className="ref-layout">
      {/* Sidebar */}
      <nav className="ref-sidebar">
        <Link href="/" className="sidebar-back">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          목록으로
        </Link>
        <div className="sidebar-title">{lib.title}</div>
        {lib.sections.map((sec) => (
          <Link
            key={sec.id}
            href={`/reference/${lib.slug}/${sec.id}`}
            className={`nav-item${activeSection === sec.id ? ' on' : ''}`}
          >
            {sec.label}
          </Link>
        ))}
      </nav>

      {/* Main */}
      <main className="ref-main">
        <div className="page-header">
          <h1>{lib.title} 핵심 레퍼런스</h1>
          <p>의미 · 핵심 파라미터 · 코드 예시 — 항목을 클릭해서 펼쳐보세요</p>
        </div>

        <div>
          {entries.map((entry, i) => (
            <AccordionEntry key={i} entry={entry} defaultOpen={i === 0} />
          ))}
        </div>
      </main>
    </div>
  );
}
