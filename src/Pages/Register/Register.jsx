import React, { useContext } from 'react';
import FormSide from '../../Components/Form Side Comp/FormSide';
import logo from '../../assets/images/icons8-cat-footprint-48.png';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';
import UseAxios from '../../Hooks/UseAxios';
import axios from 'axios';

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, setUser, loading, updateUserProfile  , createGoogleUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosSecure = UseAxios();

    const onSubmit = (data) => {
        const { name, email, image, password } = data;
        console.log("Name received:", name); // ✅ working

        if (loading) {
            console.log("Still loading, skipping submit");
            return;
        }

        createUser(email, password)
            .then(res => {
                console.log("✅ User created:", res.user);

                updateUserProfile({ displayName: name, photoURL: image })
                    .then(() => {
                        console.log("✅ Profile updated");

                        setUser(res.user);

                        const userData = {
                            name,
                            email,
                            image,
                            role: 'user'
                        };

                        axios.post('https://petnest-server-site.vercel.app/users', userData)
                            .then(resu => {
                                console.log("✅ Axios POST response:", resu.data);
                                if (resu.data.insertedId) {
                                    navigate('/');
                                    toast.success('Welcome to PawConnect');
                                } else {
                                    console.warn("User not inserted to DB");
                                }
                            })
                            .catch(err => {
                                console.error("❌ Axios Error:", err);
                                toast.error("Error saving user to DB");
                            });
                    })
                    .catch(err => {
                        console.error("❌ updateUserProfile Error:", err);
                        toast.error("Failed to update user profile");
                    });
            })
            .catch(err => {
                console.error("❌ createUser Error:", err);
                toast.error("Failed to create user");
            });
    };


    const HandleGoogle = () => {

        createGoogleUser()
            .then(res => {
                console.log(res.user)
                setUser(res.user);
                const userInfo = {
                    name: res.user?.displayName,
                    email: res.user?.email,
                    image: res.user?.photoURL,
                    role:'user'
                }

                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        navigate('/');
                        if (res.data.insertedId) {
                            toast.success('Welcome to PawConnect')
                        }
                    })

            })
            .catch(error => {
                console.log(error.message);
            })

    }


    return (
        <div className='min-h-screen'>
            <div className='md:flex'>
                <FormSide />

                <div className='flex-1 bg-[#FFFDF9] text-black flex justify-center items-center px-4 py-12'>
                    <div className="w-full max-w-md space-y-6">

                        {/* Header */}
                        <div className='text-center'>
                            <img className='mx-auto mb-3' src={logo} alt="logo" />
                            <h2 className="text-4xl font-bold text-[#0A303A] mb-2">PawsConnect</h2>
                            <p className="text-sm text-gray-600">Find your perfect companion</p>
                        </div>

                        {/* Card */}
                        <div className="card w-full shadow-xl">
                            <div className="card-body w-full">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="form-control">
                                        <label className="label">Name</label>
                                        <input
                                            type="text"
                                            {...register("name", { required: "Name is required" })}
                                            className="input input-bordered w-full"
                                            placeholder="Name"
                                        />
                                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">Profile Picture URL</label>
                                        <input
                                            type="text"
                                            {...register("image", { required: "Image URL is required" })}
                                            className="input input-bordered w-full"
                                            placeholder="photoURL"
                                        />
                                        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">Email</label>
                                        <input
                                            type="email"
                                            {...register("email", { required: "Email is required" })}
                                            className="input input-bordered w-full"
                                            placeholder="Email"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">Password</label>
                                        <input
                                            type="password"
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters"
                                                }
                                            })}
                                            className="input input-bordered w-full"
                                            placeholder="Password"
                                        />
                                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                    </div>

                                    <button
                                        className="btn text-white bg-[#F04336] w-full mt-2"
                                    >
                                        Create an account
                                    </button>

                                    <button
                                    onClick={HandleGoogle}
                                    type="button" className='btn btn-block text-[#0A303A]'>
                                        <FcGoogle />
                                        Login with Google
                                    </button>

                                    <p>
                                        Already have an account?{" "}
                                        <Link className='text-[#F04336]' to={'/login'}>
                                            Login
                                        </Link>
                                    </p>
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
