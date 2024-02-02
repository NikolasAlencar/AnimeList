import { Col, Cols } from '../model/Cols';

const cols: Cols = [
  { code: 1, value: 598 },
  { code: 2, value: 894 },
  { code: 3, value: 1222 },
  { code: 4, value: 2561 },
];

export function ajustaGrid(windowInnerWidth: number) {
  const result = cols.filter((col: Col) => col.value > windowInnerWidth);
  return result[0].code;
}
