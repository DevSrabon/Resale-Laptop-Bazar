const PrimaryButton = ({children, type, disabled}) => {
    return (
        <button type={type} disabled={disabled} className="bg-[navy] text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer">
            {children}
            </button>
		);
};

export default PrimaryButton;