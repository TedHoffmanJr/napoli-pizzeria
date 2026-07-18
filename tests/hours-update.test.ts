import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';

const readSource = (...segments: string[]) =>
  readFileSync(join(process.cwd(), ...segments), 'utf8');

describe('new business hours', () => {
  it('shows the new hours everywhere customers can find them', () => {
    const home = readSource('src', 'app', 'page.tsx');
    const footer = readSource('src', 'app', 'components', 'Footer.tsx');
    const orderModal = readSource('src', 'app', 'components', 'OrderModal.tsx');

    assert.match(home, /Mon-Thu: 3pm-8pm/);
    assert.match(home, /Fri-Sat: 11am-8pm/);
    assert.match(footer, /Monday - Thursday/);
    assert.match(footer, /Friday - Saturday/);
    assert.match(orderModal, /Mon-Thu:/);
    assert.match(orderModal, /Fri-Sat:/);
  });

  it('announces the new hours until August 20, 2026', () => {
    const banner = readSource('src', 'app', 'components', 'HoursBanner.tsx');

    assert.match(banner, /2026-08-20T00:00:00-04:00/);
    assert.match(banner, /New hours starting Monday, July 20/);
  });

  it('does not advertise lunch specials during the new weekday hours', () => {
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