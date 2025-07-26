import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from '../../../assets/images/slider_bg01.jpg';
import img2 from '../../../assets/images/slider_bg02.jpg';
import './Banner.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
    return (
        <div className="-mt-6 relative">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="relative">
                        <img src={img1} alt="" className="w-full h-[80vh] object-cover" />
                        <div className="absolute inset-0 bg-opacity-40 flex flex-col  justify-center text-white  px-7">
                            <h2 className="text-4xl banner md:text-6xl font-extrabold mb-4">Best Friend <span className='px-2 py-1 bg-[#F04336] rounded-2xl'>with</span><br /> Happy Time</h2>
                            <p className="text-lg banner md:text-xl">Human Shampoo on Dogs After six days of delirat, the <br /> jury found Hernandez guilty of first-degree murder</p>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative">
                        <img src={img2} alt="" className="w-full h-[80vh] object-cover" />
                        <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-center text-white  px-7">
                           <h2 className="text-4xl banner md:text-6xl font-extrabold mb-4">Best Friend <span className='px-2 py-1 bg-[#F04336] rounded-2xl'>with</span><br /> Happy Time</h2>
                            <p className="text-lg banner md:text-xl">Human Shampoo on Dogs After six days of delirat, the <br /> jury found Hernandez guilty of first-degree murder</p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
