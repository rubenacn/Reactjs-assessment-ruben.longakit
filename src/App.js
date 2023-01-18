import { useContext } from 'react';
import { Switch, Route, Redirect, useParams } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import EventAttendeesPage from './pages/EventAttendeesPage';
import EditEventPage from './pages/EditEventPage';
import NewEventPage from './pages/NewEventPage';
import AuthContext from './store/auth';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        <Route path='/events' exact>
          {authCtx.isAdmin && <EventsPage />}
          {!authCtx.isAdmin && <Redirect to='/' />} 
        </Route>
        <Route path='/events/new'>
          {authCtx.isAdmin && <NewEventPage />}
          {!authCtx.isAdmin && <Redirect to='/' />} 
        </Route>
        <Route path='/events/:id/edit'>
          {authCtx.isAdmin && <EditEventPage />}
          {!authCtx.isAdmin && <Redirect to='/' />} 
        </Route>
        <Route path='/events/:id/attendees'>
          {authCtx.isAdmin && <EventAttendeesPage />}
          {!authCtx.isAdmin && <Redirect to='/' />} 
        </Route>
        <Route path='/events/:id'>
          <EventDetailPage />
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}
 
export default App;
