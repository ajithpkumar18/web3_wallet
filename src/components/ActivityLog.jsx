import { useWallet } from "@solana/wallet-adapter-react";
import useTransactionHistory from "../hooks/useTransactions";

export default function ActivityLog() {
	const { publicKey } = useWallet();
	const {
		data: transactions = [],
		refetch,
		error,
		isLoading,
	} = useTransactionHistory();

	console.log(transactions);
	const getTime = (tx) => {
		const time = tx.blockTime
			? new Date(Number(tx.blockTime) * 1000).toLocaleString()
			: "unknown";

		return time;
	};

	if (!publicKey) {
		return <div>Connect a wallet first</div>;
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error.message}</div>;
	}
	return (
		<div className='rounded-lg border border-panel-border	bg-[#0d1016] my-5'>
			<div className='d-flex gap-2 px-16 py-12 border-b border-b-panel-border font-mono text-xs text-low tracking-[0.4px]'>
				<span className='flex gap-1.5 mr-1'>
					<span className='dots-span' />
					<span className='dots-span' />
					<span className='dots-span' />
				</span>
				activity log
			</div>
			<div className='h-max-[190px] overflow-y-auto px-6 py-5'>
				{transactions === null ? (
					<div className='p-16 text-low font-mono text-sm'>
						nothing yet — connect a wallet to get started
					</div>
				) : (
					transactions.map((transaction) => (
						<div
							className='flex-col overflow-hidden lg:flex gap-3 px-16 py-2 font-mono text-sm items-baseline justify-center border border-panel-border-hover rounded-full my-2'
							key={transaction.signature}
						>
							<span className='text-low flex-wrap'>
								{getTime(transaction)}
							</span>
							<span className='bg-linear-to-r from-signal-green to-signal-violet bg-clip-text text-transparent'>
								{transaction.signature}
							</span>
						</div>
					))
				)}
			</div>
		</div>
	);
}
