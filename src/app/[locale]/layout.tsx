import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {hasLocale} from 'next-intl';
import {routing} from '@/i18n/routing';
import {localeDirection} from '@/lib/i18n';
import {Navbar} from '@/components/Navbar';
import {Footer} from '@/components/Footer';

export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: {locale: string}}) {
  const {locale} = params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale} dir={localeDirection[locale as 'ar' | 'en']}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          {children}
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
