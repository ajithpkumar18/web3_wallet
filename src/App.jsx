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
import AirDrop from "./components/AirDrop";
import Balance from "./components/Balance";
import Header from "./components/Header";

function App() {
	const endpoint = clusterApiUrl("devnet");
	const wallets = useMemo(() => [], []);
	return (
		<ConnectionProvider endpoint={import.meta.env.VITE_SOLANA_RPC_ENDPOINT}>
			<WalletProvider wallets={wallets} autoConnect>
				<WalletModalProvider>
					<div>
						<Header />
						<Balance />
						<AirDrop />
					</div>
				</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
}

export default App;
