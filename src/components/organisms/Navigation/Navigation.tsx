import { Link } from "react-router-dom"
import { ROUTES } from "../../../router"
import iconHome from '/assets/icons/Home-Inactif.svg'
import iconReadMe from '/assets/icons/Readme-Inactif.svg'

export const Navigation = () => {
    return <>
    <nav className='fixed flex bottom-0 border-t-[1.5px] border-[#c2c7d6] justify-around w-full py-2 text-black z-10 bg-white'>
        <Link to={ROUTES.HOME}> 
          <img src={iconHome} width={40} className='m-auto' />
          Home
        </Link>
        <Link to={ROUTES.READ_ME}>  
          <img src={iconReadMe} width={40} className='m-auto' />
          Readme
        </Link>
    </nav>
    </>
}