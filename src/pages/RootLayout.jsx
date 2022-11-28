import { Outlet } from 'react-router-dom';

import MainNav from '../components/Layout/MainNav';
import Footer from '../components/Layout/Footer'

function RootLayout() {
  return (
    <>
      <MainNav/>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
