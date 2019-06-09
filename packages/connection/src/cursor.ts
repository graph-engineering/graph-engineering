/*
 * The purpose of Base64 encoding is to make the cursor opaque,
 * hiding details of the API implementation from clients.
 */
export function encodeCursor(str: string): string {
  return Buffer.from(str).toString("base64");
}

export function decodeCursor(str: string): string {
  return Buffer.from(str, "base64").toString("ascii");
}

// TODO: Consider encrypting in case the data is sensitive.
