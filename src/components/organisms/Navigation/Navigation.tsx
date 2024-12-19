import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../router/routes';
import { Icon } from '../../atoms/Icon/Icon';
import {
  UserOutlined,
  BookFilled,
  BookTwoTone,
  HomeTwoTone,
  BookOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

export const Navigation = () => {
  const location = useLocation();
  return (
    <>
      <nav className="fixed flex bottom-0 border-t-[1.5px] border-[#c2c7d6] justify-around w-full py-2 text-black z-10 bg-white font-archivoNarrow dark:bg-slate-800 transition">
        <Link to={`${ROUTES.HOME}`} className="flex flex-col items-center">
          <HomeTwoTone
            style={{ fontSize: 24 }}
            twoToneColor={location.pathname === ROUTES.HOME ? 'black' : ''}
          />
          Home
        </Link>
        <Link to={ROUTES.READ_ME} className="flex flex-col items-center">
          {location.pathname === ROUTES.READ_ME ? (
            <BookFilled style={{ fontSize: 24 }} />
          ) : (
            <BookOutlined style={{ fontSize: 24, color: 'black' }} />
          )}
          Readme
        </Link>
        <Link to={ROUTES.LOGIN} className="flex flex-col items-center">
          <UserOutlined style={{ fontSize: 24, color: 'black' }} />
          Login
        </Link>
      </nav>
    </>
  );
};
