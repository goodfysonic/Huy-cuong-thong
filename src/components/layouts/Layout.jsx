import { Outlet } from 'react-router-dom';
import { useModal } from '@/hooks/useModal';
import Header4 from '@/components/common/header/Header4';
import Footer from '../common/footer';

const Layout = () => {
 const [isShowMobile, toggleMobileMenu] = useModal('.menu-mobile-popup');

 return (
   <>
     <Header4 
       clname="actJob1" 
       handleMobile={toggleMobileMenu}
     />
     <div className={`menu-mobile-popup ${isShowMobile ? 'modal-menu--open' : ''}`}>
       {/* Mobile menu content */}
     </div>
     <Outlet />
     <Footer />
   </>
 );
};

export default Layout;