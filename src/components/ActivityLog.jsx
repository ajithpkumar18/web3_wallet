import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";

export default function ActivityLog() {
	const { connection } = useConnection();
	const { publicKey } = useWallet();
	const [transactions, setTransactions] = useState(null);
	const [error, setError] = useState(null);
	const getTransaction = useCallback(async () => {
		try {
			const res = await connection.getSignaturesForAddress(publicKey, {
				limit: 10,
			});
			setTransactions(res);
		} catch (error) {
			setError(error);
		}
	}, [publicKey, connection]);
	useEffect(() => {
		if (!publicKey) {
			setError("Connect a wallet first");
			return;
		}
		getTransaction();
	}, [getTransaction]);

	const getTime = (tx) => {
		const time = tx.blockTime
			? new Date(Number(tx.blockTime) * 1000).toLocaleString()
			: "unknown";

		return time;
	};
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
							className='flex gap-3 px-16 py-2 font-mono text-sm items-baseline justify-center border border-panel-border-hover rounded-full my-2'
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
