import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { buildWhatsAppPurchaseUrl, formatAssetPrice, isFreeAsset } from './asset-actions.ts';

describe('asset actions', () => {
  it('treats zero and negative prices as free assets', () => {
    assert.equal(isFreeAsset(0), true);
    assert.equal(isFreeAsset(-1), true);
    assert.equal(isFreeAsset(15), false);
  });

  it('formats prices consistently for free and paid assets', () => {
    assert.equal(formatAssetPrice(0), 'Free');
    assert.equal(formatAssetPrice(29), '$29.00');
    assert.equal(formatAssetPrice('49.99'), '$49.99');
  });

  it('builds a prefilled WhatsApp purchase link', () => {
    assert.equal(
      buildWhatsAppPurchaseUrl('Modern SaaS UI Kit'),
      'https://wa.me/8801313895658?text=Hello%2C%20I%20want%20to%20purchase%20this%20asset%3A%20Modern%20SaaS%20UI%20Kit',
    );
  });
});
