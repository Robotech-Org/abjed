type TranslateFn = (key: string) => string;

export function getErrorMessage(code: string, t: TranslateFn): string {
  if (!code) return t("unknown");
  const translated = t(code);
  return translated === code ? t("unknown") : translated;
}
