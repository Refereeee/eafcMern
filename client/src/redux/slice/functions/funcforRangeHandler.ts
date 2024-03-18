export function sliceStringRange(e:string) {
  if (e !== '10' && e.length > 1) return e.slice(1);
  return e;
}
export function sliceStringRangeFinals(e:string) {
  if (e !== '21' && e.length > 1) return e;
  return e;
}
