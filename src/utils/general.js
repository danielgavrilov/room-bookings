export function toggle(current, options) {
  const index = options.indexOf(current);
  return options[(index + 1) % options.length];
}

export function clamp(min, max) {
  return function(x) {
    return x > max ? max :
           x < min ? min :
           x;
  }
}
