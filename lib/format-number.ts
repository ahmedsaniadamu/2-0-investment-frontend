export function formatNumberWithCommas(value: number | string): string {
  const number = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(number)) return "";

  return number.toLocaleString("en-US");
}
