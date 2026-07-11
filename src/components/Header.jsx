import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React from "react";

const Header = ({ network = "devnet" }) => {
	return (
		<header>
			<div>
				<div></div>
				<div>
					<span>Sol Dashboard</span>
					<span>Wallet adapter devnet</span>
				</div>
			</div>
			<div>
				<span>
					<span></span>
					{network}
				</span>
				<WalletMultiButton />
			</div>
		</header>
	);
};

export default Header;
