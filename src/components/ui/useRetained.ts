import { useState } from 'react';

/**
 * Returns the latest defined value. Lets an overlay keep rendering its last content
 * while it animates closed, after the source state has been cleared.
 */
export function useRetained<T>(value: T | undefined): T | undefined {
  const [kept, setKept] = useState<T | undefined>(value);
  if (value !== undefined && value !== kept) setKept(value);
  return value ?? kept;
}
