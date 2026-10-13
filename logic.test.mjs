import test from 'node:test';
import assert from 'node:assert/strict';
import { loadLogic, runPage, HOSTILE, allEscaped } from './load-logic.mjs';

const T = loadLogic(import.meta.url);
const items = (ratings, weights) => ratings.map((rating, i) => ({ rating, weight: weights ? weights[i] : 50 }));

test('seven criteria and 23 flags', () => {
  assert.equal(T.CRITERIA.length, 7);
  assert.equal(T.FLAGS.length, 23);
});

test('all-minimum ratings score 1.0, Poor, uncapped', () => {
  const r = T.score(items([1, 1, 1, 1, 1, 1, 1]));
  assert.equal(r.score, 1);
  assert.equal(r.band, 'Poor');
  assert.equal(r.capped, false);
});

test('all-maximum ratings score 10.0, Strong', () => {
  const r = T.score(items([10, 10, 10, 10, 10, 10, 10], [100, 100, 100, 100, 100, 100, 100]));
  assert.equal(r.score, 10);
  assert.equal(r.band, 'Strong');
  assert.equal(r.capped, false);
});

test('mid case: weighted average checked by hand', () => {
  // (8*100 + 6*50 + 4*0 + 10*50 + 5*50 + 7*25 + 3*25) / 300 = 2100 / 300 = 7.0
  const r = T.score(items([8, 6, 4, 10, 5, 7, 3], [100, 50, 0, 50, 50, 25, 25]));
  assert.equal(r.score, 7);
  assert.equal(r.band, 'Promising');
  assert.equal(r.capped, false);
});

test('a weighted criterion below 3 caps the score at 5.0', () => {
  const r = T.score(items([8, 7, 6, 9, 5, 7, 2])); // 44 / 7 = 6.29 uncapped
  assert.equal(r.capped, true);
  assert.equal(r.score, 5);
  assert.equal(r.band, 'Weak');
  assert.ok(Math.abs(r.raw - 44 / 7) < 1e-9);
});

test('no cap flag when the uncapped score already displays as 5.0', () => {
  const r = T.score([{ rating: 2, weight: 24 }, { rating: 6, weight: 76 }]); // 504 / 100 = 5.04
  assert.equal(r.score, 5);
  assert.equal(r.capped, false);
});

test('a low rating with zero weight does not cap', () => {
  const r = T.score(items([8, 8, 8, 8, 8, 8, 1], [50, 50, 50, 50, 50, 50, 0]));
  assert.equal(r.capped, false);
  assert.equal(r.score, 8);
});

test('the cap never raises a low score', () => {
  const r = T.score(items([2, 2, 2, 2, 2, 2, 2]));
  assert.equal(r.capped, false);
  assert.equal(r.score, 2);
});

test('no score when every weight is zero or input is invalid', () => {
  assert.equal(T.score(items([5, 5, 5, 5, 5, 5, 5], [0, 0, 0, 0, 0, 0, 0])), null);
  assert.equal(T.score([]), null);
  assert.equal(T.score([{ rating: 11, weight: 50 }]), null);
  assert.equal(T.score([{ rating: 0, weight: 50 }]), null);
  assert.equal(T.score([{ rating: '5', weight: 50 }]), null);
  assert.equal(T.score([{ rating: 5, weight: 101 }]), null);
  assert.equal(T.score([{ rating: NaN, weight: 50 }]), null);
});

test('band boundaries', () => {
  assert.equal(T.band(8), 'Strong');
  assert.equal(T.band(7.9), 'Promising');
  assert.equal(T.band(6), 'Promising');
  assert.equal(T.band(5.9), 'Weak');
  assert.equal(T.band(4), 'Weak');
  assert.equal(T.band(3.9), 'Poor');
});

test('comparison holds at most five ideas', () => {
  let list = [];
  for (let i = 0; i < 5; i++) list = T.addIdea(list, { name: 'Idea ' + i });
  assert.equal(list.length, 5);
  assert.equal(T.addIdea(list, { name: 'sixth' }), null);
});

test('esc neutralises a script string', () => {
  assert.equal(T.esc('<script>alert("x")</script>'), '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
  assert.equal(T.esc("a & 'b'"), 'a &amp; &#39;b&#39;');
});

test('page code: hostile stored state never reaches innerHTML as markup', () => {
  const h = HOSTILE;
  const el = runPage(import.meta.url, {
    name: h,
    items: T.CRITERIA.map(() => ({ rating: h, weight: h })),
    flags: T.FLAGS.map(() => h),
    ideas: [{ name: h, score: h, capped: h, flags: h }, h, null, [h], 1, 2, 3, { name: h }, { name: h }, { name: h }, { name: h }, { name: h }],
  });
  assert.ok(allEscaped(el));
  assert.ok(el.compare.innerHTML.includes('&lt;img'), 'the stored idea name was rendered, escaped');
  assert.equal(el.compare.innerHTML.split('<tr><td').length - 1, 5, 'at most five stored ideas are shown');
  assert.ok(el.result.innerHTML.includes('5.0'), 'unusable stored ratings fall back to the default 5');
  assert.equal(el['idea-name'].value, h); // set as a value, not as markup
});
