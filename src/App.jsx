import { FC, ReactNode, useMemo } from "react";
import {
	ConnectionProvider,
	WalletProvider,
} from "@solana/wallet-adapter-react";

import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./App.css";
import {
	WalletDisconnectButton,
	WalletModalProvider,
	WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import Airdrop from "./components/Airddrop";
import { SignMessage } from "./components/SignMessage";

function App() {
	const endpoint = clusterApiUrl("devnet");
	const wallets = useMemo(() => [], []);
	return (
		<ConnectionProvider endpoint={import.meta.env.VITE_SOLANA_RPC_ENDPOINT}>
			<WalletProvider wallets={wallets} autoConnect>
				<WalletModalProvider>
					<WalletMultiButton />
					<WalletDisconnectButton />
					<Airdrop />
					<SignMessage />
				</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
}

export default App;
