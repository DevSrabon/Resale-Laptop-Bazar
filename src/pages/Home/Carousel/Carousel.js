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
				// install Swiper modules
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
						className="lg:h-[50vh]"
						src="https://computerzone.com.bd/wp-content/uploads/2022/11/slider-11-27-2022-b.jpg"
						alt=""
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						className="lg:h-[50vh]"
						src="https://computerzone.com.bd/wp-content/uploads/2022/11/slider-11-27-2022-a-1.jpg"
						alt=""
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						className="lg:h-[50vh]"
						src="https://computerzone.com.bd/wp-content/uploads/2022/11/slider-11-27-2022-e.jpg"
						alt=""
					/>
				</SwiperSlide>
				...
			</Swiper>
			// <div className="carousel w-full">
			// 	<div id="slide1" className="carousel-item relative w-full">
			// 		<img
			// 			src="https://computerzone.com.bd/wp-content/uploads/2022/11/slider-11-27-2022-b.jpg"
			// 			className="w-full"
			// 			alt=""
			// 		/>
			// 		<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
			// 			<a href="#slide3" className="btn btn-circle">
			// 				❮
			// 			</a>
			// 			<a href="#slide2" className="btn btn-circle">
			// 				❯
			// 			</a>
			// 		</div>
			// 	</div>
			// 	<div id="slide2" className="carousel-item relative w-full">
			// 		<img
			// 			src="https://computerzone.com.bd/wp-content/uploads/2022/11/slider-11-27-2022-a-1.jpg"
			// 			className="w-full"
			// 			alt=""
			// 		/>
			// 		<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
			// 			<a href="#slide1" className="btn btn-circle">
			// 				❮
			// 			</a>
			// 			<a href="#slide3" className="btn btn-circle">
			// 				❯
			// 			</a>
			// 		</div>
			// 	</div>
			// 	<div id="slide3" className="carousel-item relative w-full">
			// 		<img
			// 			src="https://computerzone.com.bd/wp-content/uploads/2022/11/slider-11-27-2022-e.jpg"
			// 			className="w-full" alt=''
			// 		/>
			// 		<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
			// 			<a href="#slide2" className="btn btn-circle">
			// 				❮
			// 			</a>
			// 			<a href="#slide1" className="btn btn-circle" alt=''>
			// 				❯
			// 			</a>
			// 		</div>
			// 	</div>
			// </div>
		);
};

export default Carousel;