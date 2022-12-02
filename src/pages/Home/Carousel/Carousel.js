import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Carousel = () => {
    return (
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				spaceBetween={50}
				slidesPerView={2}
				navigation
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}
				onSwiper={(swiper) => console.log(swiper)}
				onSlideChange={() => console.log("slide change")}>
				<SwiperSlide>
					<img
						className="lg:h-[50vh] sm:h-[30vh] rounded-lg"
						src="https://computerzone.com.bd/wp-content/uploads/2022/11/slider-11-27-2022-b.jpg"
						alt=""
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						className="lg:h-[50vh] sm:h-[30vh] rounded-lg"
						src="https://computerzone.com.bd/wp-content/uploads/2022/11/slider-11-27-2022-a-1.jpg"
						alt=""
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						className="lg:h-[50vh] sm:h-[30vh] rounded-lg"
						src="https://computerzone.com.bd/wp-content/uploads/2022/11/slider-11-27-2022-e.jpg"
						alt=""
					/>
				</SwiperSlide>
				...
			</Swiper>
		);
};

export default Carousel;