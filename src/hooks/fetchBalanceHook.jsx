import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const useFetchBalance = () => {
	const { connection } = useConnection();
	const { publicKey } = useWallet();

	const [balance, setBalance] = useState(null);

	const getBal = useCallback(async () => {
		if (!publicKey) {
			setBalance(null);
			return;
		}
		try {
			const res = await connection.getBalance(publicKey);

			setBalance(res / LAMPORTS_PER_SOL);
		} catch (err) {
			console.log(err);
		}
	}, [publicKey, connection]);

	function refetch() {
		getBal();
	}
	useEffect(() => {
		getBal();
	}, [getBal]);
	return { refetch, balance };
};

export default useFetchBalance;
