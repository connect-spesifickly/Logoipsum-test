export default function dateFormat(isoString: string) {
  const date = new Date(isoString);
  return date
    .toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .replace(/(\d+) (\w+) (\d+)/, "$2 $1, $3");
}
