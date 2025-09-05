export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
};

export function isAllFieldsFilled(obj: Record<string, any>): boolean {
  return Object.values(obj).every(
    value =>
      value !== undefined && value !== null && String(value).trim() !== "",
  );
}

export function isSomeFieldsFilled(obj: Record<string, any>): boolean {
  return Object.values(obj).some(
    value =>
      value !== undefined && value !== null && String(value).trim() !== "",
  );
}

export function isSomeChanged(
  a: Record<string, any>,
  b: Record<string, any>,
): boolean {
  return Object.keys(a).some(key => a[key] !== b[key]);
}

export function getFirstEmptyFieldKey(
  obj: Record<string, any>,
  keyToLabel?: Record<string, string>,
): string | null {
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (value === undefined || value === null || String(value).trim() === "") {
      return keyToLabel?.[key] || key;
    }
  }
  return null;
}

export function isValidGender(value: string): boolean {
  return value === "MALE" || value === "FEMALE";
}
