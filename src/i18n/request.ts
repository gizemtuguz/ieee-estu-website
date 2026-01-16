import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from '../../i18n.config';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const isLocale = (value: string): value is Locale =>
    locales.includes(value as Locale);
  const locale =
    typeof requested === 'string' && isLocale(requested)
      ? requested
      : defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
