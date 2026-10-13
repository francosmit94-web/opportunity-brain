// Loads the <script id="logic"> block of a tool page and returns its AetherTool
// namespace, so the tests run the same source text the browser runs.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

export function loadLogic(testUrl) {
  const html = readFileSync(new URL('./index.html', testUrl), 'utf8');
  const match = /<script id="logic">([\s\S]*?)<\/script>/.exec(html);
  if (!match) throw new Error('no <script id="logic"> block found');
  const context = {};
  vm.runInNewContext(match[1], context);
  return context.AetherTool;
}

// Runs every script block of the page (logic, then the page code) against a
// stub document and a localStorage that returns `stored`. Returns the stub
// elements by id, so a test can inspect what the page wrote into innerHTML.
export function runPage(testUrl, stored) {
  const html = readFileSync(new URL('./index.html', testUrl), 'utf8');
  const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (scripts.length !== 2) throw new Error('expected 2 script blocks, found ' + scripts.length);
  const elements = {};
  const context = vm.createContext({
    document: {
      getElementById: (id) => (elements[id] ??= {
        value: '', innerHTML: '', textContent: '', addEventListener() {}, getAttribute: () => null, focus() {},
      }),
    },
    localStorage: { getItem: () => JSON.stringify(stored), setItem() {}, removeItem() {} },
  });
  for (const source of scripts) vm.runInContext(source, context);
  return elements;
}

export const HOSTILE = '"><img src=x onerror=alert(1)>';

// True when no element received live markup from the hostile string.
export function allEscaped(elements) {
  return Object.values(elements).every((e) => !/<img/i.test(e.innerHTML));
}
