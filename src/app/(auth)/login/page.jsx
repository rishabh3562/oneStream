"use client"
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Account, Client, Databases, ID } from 'appwrite';
import getInitialClient from '../../../helpers/getAppwrite' 
const Login = () => {
    const router = useRouter();
    const { client, account, databases } = getInitialClient();
    const [loading, setLoading] = useState(false);
    const { register: signUpRegister, handleSubmit, getValues } = useForm();
    const { register: signInRegister, handleSubmit: loginHandleSubmit } = useForm();

   useEffect(() => {
    const fetchData = async () => {
        try {
            await account.get();
            console.log("account mila");
        } catch (error) {
            console.log("No users");
        }
    };

    fetchData();
}, []);
useEffect(() => {
  const fetchData = async () => {
      try {
         const result= await account.get();
         if(result){
          router.push('/dashboard');
         }
          console.log("account mila result",result);
      } catch (error) {
          console.log("No users");
      }
  };

  fetchData();
}, []);



const handleSignIn = async (data) => {
  setLoading(true);

  try {
      const handlerSignInresult=await account.createEmailSession(data.email, data.password);
      // router.push("/dashboard");
      console.log("account logged in success ",handlerSignInresult)
  } catch (error) {
      console.log(error);
      setLoading(false);
  }
};

    return (
        <section className='min-h-screen w-full flex items-center justify-center flex-col gap-2 bg-[#121212] text-white'>
            <h2 className='text-center text-[2.5rem] font-[700]'>Login to Your Account</h2>
            <p className='text-lg md:w-[500px] text-white/40 text-center'>Drag your way into an extraordinary experience and unleash the possibilities within our platform </p>
            <div className='flex flex-col lg:flex-row gap-5 items-center mt-5 justify-center xl:justify-evenly w-full max-w-[700px]'>

                <form onSubmit={loginHandleSubmit(handleSignIn)} className='p-4 flex flex-col gap-3'>
                    <p className='text-sm font-semibold'>Sign In</p>
                    <input required {...signInRegister("email")} type="text" placeholder='email' className='primary-input' />
                    <input required {...signInRegister("password")} type="password" placeholder='password' className='primary-input' />
                    <button type="submit" value="Sign In" className='primary-input primary-gradient grid place-items-center text-snc text-black font-semibold cursor-pointer '>
                        {loading ? (<img src="/loading2.gif" className='w-7 h-7' alt="loading" />) : "Log in"}
                    </button>
                </form>

                <p className='text-2xl font-bold'>/</p>

                <form onSubmit={handleSubmit(handleSignUp)} className='p-4 flex flex-col gap-3'>
                    <p className='text-sm font-semibold'>Sign Up</p>
                    <div className='flex gap-3'>
                        <input required type="text" {...signUpRegister("fname")} placeholder='first name' className='primary-input w-[calc(185px-.375rem)]' />
                        <input required type="text" {...signUpRegister("lname")} placeholder='last name' className='primary-input w-[calc(185px-.375rem)]' />
                    </div>
                    <input required type="email" {...signUpRegister("email")} placeholder='email' className='primary-input' />
                    <div className='flex gap-3'>
                        <input required type="password" {...signUpRegister("password")} placeholder='password' className='primary-input w-[calc(270px-0.9rem)]' />
                        <button type="submit" value="Sign In" className='primary-input primary-gradient grid place-items-center text-black text-sm font-semibold cursor-pointer w-[calc(100px)]'>
                        {loading ? (<img src="/loading2.gif" className='w-7 h-7' alt="loading" />) : (<p>Sign Up</p>)}
                    </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;
