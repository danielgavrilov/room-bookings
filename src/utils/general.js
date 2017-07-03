export function toggle(current, options) {
  const index = options.indexOf(current);
  return options[(index + 1) % options.length];
}
