import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Header = ({ network = "devnet" }) => {
	return (
		<header className='d-flex justify-between gap-3 pb-1'>
			<div className='d-flex gap-2.5 '>
				<div
					className='w-8 h-8 rounded-sm bg-linear-120 from-signal-violet to-signal-red'
					aria-hidden='true'
				/>

				<div className=' flex flex-col leading-[1.1]'>
					<span className='font-display font-semibold text-[17px] tracking-[0.2px]'>
						Sol Dashboard
					</span>
					<span className='font-mono text-[11px] text-low tracking[0.3px]'>
						Wallet adapter devnet
					</span>
				</div>
			</div>
			<div className='d-flex gap-2.5'>
				<span className='network'>
					<span className='network-dot'></span>
					{network}
				</span>
				<WalletMultiButton />
			</div>
		</header>
	);
};

export default Header;
