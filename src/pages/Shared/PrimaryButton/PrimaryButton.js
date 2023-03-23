const PrimaryButton = ({children, type, disabled, classes}) => {
    return (
			<button
				type={type}
				disabled={disabled}
				className={`bg-gradient-to-r from-[#071904] to-[#276404] text-white  uppercase text-sm px-6 py-3 rounded shadow mr-1 mb-1 cursor-pointer ${classes}`}>
				{children}
			</button>
		);
};

export default PrimaryButton;