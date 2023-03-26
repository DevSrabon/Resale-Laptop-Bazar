import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
const Spinner = () => {
  return (
		<div className="h-[100vh] flex justify-center items-center">
			<Player
				autoplay
				loop
				src="https://lottie.host/0eb4a5e7-58e3-4f8f-8681-fddf34e97dd4/K38jjWtrwp.json"
			/>
		</div>
	);
}

export default Spinner
