export function pickDefined<T extends Record<string, unknown>>(
  body: Record<string, unknown>,
  keys: (keyof T)[]
): Partial<T> {
  const result: Partial<T> = {};
  for (const key of keys) {
    const value = body[key as string];
    if (value !== undefined) {
      (result as Record<string, unknown>)[key as string] = value;
    }
  }
  return result;
}
