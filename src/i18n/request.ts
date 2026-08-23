import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  let messages = (await import(`../../messages/${locale}.json`)).default;
  try {
    const privacy = (await import(`../../messages/${locale}/privacy.json`)).default;
    messages = { ...messages, Privacy: privacy };
  } catch (e) {}

  try {
    const deleteAccount = (await import(`../../messages/${locale}/delete-account.json`)).default;
    messages = { ...messages, DeleteAccount: deleteAccount };
  } catch (e) {}

  return {
    locale,
    messages
  };
});
