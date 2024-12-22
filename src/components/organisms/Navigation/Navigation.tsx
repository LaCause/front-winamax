import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../router/routes';
import {
  UserOutlined,
  BookFilled,
  BookOutlined,
  HomeFilled,
  HomeOutlined,
} from '@ant-design/icons';

export const Navigation = () => {
  const location = useLocation();
  return (
    <>
      <nav className="sticky flex bottom-0 border-t-[1.5px] border-[#c2c7d6] justify-around w-full py-2 text-black z-10 bg-white font-archivoNarrow dark:bg-slate-800 transition">
        <Link
          to={`${ROUTES.HOME}`}
          className="flex flex-col items-center text-black dark:text-gray-300"
        >
          {location.pathname === ROUTES.HOME ? (
            <HomeFilled style={{ fontSize: 24 }} />
          ) : (
            <HomeOutlined style={{ fontSize: 24 }} />
          )}
          Home
        </Link>
        <Link
          to={ROUTES.READ_ME}
          className="flex flex-col items-center text-black dark:text-gray-300"
        >
          {location.pathname === ROUTES.READ_ME ? (
            <BookFilled style={{ fontSize: 24 }} />
          ) : (
            <BookOutlined style={{ fontSize: 24 }} />
          )}
          Readme
        </Link>
        <Link
          to={ROUTES.LOGIN}
          className="flex flex-col items-center text-black dark:text-gray-300"
        >
          <UserOutlined style={{ fontSize: 24 }} />
          Login
        </Link>
      </nav>
    </>
  );
};
