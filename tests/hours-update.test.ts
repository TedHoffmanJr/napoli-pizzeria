import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';

const readSource = (...segments: string[]) =>
  readFileSync(join(process.cwd(), ...segments), 'utf8');

describe('business hours', () => {
  it('shows the current hours everywhere customers can find them', () => {
    const home = readSource('src', 'app', 'page.tsx');
    const footer = readSource('src', 'app', 'components', 'Footer.tsx');
    const orderModal = readSource('src', 'app', 'components', 'OrderModal.tsx');

    assert.match(home, /Mon-Sat: 11am-8pm/);
    assert.doesNotMatch(home, /3pm-8pm/);
    assert.match(footer, /Monday - Saturday/);
    assert.doesNotMatch(footer, /3pm - 8pm/);
    assert.match(orderModal, /Mon-Sat:/);
    assert.doesNotMatch(orderModal, /3pm - 8pm/);
  });

  it('announces lunch hours for one week', () => {
    const banner = readSource('src', 'app', 'components', 'HoursBanner.tsx');

    assert.match(banner, /2026-07-27T00:00:00-04:00/);
    assert.match(banner, /Lunch is back all week!/);
    assert.match(banner, /Monday-Saturday from 11am-8pm/);
  });

  it('does not restore unverified lunch-special claims', () => {
    const specials = readSource('src', 'app', 'specials', 'page.tsx');
    const layout = readSource('src', 'app', 'layout.tsx');

    assert.doesNotMatch(specials, /lunch special/i);
    assert.doesNotMatch(layout, /lunch specials/i);
  });
  it('keeps the removed items unavailable in the repository menu snapshot', () => {
    const menu = readSource('src', 'app', 'lib', 'data', 'menu.csv');

    for (const itemId of ['item_003', 'item_009', 'item_020', 'item_023', 'item_051']) {
      assert.match(menu, new RegExp(`^${itemId},.*?,FALSE,FALSE,\\d+$`, 'm'));
    }
  });
});