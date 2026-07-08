import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import {
	LAMPORTS_PER_SOL,
	PublicKey,
	SystemProgram,
	Transaction,
} from "@solana/web3.js";

export default function AirDrop() {
	const [amount, setAmount] = useState(0);

	const requestAirdrop = () => {};

	return (
		<div>
			<div>
				<span>Airdrop</span>
			</div>

			<div>
				<label htmlFor=''></label>
				<input
					type='number'
					min='0'
					step='0.1'
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
				/>
			</div>
			<button
				onClick={requestAirdrop}
				disabled={pending || !publicKey}
			></button>
		</div>
	);
}
