import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import React, { useState } from "react";

export function SignMessage() {
	const { publicKey, signMessage } = useWallet();
	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);
	const [signature, setSignature] = useState(null);
	const [pending, setPending] = useState(false);

	const onClick = async () => {
		if (!publicKey) {
			setError("Wallet not connected!");
			return;
		}
		if (!signMessage) {
			setError("Wallet does not support message signing!");
			return;
		}
		if (!message || !message.trim()) {
			setError("Enter a valid message");
			return;
		}

		setPending(true);
		try {
			const encodedMessage = new TextEncoder().encode(message);
			const signature = await signMessage(encodedMessage);

			if (
				!ed25519.verify(signature, encodedMessage, publicKey.toBytes())
			) {
				setError("Message signature invalid!");
				return;
			}
			setSignature(bs58.encode(signature));
		} catch (err) {
			const errMsg = err.message || "Signing Failed";
			setError(errMsg);
		} finally {
			setPending(false);
		}
	};

	return (
		<div>
			<div>
				<span>Sign Message</span>
			</div>
			<div>
				<label htmlFor='sign-message'>Message</label>
				<input
					id='message'
					value={message ?? ""}
					onChange={(e) => setMessage(e.target.value)}
					type='text'
					placeholder='Hello there'
				/>
			</div>
			<button onClick={onClick} disabled={pending || !publicKey}>
				{pending ? "Signing..." : "Sign Message"}
			</button>
			{error && <p className=''>{error}</p>}
			{signature && <p>Signature verified locally: {signature}</p>}
		</div>
	);
}
