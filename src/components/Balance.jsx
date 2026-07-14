import { useWallet } from "@solana/wallet-adapter-react";
import useFetchBalance from "../hooks/useBalance";
import { shortenAddress } from "../lib/format";
import { useState } from "react";

const Balance = () => {
	const { publicKey } = useWallet();
	const {
		data: balance,
		refetch,
		isFetching: refreshing,
	} = useFetchBalance();
	const [copied, setCopied] = useState(false);

	const copyAddress = () => {
		if (!publicKey) return;
		navigator.clipboard.writeText(publicKey.toString());
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};
	return (
		<div className=' mt-10 balance-card relative overflow-hidden p-6 rounded-lg bg-bg-raised border solid border-panel-border '>
			<div className='d-flex justify-between'>
				<span className='eyebrow'>Balance</span>
				{publicKey && (
					<button
						className={`refresh-btn hover:border-panel-border-hover text-hi ${refreshing ? "spinning" : ""}`}
						onClick={refetch}
						aria-label='Refresh balance'
						title='Refresh balance'
					>
						<svg
							width='14'
							height='14'
							viewBox='0 0 24 24'
							fill='none'
						>
							<path
								d='M20 12a8 8 0 1 1-2.34-5.66M20 4v5h-5'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
				)}
			</div>
			{publicKey ? (
				<div className='font-mono font-medium text-[44px] tracking-tight mt-10px ml-4px  flex items-baseline gap-2'>
					{balance === null ? "-" : balance}
					<span className='text-sm text-low font-normal'>SOL</span>
				</div>
			) : (
				<p className='text-low font-mono text-sm mx-10'>
					Connect a wallet to see your devnet balance
				</p>
			)}

			{publicKey && (
				<button
					className='address-chip text-mid bg-panel font-mono border border-panel-border hover:border-panel-border-hover hover:text-hi'
					onClick={copyAddress}
					title='Copy address'
				>
					{copied
						? "copied ✓"
						: shortenAddress(publicKey.toString(), 6)}
				</button>
			)}
		</div>
	);
};

export default Balance;
