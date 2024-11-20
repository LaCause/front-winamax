import './App.css';
import { Outlet } from 'react-router-dom';
import { Navigation } from './components/organisms/Navigation/Navigation';
import { Header } from './components/organisms/Header/Header';
import { useTheme } from './hook/useTheme/useTheme';

function App() {
  console.log('App.tsx', window.location.pathname);
  const { darkmode } = useTheme();

  return (
    <>
      <div
        className={`flex flex-col min-h-screen bg-primary-grey dark:bg-slate-800 ${darkmode ? 'dark' : 'light'}`}
      >
        <Header />
        <div className="flex-grow flex items-center justify-center py-16 mb-[70px]">
          <Outlet />
        </div>
        <Navigation />
      </div>
    </>
  );
}

export default App;
