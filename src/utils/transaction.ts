export function generateTransactionRef(): string {
  return `DCT-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}