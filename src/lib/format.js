export function shortenAddress(address, chars = 4) {
	if (!address) return "";
	const str = typeof address === "string" ? address : address.toString();
	return `${str.slice(0, chars)}…${str.slice(-chars)}`;
}
