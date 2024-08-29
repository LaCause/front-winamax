import { Link, Location, useLocation } from "react-router-dom"
import { ROUTES } from "../../../router"
import iconHome from '/assets/icons/Home-Inactif.svg'
import iconHomeActive from '/assets/icons/Home-Actif.svg'
import iconReadMe from '/assets/icons/Readme-Inactif.svg'
import iconReadMeActive from '/assets/icons/Readme-Actif.svg'

const getNavigationIcon = (location: Location, route: ROUTES, icon:string, activeIcon: string,) => {
    return location.pathname === route ? activeIcon: icon
}

export const Navigation = () => {
    const location = useLocation()
    return <>
    <nav className='fixed flex bottom-0 border-t-[1.5px] border-[#c2c7d6] justify-around w-full py-2 text-black z-10 bg-white font-archivoNarrow'>
        <Link to={ROUTES.HOME}> 
          <img src={getNavigationIcon(location, ROUTES.HOME, iconHome, iconHomeActive)} width={40} className='m-auto' />
          Home
        </Link>
        <Link to={ROUTES.READ_ME}>  
          <img src={getNavigationIcon(location, ROUTES.READ_ME, iconReadMe, iconReadMeActive)} width={40} className='m-auto' />
          Readme
        </Link>
    </nav>
    </>
}