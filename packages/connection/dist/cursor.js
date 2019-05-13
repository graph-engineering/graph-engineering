"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * The purpose of Base64 encoding is to make the cursor opaque,
 * hiding details of the API implementation from clients.
 */
function encodeCursor(str) {
    return Buffer.from(str).toString('base64');
}
exports.encodeCursor = encodeCursor;
function decodeCursor(str) {
    return Buffer.from(str, 'base64').toString('ascii');
}
exports.decodeCursor = decodeCursor;
// TODO: Consider encrypting in case the data is sensitive.
//# sourceMappingURL=cursor.js.map