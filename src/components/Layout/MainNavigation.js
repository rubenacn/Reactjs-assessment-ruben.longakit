import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { confirm } from "react-confirm-box";
import AuthContext from '../../store/auth';
import classes from './MainNavigation.module.css';
import { toast } from 'react-toastify';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.isAdmin;
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = async () => {
    const result = await confirm("Continue logout?");
     if (result) {
      authCtx.logout();
     }
  };

  return (
    <header className={classes.header}>
      <Link className={classes.logolink} to='/'>
        <div className={classes.logo}>Event Manager</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <NavLink className={"nav-btn"} to='/auth'>Login</NavLink>
            </li>
          )}
          {isAdmin && (
            <li>
              <NavLink className={"nav-btn"} to='/events'>All Events</NavLink>
            </li>
          )}
          {isAdmin && (
            <li>
              <NavLink className={"nav-btn"} to='/events/new'>New Event</NavLink>
            </li>
          )}


          {isLoggedIn && (
            <li>
              <NavLink className={"nav-btn"} to="#" onClick={logoutHandler}>
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
