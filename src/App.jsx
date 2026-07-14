import "./App.css";
import { useMemo } from "react";
import {
	ConnectionProvider,
	WalletProvider,
} from "@solana/wallet-adapter-react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { SignMessage } from "./components/SignMessage";
import AirDrop from "./components/AirDrop";
import Balance from "./components/Balance";
import Header from "./components/Header";
import Transfer from "./components/Transfer";
import ActivityLog from "./components/ActivityLog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
	const wallets = useMemo(() => [], []);
	return (
		<QueryClientProvider client={queryClient}>
			<ConnectionProvider
				endpoint={import.meta.env.VITE_SOLANA_RPC_ENDPOINT}
			>
				<WalletProvider wallets={wallets} autoConnect>
					<WalletModalProvider>
						<div className='h-screen my-5 mx-auto w-7/12'>
							<Header />
							<Balance />
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
								<AirDrop />
								<Transfer />
							</div>
							<SignMessage />
							<ActivityLog />
						</div>
					</WalletModalProvider>
				</WalletProvider>
			</ConnectionProvider>
		</QueryClientProvider>
	);
}

export default App;
