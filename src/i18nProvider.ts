import polyglotI18nProvider from 'ra-i18n-polyglot';
import en from 'ra-language-english';
import ru from 'ra-language-russian';

const translations: any = { en, ru };

export const i18nProvider = polyglotI18nProvider(
    locale => translations[locale],
    'ru', // default locale
    [{ locale: 'ru', name: 'Русскый' }],
);
