import img from '../../assets/images/adoption_shop_thumb01.jpg'
import { motion, AnimatePresence } from 'framer-motion'


const FormSide = () => {
    return (
        <div className='md:w-1/2 h-screen flex justify-center items-center border bg-gradient-to-br from-orange-100 via-white to-teal-100 relative overflow-hidden border-red-500'>

            <div>

                <div className='rounded-full border flex justify-center items-center bg-gradient-to-br from-orange-200 to-teal-200 w-72 h-72 mx-auto'>
                    <img className='rounded-full w-64 mx-auto' src={img} alt="" />
                </div>

                <div className='text-center mt-5'>
                    <h2 className="text-4xl font-bold mb-4" style={{ color: "#0A303A" }}>
                        Every Pet Deserves Love
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Join thousands of families who have found their <br /> perfect companion through PawsConnect
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8">
                    <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: "#F04336" }}>
                            2,500+
                        </div>
                        <div className="text-sm text-gray-600">Happy Adoptions</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: "#F04336" }}>
                            150+
                        </div>
                        <div className="text-sm text-gray-600">Partner Shelters</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: "#F04336" }}>
                            98%
                        </div>
                        <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                </div>

                <motion.div
                    className="absolute top-10 left-10 opacity-10"
                    animate={{ y: [0, -20, 0, 20, 0], x: [0, 20, 0, -20, 0] }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="w-32 h-32 rounded-full" style={{ backgroundColor: "#F04336" }}></div>
                </motion.div>

                <motion.div
                    className="absolute bottom-10 right-10 opacity-10"
                    animate={{ y: [0, 15, 0, -15, 0], x: [0, -15, 0, 15, 0] }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="w-24 h-24 rounded-full" style={{ backgroundColor: "#0A303A" }}></div>
                </motion.div>



            </div>

        </div>
    );
};

export default FormSide;