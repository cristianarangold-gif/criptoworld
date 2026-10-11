import type { Locale } from './config';

const dictionaries = {
  en: () => import('@/messages/en.json').then((m) => m.default),
  es: () => import('@/messages/es.json').then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  const loader = dictionaries[locale] ?? dictionaries.en;
  return loader();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
