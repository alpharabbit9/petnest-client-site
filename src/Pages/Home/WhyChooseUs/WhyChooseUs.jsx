import CountUp from '../../../Components/CountUp/CountUp';
import './whyChooseUs.css'


const WhyChooseUs = () => {
    return (
        <div className='min-h-screen flex justify-center items-center text-[#0A303A] Bg p-12'>

            <div className='text-center '>
                <p className='text-[#F04336] text-3xl font-bold mb-3'>Why choose us ?</p>
                <h2 className='text-3xl md:text-5xl font-bold text-[#0A303A]'>Best Service to Breeds Your <br /> Loved Dog Explore</h2>

                <div className='mt-12 md:flex gap-5 md:gap-6'>
                    <div className="stats shadow-2xl w-72 h-52">
                        <div className="stat p-12 ">

                            <div className="stat-value">
                                <CountUp
                                    from={0}
                                    to={75}
                                    separator=","
                                    direction="up"
                                    duration={1}
                                    className="count-up-text text-5xl"
                                />%</div>
                            <div className="stat-desc">
                                <p className='text-lg'>Dogs are first bread</p>
                            </div>
                        </div>
                    </div>
                    <div className="stats shadow-2xl w-72 h-52">
                        <div className="stat p-12 ">

                            <div className="stat-value">
                                <CountUp
                                    from={0}
                                    to={100}
                                    separator=","
                                    direction="up"
                                    duration={1}
                                    className="count-up-text text-5xl"
                                />+</div>
                            <div className="stat-desc">
                                <p className='text-lg'>Most Dogs are first</p>
                            </div>
                        </div>
                    </div>
                    <div className="stats shadow-2xl w-72 h-52">
                        <div className="stat p-12 ">

                            <div className="stat-value">
                                <CountUp
                                    from={0}
                                    to={39}
                                    separator=","
                                    direction="up"
                                    duration={1}
                                    className="count-up-text text-5xl"
                                />+</div>
                            <div className="stat-desc">
                                <p className='text-lg'>Dog Breading</p>
                            </div>
                        </div>
                    </div>
                    <div className="stats shadow-2xl w-72 h-52">
                        <div className="stat p-12 ">

                            <div className="stat-value">
                                <CountUp
                                    from={0}
                                    to={15}
                                    separator=","
                                    direction="up"
                                    duration={1}
                                    className="count-up-text text-5xl"
                                />+</div>
                            <div className="stat-desc">
                                <p className='text-lg'>Years of history</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default WhyChooseUs;