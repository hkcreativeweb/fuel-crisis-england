/**
 * A short, readable publisher label for display ("GOV.UK / DESNZ", "ONS", "Bank of England").
 * The full source name stays available to links as a title/aria-label, so nothing is lost.
 */
export function shortSource(full: string): string {
  const head = full.split(/[:,(—–]/)[0].trim();
  const aliases: [RegExp, string][] = [
    [/^office for national statistics/i, "ONS"],
    [/^u\.?s\.? energy information administration/i, "US EIA"],
    [/^hm revenue/i, "HMRC"],
    [/^the excise duties/i, "legislation.gov.uk"],
  ];
  for (const [re, label] of aliases) if (re.test(head)) return label;
  return head.length > 0 && head.length <= 40 ? head : full.slice(0, 40);
}
