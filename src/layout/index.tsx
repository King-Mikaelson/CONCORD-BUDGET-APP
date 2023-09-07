import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Hero from "../components/Hero"
import LoadingIndicator from "../LoadingIndicator";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    setUser: React.Dispatch<React.SetStateAction<{}>>;
    validatingUser:boolean
    user:any
    
  };

export default function Layout({setUser, validatingUser,user}: Props) {
  const navigate = useNavigate()
  
  useEffect(() => {
    if(user === null && !validatingUser){
      navigate("/")
    }
  },[])


  if (validatingUser) {
    return (
     <LoadingIndicator/>
    );
  }

  return (
    <div>
    <Header/>
    <Hero  setUser={setUser}/>
    <Outlet/>
    </div>
  )
}