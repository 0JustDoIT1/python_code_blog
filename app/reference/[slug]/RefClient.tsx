'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import type { Library } from '../../lib/libraries';

interface RefData {
  nav: string;
  pageHeader: string;
  sections: Record<string, string>;
}

interface Props {
  lib: Library;
  data: RefData;
}

/** HTML 문자열에서 인라인 onclick 속성을 모두 제거 */
function stripOnclick(html: string): string {
  return html.replace(/\s+onclick="[^"]*"/g, '');
}

export default function RefClient({ lib, data }: Props) {
  const [activeSection, setActiveSection] = useState(lib.sections[0]?.id ?? '');

  // ref 콜백 — DOM이 교체될 때마다 즉시 실행되어 이벤트를 바인딩
  const sectionRefCallback = (el: HTMLDivElement | null) => {
    if (!el) return;
    el.querySelectorAll<HTMLElement>('.entry-head').forEach((head) => {
      head.addEventListener('click', () => {
        head.closest('.entry')?.classList.toggle('open');
      });
    });
  };

  function getCount(secId: string): string {
    const m = data.nav.match(
      new RegExp(`show\\('${secId}'\\)[^>]*>\\s*[^<]*<span class="nav-count">(\\d+)</span>`)
    );
    return m ? m[1] : '';
  }

  const rawHtml = data.sections[activeSection] ?? '';
  // 1) section을 on으로 강제, 2) onclick 인라인 속성 제거
  const safeHtml = stripOnclick(
    rawHtml.replace(/class="section(\s+on)?"/, 'class="section on"')
  );

  return (
    <div className="ref-layout">
      {/* Sidebar */}
      <nav className="ref-sidebar">
        <Link href="/" className="sidebar-back">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          목록으로
        </Link>
        <div className="sidebar-title">{lib.title}</div>
        {lib.sections.map((sec) => {
          const count = getCount(sec.id);
          return (
            <button
              key={sec.id}
              className={`nav-item${activeSection === sec.id ? ' on' : ''}`}
              onClick={() => setActiveSection(sec.id)}
            >
              {sec.label}
              {count && <span className="nav-count">{count}</span>}
            </button>
          );
        })}
      </nav>

      {/* Main */}
      <main className="ref-main">
        <div dangerouslySetInnerHTML={{ __html: stripOnclick(data.pageHeader) }} />
        {/* key를 activeSection으로 지정 → 섹션 전환 시 DOM 완전 교체 → ref 콜백 재실행 */}
        <div
          key={activeSection}
          ref={sectionRefCallback}
          dangerouslySetInnerHTML={{ __html: safeHtml }}
        />
      </main>
    </div>
  );
}
