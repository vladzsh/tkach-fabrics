import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {Hero} from '@/components/home/Hero';
import {CategoryGrid} from '@/components/home/CategoryGrid';
import {ContactCta} from '@/components/home/ContactCta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});
  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <CategoryGrid />
      <ContactCta />
    </main>
  );
}
