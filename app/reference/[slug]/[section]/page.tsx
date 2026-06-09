import { notFound, redirect } from 'next/navigation';
import { getLibrary, LIBRARIES } from '../../../lib/libraries';
import { SectionData } from '../../../lib/types';
import fs from 'fs';
import path from 'path';
import SectionPage from './SectionPage';

type Params = { slug: string; section: string };

export async function generateStaticParams() {
  const params: Params[] = [];
  for (const lib of LIBRARIES) {
    for (const sec of lib.sections) {
      params.push({ slug: lib.slug, section: sec.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug, section } = await params;
  const lib = getLibrary(slug);
  if (!lib) return {};
  const sec = lib.sections.find((s) => s.id === section);
  return { title: `${lib.title} — ${sec?.label ?? section} | DS Reference` };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug, section } = await params;
  const lib = getLibrary(slug);
  if (!lib) notFound();

  const validSection = lib.sections.find((s) => s.id === section);
  if (!validSection) notFound();

  const dataPath = path.join(process.cwd(), 'public', 'data', `${slug}.json`);
  const raw = fs.readFileSync(dataPath, 'utf-8');
  const data: SectionData = JSON.parse(raw);
  const entries = data[section] ?? [];

  return (
    <SectionPage
      lib={lib}
      activeSection={section}
      entries={entries}
    />
  );
}
