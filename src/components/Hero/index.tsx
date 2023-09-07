import React from 'react';
import{BiLogOut} from "react-icons/bi"
import {IoReturnUpBackOutline} from "react-icons/io5"
import {useNavigate} from "react-router-dom"
import { signOut } from "firebase/auth";
import {auth} from "../../firebase/firebaseConfig";
import { toast } from 'react-toastify';


type Props = {
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
};



function Hero({setUser}:Props) {
  const navigate = useNavigate()
  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        toast.success("Signed out successfully")
        setUser(null)
        navigate("/")
    }).catch((error) => {
    // An error happened.
    });
  }
  return (
    <div className="w-full mt-20 md:py-11 py-6 pb-6 flex md:flex-row flex-col justify-between px-6  lg:px-14  md:items-center">
    <div className='flex gap-1 flex-col'>
    <h1 className='text-[#101828] md:text-3xl text-2xl font-workSans font-semibold'>Good morning!</h1>
    <p className='text-[#475467] text-base font-workSans font-normal'>You got some budget. </p>
    </div>
    <div className='flex md:flex-col gap-5 justify-between pt-5 md:pt-0'>
    <button onClick={() => navigate("/view/budget")} className='flex gap-2  px-5 bg-[#3F5BF6] items-center rounded-lg h-fit py-3 justify-between'>
    <IoReturnUpBackOutline className='text-white'/>
    <p className="text-white font-workSans font-semibold text-sm">Go Back Home</p>
   </button>

   <button onClick={() =>handleLogout()} className='flex gap-2  px-5 bg-red-600 items-center rounded-lg md:h-fit py-3 justify-center'>
    <BiLogOut className='text-white'/>
    <p className="text-white font-workSans font-semibold text-sm">Logout</p>
   </button>
    </div>
    </div>
  )
}

export default Hero