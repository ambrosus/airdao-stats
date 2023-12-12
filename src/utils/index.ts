export function shortenAddress(address: string, chars = 8): string {
  return `${address.replace('apollo', '').slice(0, chars)}...${address.slice(
    address.length - chars
  )}`;
}
