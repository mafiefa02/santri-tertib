export function formatToTitle(string?: string) {
  if (!string) return;
  const lowercase = string.toLowerCase();
  return lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
}
