import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import useFetchBalance from "../hooks/fetchBalanceHook";

export default function AirDrop() {
	const [amount, setAmount] = useState(0);
	const { connection } = useConnection();
	const { publicKey } = useWallet();
	const [error, setError] = useState("");
	const [pending, setPending] = useState(false);
	const { refetch } = useFetchBalance();

	const requestAirdrop = async () => {
		setError("");
		if (!publicKey) {
			setError("Connect your wallet");
			return;
		}

		const sol = Number(amount);

		if (!Number.isFinite(sol) || sol <= 0) {
			setError("Error an amount greater than 0.");
			return;
		}

		try {
			setPending(true);
			const signature = await connection.requestAirdrop(
				publicKey,
				amount * LAMPORTS_PER_SOL,
			);
			refetch();
			if (signature) alert("Airdrop completed");
		} catch (err) {
			const message = err?.message || "Airdrop failed";
		} finally {
			setPending(false);
		}
	};

	return (
		<div className='panel'>
			<div className='panel-title-row'>
				<span className='eyebrow'>Airdrop</span>
			</div>
			<div className='field'>
				<label htmlFor='airdrop-amount' className='field-label'>
					Amount (SOL)
				</label>
				<input
					className='field-input'
					id='airdrop-amount'
					type='number'
					min='0'
					step='0.1'
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
				/>
			</div>
			<button
				className='btn btn-primary'
				onClick={requestAirdrop}
				disabled={pending || !publicKey}
			>
				{pending ? "Requesting..." : "Request devnet SOL"}
			</button>
			{error && <p className='field-error'>{error}</p>}
		</div>
	);
}
