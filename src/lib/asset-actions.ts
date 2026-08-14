export function isFreeAsset(price: number | string): boolean {
  const numericPrice = Number(price);
  return Number.isFinite(numericPrice) && numericPrice <= 0;
}

export function formatAssetPrice(price: number | string): string {
  if (isFreeAsset(price)) {
    return 'Free';
  }

  return `$${Number(price).toFixed(2)}`;
}

export function buildWhatsAppPurchaseUrl(assetName: string, phoneNumber = '8801313895658'): string {
  const message = `Hello, I want to purchase this asset: ${assetName}`;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
