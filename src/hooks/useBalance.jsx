import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";

const useFetchBalance = () => {
	const { connection } = useConnection();
	const { publicKey } = useWallet();

	return useQuery({
		queryKey: ["balance", publicKey?.toBase58()],
		queryFn: async () => {
			const balance = await connection.getBalance(publicKey);
			return balance / LAMPORTS_PER_SOL;
		},
		enabled: !!publicKey,
	});

	// const [balance, setBalance] = useState(null);
	// const [refreshing, setRefreshing] = useState(false);
	// const getBal = useCallback(async () => {
	// 	if (!publicKey) {
	// 		setBalance(null);
	// 		return;
	// 	}

	// 	setRefreshing(true);
	// 	try {
	// 		const res = await connection.getBalance(publicKey);

	// 		setBalance(res / LAMPORTS_PER_SOL);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}

	// 	setRefreshing(false);
	// }, [publicKey, connection]);

	// function refetch() {
	// 	getBal();
	// }
	// useEffect(() => {
	// 	getBal();
	// }, [getBal]);
	// return { refetch, balance, refreshing };
};

export default useFetchBalance;
