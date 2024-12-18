import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../router/routes';
import { Icon } from '../../atoms/Icon/Icon';

export const Navigation = () => {
  const location = useLocation();
  return (
    <>
      <nav className="fixed flex bottom-0 border-t-[1.5px] border-[#c2c7d6] justify-around w-full py-2 text-black z-10 bg-white font-archivoNarrow dark:bg-slate-800 transition">
        <Link to={`${ROUTES.HOME}`} className="flex flex-col items-center">
          <Icon
            name={location.pathname !== ROUTES.HOME ? 'homeInactive' : 'home'}
            className="fill-slate-800 dark:fill-slate-300"
          />
          Home
        </Link>
        <Link to={ROUTES.READ_ME} className="flex flex-col items-center">
          <Icon
            name={
              location.pathname !== ROUTES.READ_ME ? 'readMeInactive' : 'readme'
            }
            className="fill-slate-800 dark:fill-slate-300"
          />
          Readme
        </Link>
      </nav>
    </>
  );
};
