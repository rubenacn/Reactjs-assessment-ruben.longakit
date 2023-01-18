import { Fragment } from 'react';

import MainNavigation from './MainNavigation';
import { ToastContainer } from 'react-toastify';


const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
      <ToastContainer />
    </Fragment>
  );
};

export default Layout;
