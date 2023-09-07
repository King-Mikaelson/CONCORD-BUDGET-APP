import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Hero from "../components/Hero"
import LoadingIndicator from "../LoadingIndicator";

type Props = {
    setUser: React.Dispatch<React.SetStateAction<{}>>;
    validatingUser:boolean
    
  };

export default function Layout({setUser, validatingUser}: Props) {
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