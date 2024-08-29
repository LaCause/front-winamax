import './App.css'
import { Outlet } from 'react-router-dom'
import { Navigation } from './components/organisms/Navigation/Navigation'
import { Header } from './components/organisms/Header/Header'
function App() {
  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <div className='flex-grow flex items-center justify-center py-16'>
          <Outlet />
        </div>
        <Navigation />
      </div>
    </>
  )
}

export default App
