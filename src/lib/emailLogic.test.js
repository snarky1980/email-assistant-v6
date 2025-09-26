import { describe, it, expect } from 'vitest';
import { replaceVariables, updateRecents, toggleFavorite, encodeRFC2047, buildEML } from './emailLogic.js';

describe('replaceVariables', () => {
  it('replaces placeholders with provided values', () => {
    const txt = 'Hello <<name>>, your id is <<id>>.';
    const out = replaceVariables(txt, { name: 'Alice', id: '42' });
    expect(out).toBe('Hello Alice, your id is 42.');
  });
  it('keeps unknown variables intact', () => {
    const txt = 'Hi <<user>>';
    const out = replaceVariables(txt, { });
    expect(out).toBe('Hi <<user>>');
  });
});

describe('updateRecents', () => {
  it('adds new id to front and caps length', () => {
    const prev = ['b','a'];
    const next = updateRecents(prev, 'c', 3);
    expect(next).toEqual(['c','b','a']);
  });
  it('moves existing id to front without duplication', () => {
    const prev = ['c','b','a'];
    const next = updateRecents(prev, 'b', 5);
    expect(next).toEqual(['b','c','a']);
  });
  it('caps at provided size', () => {
    const prev = ['5','4','3','2','1'];
    const next = updateRecents(prev, '6', 5);
    expect(next.length).toBe(5);
    expect(next[0]).toBe('6');
  });
});

describe('toggleFavorite', () => {
  it('adds when missing', () => {
    expect(toggleFavorite([], 'x')).toEqual(['x']);
  });
  it('removes when present', () => {
    const after = toggleFavorite(['x','y'], 'x');
    expect(after).toEqual(['y']);
  });
});

describe('encodeRFC2047', () => {
  it('passes through ascii subject', () => {
    expect(encodeRFC2047('Hello World')).toBe('Hello World');
  });
  it('encodes non-ascii subject', () => {
    const out = encodeRFC2047('Bonjour éè');
    expect(out.startsWith('=?UTF-8?B?')).toBe(true);
  });
});

describe('buildEML', () => {
  it('produces minimal EML with encoded subject', () => {
    const eml = buildEML({ subject: 'Test é', body: 'Body line' });
    expect(eml).toContain('Subject: =?UTF-8?B?');
    expect(eml.endsWith('Body line')).toBe(true);
  });
});
