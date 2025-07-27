import React, { useContext } from 'react';
import FormSide from '../../Components/Form Side Comp/FormSide';
import logo from '../../assets/images/icons8-cat-footprint-48.png'
import { Link , useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';


const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const {createUser , setUser , loading , updateUserProfile} = useContext(AuthContext)
    const navigate = useNavigate()

    

    const onSubmit = (data) => {
        const formdata = data;
        const {name , email , image , password} = formdata;
        console.log(email);

        if(loading)
        {
            <p>...Loading</p>
        }

        createUser(email , password)
        .then(res =>{
            setUser(res.user)
            // Update profile to set name and profile image
            updateUserProfile({displayName : name , photoURL :image})
            .then(result =>{

                navigate('/')
                toast.success("Congratulation ! Account created successfully", {
                    position: "top-center"
                });

            })           

        })
    };


    return (
        <div className='min-h-screen'>

            <div className='md:flex'>

                <FormSide></FormSide>

                <div className='flex-1 bg-[#FFFDF9] text-black flex justify-center items-center px-4 py-12'>
                    <div className="w-full max-w-md space-y-6">
                        {/* Header */}
                        <div className='text-center'>
                            <img className='mx-auto mb-3' src={logo} alt="logo" />
                            <h2 className="text-4xl font-bold text-[#0A303A] mb-2">PawsConnect</h2>
                            <p className="text-sm text-gray-600">Find your perfect companion</p>
                        </div>

                        {/* Card */}
                        <div className="card w-full shadow-xl ">
                            <div className="card-body w-full">
                                <form onSubmit={handleSubmit(onSubmit)}  className="space-y-4">
                                    <div className="form-control">
                                        <label className="label">Name</label>
                                        <input type="text"
                                        {...register("name" ,{required : "Name is required"})}
                                        className="input input-bordered w-full" placeholder="Name" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">Profile Picture</label>
                                        <input
                                         type="text"
                                         {...register("image",{required:"image is required"})}
                                         className="input input-bordered w-full" placeholder="photoURL" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">Email</label>
                                        <input type="email"
                                         {...register("email",{required:"email is required"})}
                                        className="input input-bordered w-full" placeholder="Email" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">Password</label>
                                        <input type="password"
                                         {...register("password",{required:"password is required"})}
                                        className="input input-bordered w-full" placeholder="Password" />
                                    </div>

                                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                                    <button type="submit" className="btn text-white bg-[#F04336] w-full mt-2">Create an account</button>

                                    <button className='btn btn-block text-[#0A303A]'>
                                        <FcGoogle />
                                        Login with Google
                                    </button>


                                    <p>Already have an account ? <Link className='text-[#F04336]' to={'/login'}> Login</Link></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Register;