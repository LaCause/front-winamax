import './App.css'
import { Outlet } from 'react-router-dom'
import { Navigation } from './components/organisms/Navigation/Navigation'
import { Header } from './components/organisms/Header/Header'
function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Navigation />
    </>
  )
}

export default App
