import Link from 'next/link';
import { LIBRARIES, CATEGORY_LABELS, LibCategory } from './lib/libraries';

function LibraryGrid({ libs }: { libs: typeof LIBRARIES }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {libs.map((lib) => (
        <Link
          key={lib.slug}
          href={`/reference/${lib.slug}`}
          className="bg-surface border border-border rounded-[10px] p-5 flex items-start gap-4 no-underline text-inherit transition-all duration-150 hover:-translate-y-px hover:border-border2 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 font-mono border border-[color:var(--icon-border)]"
            style={
              {
                color: lib.color,
                borderColor: lib.color + '33',
                '--icon-border': lib.color + '33',
              } as React.CSSProperties
            }
          >
            {lib.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-semibold text-text tracking-tight mb-1">
              {lib.title}
            </div>
            <div className="text-[12px] text-text2 leading-relaxed mb-2">
              {lib.description}
            </div>
            <div className="text-[11px] text-text3">
              {lib.sections.length}개 섹션
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function CategorySection({ category }: { category: LibCategory }) {
  const libs = LIBRARIES.filter((lib) => lib.category === category);
  if (libs.length === 0) return null;

  return (
    <section className="mb-10 last:mb-0">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-[13px] font-semibold text-text2 tracking-wide uppercase">
          {CATEGORY_LABELS[category]}
        </h2>
        <div className="flex-1 h-px bg-border" />
        <span className="text-[11px] text-text3">{libs.length}개</span>
      </div>
      <LibraryGrid libs={libs} />
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-surface border-b border-border px-10 py-8">
        <div className="max-w-[1100px] mx-auto flex items-center gap-5">
          <div className="w-11 h-11 bg-text text-surface rounded-[10px] flex items-center justify-center text-sm font-bold tracking-wide shrink-0">
            DS
          </div>
          <div>
            <h1 className="text-[20px] font-semibold tracking-tight text-text">
              Python DS Reference
            </h1>
            <p className="text-[13px] text-text2 mt-0.5">
              데이터 사이언스 핵심 레퍼런스 — 항목을 클릭해서 바로 확인
            </p>
          </div>
        </div>
      </header>

      {/* Grid */}
      <div className="max-w-[1100px] mx-auto px-10 py-10">
        <CategorySection category="ml" />
        <CategorySection category="dl" />
      </div>
    </div>
  );
}