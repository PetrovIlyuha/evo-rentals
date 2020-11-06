export function firstUpperLetter(target) {
  if (target) {
    const formatting = target.split('');
    return formatting[0].toUpperCase().concat(formatting.slice(1).join(''));
  }
}
