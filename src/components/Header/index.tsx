import {FiSettings} from "react-icons/fi";
import {BsBell} from "react-icons/bs"
import {HiMenuAlt1} from "react-icons/hi"
type Props = {}


function Header({}: Props) {
  return (
    <div className="fixed z-30 top-0 w-full py-6 flex justify-between px-6 lg:px-14   border-b solid border-[#EAECF0] bg-white items-center">
    <h1 className="font-inter text-2xl font-bold text-black">Budget Manager</h1>
    <div className="md:flex items-center gap-8 hidden">
      <FiSettings size={20} color="#667085"/>
       <BsBell size={20} color="#667085"/>
        <img alt="dropdown img" src="/Dropdown.svg"/>
    </div>
    <div className="block md:hidden">
      <HiMenuAlt1 size={24} color="#667085"/>
    </div>
    </div>
  )
}

export default Header