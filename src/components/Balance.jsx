import useFetchBalance from "../hooks/fetchBalanceHook";

const Balance = () => {
	const { balance } = useFetchBalance();

	return <div>Balance: {balance}</div>;
};

export default Balance;
