import { en } from "~/i18n/en";
import { ru } from "~/i18n/ru";
import { Locale } from "~/i18n/constants";

export default defineI18nConfig(() => ({
  legacy: false,
  locales: [Locale.En, Locale.Ru],
  defaultLocale: Locale.Ru,
  locale: Locale.Ru,
  messages: {
    [Locale.En]: en,
    [Locale.Ru]: ru,
  },
}));
