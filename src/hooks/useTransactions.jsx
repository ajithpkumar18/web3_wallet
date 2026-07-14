import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";

export default function useTransactionHistory() {
	const { connection } = useConnection();
	const { publicKey } = useWallet();

	return useQuery({
		queryKey: ["transactions", publicKey?.toBase58()],
		queryFn: async () => {
			return await connection.getSignaturesForAddress(publicKey, {
				limit: 5,
			});
		},
		enabled: !!publicKey,
	});
}
