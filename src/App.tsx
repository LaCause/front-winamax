import './App.css';
import { Outlet } from 'react-router-dom';
import { Navigation } from './components/organisms/Navigation/Navigation';
import { Header } from './components/organisms/Header/Header';
import { useTheme } from './hook/useTheme/useTheme';

function App() {
  const { darkmode } = useTheme();

  return (
    <>
      <div
        className={`flex flex-col min-h-screen bg-primary-grey dark:bg-slate-800 ${darkmode ? 'dark' : 'light'}`}
      >
        <Header />
        <section>
          <Outlet />
        </section>
        <Navigation />
      </div>
    </>
  );
}

export default App;
