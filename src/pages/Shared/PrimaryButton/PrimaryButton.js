const PrimaryButton = ({children, type, disabled, classes}) => {
    return (
			<button
				type={type}
				disabled={disabled}
				className={`bg-gradient-to-r from-[#102001] via-[#0d2202] to-[#3cc20a] text-white  uppercase text-sm px-6 py-3 rounded shadow mr-1 mb-1 cursor-pointer ${classes}`}>
				{children}
			</button>
		);
};

export default PrimaryButton;