import toKB from './to-kb';

describe('toKB', () => {
  test('should convert bytes to kB', () => {
    expect(toKB(1024 * 34)).toEqual(34);
  });

  test('should work for negatives', () => {
    expect(toKB(-1024 * 34)).toEqual(-34);
  });

  test('should work for zero', () => {
    expect(toKB(0)).toEqual(0);
  });
});
