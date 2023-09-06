import React from 'react';
import {FiSettings} from "react-icons/fi"
import{AiOutlinePlus} from "react-icons/ai"
import {IoReturnUpBackOutline} from "react-icons/io5"
import {useNavigate, Link} from "react-router-dom"
import { signOut } from "firebase/auth";
import {auth} from "../../firebase/firebaseConfig";
import { toast } from 'react-toastify';


type Props = {
  setUser: React.Dispatch<React.SetStateAction<{}>>;
};



function Hero({setUser}:Props) {
  const navigate = useNavigate()
  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        toast.success("Signed out successfully")
        setUser({})
        navigate("/")
    }).catch((error) => {
    // An error happened.
    });
  }
  return (
    <div className="w-full mt-20 md:py-11 py-6 pb-6 flex justify-between px-6  lg:px-14  items-center">
    <div className='flex gap-1 flex-col'>
    <h1 className='text-[#101828] md:text-3xl text-2xl font-workSans font-semibold'>Good morning!</h1>
    <p className='text-[#475467] text-base font-workSans font-normal'>You got some budget. </p>
    </div>
    <div className='flex flex-col gap-5'>
    <button onClick={() => navigate("/view/budget")} className='md:flex gap-2  px-5 bg-[#3F5BF6] items-center rounded-lg h-fit py-3 justify-between hidden '>
    <IoReturnUpBackOutline className='text-white'/>
    <p className="text-white font-workSans font-semibold text-sm">Go Back Home</p>
   </button>

   <button onClick={() =>handleLogout()} className='md:flex gap-2  px-5 bg-red-500 items-center rounded-lg h-fit py-3 justify-center hidden '>
    <AiOutlinePlus className='text-white'/>
    <p className="text-white font-workSans font-semibold text-sm">Logout</p>
   </button>
    </div>
    </div>
  )
}

export default Hero