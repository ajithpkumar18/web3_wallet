import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import {
	LAMPORTS_PER_SOL,
	PublicKey,
	SystemProgram,
	Transaction,
} from "@solana/web3.js";

const Airdrop = () => {
	const { publicKey, sendTransaction } = useWallet();
	const { connection } = useConnection();
	const [balance, setBalance] = useState(0);
	const [value, setValue] = useState(0);
	const [amount, setAmount] = useState(0);
	const [to, setTo] = useState("");

	useEffect(() => {
		const accountBalance = async () => {
			if (!publicKey || !connection) {
				console.log("wallet not connected");
				return;
			}

			try {
				const accountInfo = await connection.getAccountInfo(publicKey);

				if (accountInfo) {
					setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
				}
			} catch (error) {
				console.error("Failed to retrieve account info:", error);
			}
		};
		accountBalance();
	}, [publicKey, connection]);

	const AirdropSol = async () => {
		const response = await connection.requestAirdrop(
			publicKey,
			value * 1000000000,
		);
		alert("Airdop complete");
		console.log(response.toString());
	};

	const sendSol = async (event) => {
		event.preventDefault();

		if (!publicKey) {
			console.error("Wallet not connected");
			return;
		}

		try {
			const transaction = new Transaction();
			const sendSolTransaction = SystemProgram.transfer({
				fromPubkey: publicKey,
				toPubkey: new PublicKey(to),
				lamports: amount * LAMPORTS_PER_SOL,
			});

			transaction.add(sendSolTransaction);

			const signature = await sendTransaction(transaction, connection);
			console.log(signature);
		} catch (error) {
			console.error("Transaction failed", error);
		}
	};
	return (
		<>
			<p>
				<div>
					Hello Account:
					<span style={{ color: "red" }}>
						{publicKey?.toString()}
					</span>
				</div>
				Balance: <span style={{ color: "red" }}>{balance}</span>
			</p>

			<div
				style={{
					width: "10rem",
					alignItems: "center",
					margin: "5rem auto",
				}}
			>
				Airdrop Sol to self
				<input
					style={{ width: "10rem" }}
					type='number'
					placeholder='1 sol'
					onChange={(e) => setValue(Number(e.target.value))}
				/>
				<button type='submit' onClick={() => AirdropSol()}>
					Airdop Sol
				</button>
			</div>

			<div
				style={{
					width: "10rem",
					alignItems: "center",
					margin: "5rem auto",
				}}
			>
				Transfer Funds
				<input
					style={{ width: "10rem" }}
					type='number'
					placeholder='1 sol'
					onChange={(e) => setAmount(Number(e.target.value))}
				/>
				<input
					style={{ width: "10rem" }}
					type='text'
					placeholder='to address'
					onChange={(e) => setTo(String(e.target.value))}
				/>
				<button type='submit' onClick={sendSol}>
					Transfer Sol
				</button>
			</div>
		</>
	);
};

export default Airdrop;
