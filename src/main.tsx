import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ROUTES } from './router/index.ts'
import { Home } from './templates/Home/Home.tsx'
import { ReadMe } from './templates/ReadMe/ReadMe.tsx'

const router = createBrowserRouter([
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
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
