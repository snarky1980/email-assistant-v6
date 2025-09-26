// Pure utility functions extracted for unit testing and reuse.

// Replace <<varName>> occurrences with provided variable values.
export function replaceVariables(text, variables) {
  let result = text;
  if (!text || !variables) return result || '';
  for (const [varName, value] of Object.entries(variables)) {
    const regex = new RegExp(`<<${varName}>>`, 'g');
    result = result.replace(regex, value || `<<${varName}>>`);
  }
  return result;
}

// Update MRU recents list with cap (default 10)
export function updateRecents(previousIds, newId, cap = 10) {
  if (!newId) return Array.isArray(previousIds) ? previousIds.slice(0, cap) : [];
  const prev = Array.isArray(previousIds) ? previousIds : [];
  const arr = [newId, ...prev.filter((id) => id !== newId)];
  return arr.slice(0, cap);
}

// Toggle favorite presence (set semantics) returning array
export function toggleFavorite(list, id) {
  const set = new Set(Array.isArray(list) ? list : []);
  if (set.has(id)) set.delete(id); else set.add(id);
  return Array.from(set);
}

// Simple RFC2047 encoder for UTF-8 subjects (mirrors logic used in export .eml)
export function encodeRFC2047(str) {
  if (!str) return '';
  // Encode non-ASCII using base64 (Q encoding not required for current usage)
  // If pure ASCII, return as-is.
  if (/^[\x00-\x7F]*$/.test(str)) return str;
  const b64 = Buffer.from(str, 'utf8').toString('base64');
  return `=?UTF-8?B?${b64}?=`;
}

// Build EML content (minimal headers) for a subject/body pair
export function buildEML({ subject, body }) {
  const encodedSubject = encodeRFC2047(subject || '');
  const headers = [
    'From: ',
    'To: ',
    `Subject: ${encodedSubject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: 8bit',
    '',
  ];
  return headers.join('\n') + (body || '');
}

export default {
  replaceVariables,
  updateRecents,
  toggleFavorite,
  encodeRFC2047,
  buildEML,
};
