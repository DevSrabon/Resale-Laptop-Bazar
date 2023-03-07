import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
const Spinner = () => {
  return (
		<div className="h-[100vh] flex justify-center items-center">
			<Player
				autoplay
				loop
				src="https://assets4.lottiefiles.com/packages/lf20_ggsgjvte.json"
			/>
		</div>
	);
}

export default Spinner
