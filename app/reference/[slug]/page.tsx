import { redirect, notFound } from 'next/navigation';
import { getLibrary } from '../../lib/libraries';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lib = getLibrary(slug);
  if (!lib) notFound();
  redirect(`/reference/${slug}/${lib.sections[0].id}`);
}
