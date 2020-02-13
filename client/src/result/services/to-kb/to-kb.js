export default function toKB(number) {
  return Math.round((number / 1024) * 10) / 10;
}
