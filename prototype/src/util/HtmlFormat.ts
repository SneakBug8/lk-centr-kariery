const replaces = [
  ["&#8211;", "–"],
  ["&#8212;", "—"],
  ["&#8216;", "'"],
  ["&#8217;", "'"],
  ["&quot;", '"'],
];

export function HtmlFormat(text: string)
{
  let cleantext = text.replace(/<\/?[^>]+(>|$)/g, "");

  for (const r of replaces) {
    cleantext = cleantext.replace(r[0], r[1]);
  }

  return cleantext;
}
