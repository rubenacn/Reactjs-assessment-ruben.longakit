import { useContext, useEffect, useState } from 'react';
import { getEvents } from '../../util/api';
import { useHistory } from 'react-router-dom';
import EventsList from '../Home/EventsList';
import LoaderIcon from '../Common/LoaderIcon';
import AuthContext from '../../store/auth';
import classes from './HomeContent.module.css';

const HomeContent = () => {
  const history = useHistory();
  const [error, setError] = useState();
  const [events, setEvents] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const eventUpdateHandler = async () => {
    setIsLoading(true);
    try {
      const events = await getEvents(authCtx.isLoggedIn ? authCtx.userId : false, authCtx.token);
      setEvents(events);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);

  }

  useEffect(() => {
    eventUpdateHandler();
  }, []);


  return (
    <section className={classes.wrapper}>
      {error && <p>{error}</p>}
      {!error && events && <EventsList onEventsUpdate={eventUpdateHandler} events={events} />}
      {isLoading && <LoaderIcon />}

    </section>
  );
};

export default HomeContent;
