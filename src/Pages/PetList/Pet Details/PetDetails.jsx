import { useParams } from 'react-router-dom';
import SectionCover from '../../../Components/SectionCover/SectionCover';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UseAxios from '../../../Hooks/UseAxios';
import img from '../../../assets/images/breadcrumb_bg.jpg'
import { FaBirthdayCake, FaHeart, FaPaw, FaTransgenderAlt } from 'react-icons/fa';
import { IoShareSocialOutline } from 'react-icons/io5';
import { FaLocationDot } from 'react-icons/fa6';
import './petDetails.css'


const PetDetails = () => {

    const { id } = useParams();
    const AxiosSecure = UseAxios();
    // console.log(id)

    const [pet, setPet] = useState([]);

    useEffect(() => {


        AxiosSecure.get(`/pets/${id}`)
            .then(res => {
                console.log(res.data)
                setPet(res.data)
            })

    }, [AxiosSecure, id])
    return (
        <div className='min-h-screen -mt-8 p-12 Bg'>


            <div className='text-[#0A303A] flex justify-between px-6'>
                <div>
                    <h2 className="text-3xl font-bold">{pet.name}</h2>
                    <p>{pet.location}</p>
                </div>
                <div className='flex gap-2'>
                    <FaHeart className='text-3xl'></FaHeart>
                    <IoShareSocialOutline className='text-3xl' />

                </div>
            </div>

            <div className="divider"></div>


            <div className='flex gap-3'>
                <div className='md:w-1/2'>
                    <img className='rounded-2xl w-full h-full object-cover' src={pet.image} alt="" />
                </div>

                <div className=' border border-gray-400 rounded-2xl flex-1 '>

                    <div className='p-12'>
                        <div className='flex justify-between p-5'>
                            <div>
                                <p
                                    className='flex gap-2 text-xs'
                                ><FaBirthdayCake className='text-xs text-[#F04336]'></FaBirthdayCake> Age</p>
                                <p className='text-lg font-bold'>{pet.age}</p>
                            </div>
                            <div>
                                <p
                                    className='flex gap-2 text-xs'
                                ><FaTransgenderAlt className='text-xs  text-[#F04336]' /></p>
                                <p className='text-lg font-bold'>Male</p>
                            </div>
                        </div>
                        <div className='flex justify-between p-5'>
                            <div>
                                <p
                                    className='flex gap-2 text-xs'
                                ><FaLocationDot className='text-xs  text-[#F04336]' ></FaLocationDot> Location</p>
                                <p className='text-lg font-bold'>{pet.location}</p>
                            </div>
                            <div>
                                <p
                                    className='flex gap-2 text-xs'
                                ><FaPaw className='text-xs  text-[#F04336]'></FaPaw></p>
                                <p className='text-lg font-bold'>Large</p>
                            </div>
                        </div>
                    </div>

                    <div className='p-5'>
                        <p className='text-xl font-bold'>About {pet.name}</p>
                        <p className='text-gray-600'>{pet.long_description}</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PetDetails;