import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[104px] md:pt-[124px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
