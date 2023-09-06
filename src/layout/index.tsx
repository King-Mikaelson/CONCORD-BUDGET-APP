import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Hero from "../components/Hero"

type Props = {
    setUser: React.Dispatch<React.SetStateAction<{}>>;
  };

export default function Layout({setUser}: Props) {
  return (
    <div>
    <Header/>
    <Hero  setUser={setUser}/>
    <Outlet/>
    </div>
  )
}