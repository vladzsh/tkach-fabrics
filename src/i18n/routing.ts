import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'uk', 'tr', 'ru'],
  defaultLocale: 'uk',
  localePrefix: 'as-needed'
});
