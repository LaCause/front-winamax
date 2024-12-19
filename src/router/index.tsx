import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Home } from '../templates/Home/Home';
import { ReadMe } from '../templates/ReadMe/ReadMe';
import { ROUTES } from './routes';

export const BASENAME = '/front-winamax';

console.log('BASENAME', process.env.NODE_ENV);

const router = createBrowserRouter(
  [
    {
      path: ROUTES.HOME,
      element: <App />,
      children: [
        {
          path: ROUTES.HOME,
          Component: Home,
        },
        {
          path: ROUTES.READ_ME,
          Component: ReadMe,
        },
      ],
    },
  ],
  {
    basename: process.env.NODE_ENV === 'production' ? BASENAME : undefined,
  },
);

export default router;
