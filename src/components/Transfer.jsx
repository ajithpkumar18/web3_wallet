import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
	LAMPORTS_PER_SOL,
	PublicKey,
	SystemProgram,
	Transaction,
} from "@solana/web3.js";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const Transfer = () => {
	const { publicKey, sendTransaction } = useWallet();
	const { connection } = useConnection();
	const [amount, setAmount] = useState(null);
	const [to, setTo] = useState(null);
	const [error, setError] = useState(null);
	const [pending, setPending] = useState(null);
	const queryClient = useQueryClient();
	const sendSol = async (event) => {
		event.preventDefault();
		setError("");

		if (!publicKey) {
			setError("Connect a wallet first.");
			return;
		}

		const sol = Number(amount);
		if (!sol || sol <= 0) {
			setError("Enter an amount greater than 0");
			return;
		}

		let toPubkey;

		try {
			toPubkey = new PublicKey(to.trim());
		} catch (err) {
			setError(err.message || "Enter a valid solana address");
			return;
		}

		setPending(true);

		try {
			const transaction = new Transaction();

			transaction.add(
				SystemProgram.transfer({
					fromPubkey: publicKey,
					toPubkey: toPubkey,
					lamports: sol * LAMPORTS_PER_SOL,
				}),
			);

			await sendTransaction(transaction, connection);

			queryClient.refetchQueries({
				queryKey: ["balance", publicKey.toBase58()],
			});

			setAmount("");

			setTo("");
		} catch (err) {
			setError(`${err.message}` || "Transfer failed");
		} finally {
			setPending(false);
		}
	};
	return (
		<div className='panel'>
			<div className='panel-title-row'>
				<span className='eyebrow'>Transfer</span>
			</div>

			<form onSubmit={sendSol}>
				<div className='field'>
					<label htmlFor='transfer-amount' className='field-label'>
						Amount (SOL)
					</label>
					<input
						className='field-input'
						type='number'
						id='transfer-amount'
						min={0}
						step={0.1}
						value={amount ?? ""}
						onChange={(e) => setAmount(Number(e.target.value))}
						placeholder='0'
					/>
				</div>
				<div className='field'>
					<label htmlFor='transfer-to' className='field-label'>
						To address
					</label>
					<input
						className='field-input'
						id='transfer-to'
						type='text'
						value={to ?? ""}
						onChange={(e) => setTo(e.target.value)}
						placeholder='Recipient public key'
					/>
				</div>
				<button
					className='btn btn-primary'
					type='submit'
					disabled={pending || !publicKey}
				>
					{pending ? "Sending..." : "Send SOL"}
				</button>
				{error && <p>{error}</p>}
				{/* {signature && <p>{signature}</p>} */}
			</form>
		</div>
	);
};

export default Transfer;
