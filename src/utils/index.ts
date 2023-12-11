export function shortenAddress(address: string, chars = 8): string {
  return `${address.slice(0, chars)}...${address.slice(
    address.length - chars
  )}`;
}
