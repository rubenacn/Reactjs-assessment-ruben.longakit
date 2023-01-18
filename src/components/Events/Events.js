import { useContext, useEffect, useState, useCallback } from 'react';
import { getEvents } from '../../util/api';
import EventsList from '../Events/EventsList';
import LoaderIcon from '../Common/LoaderIcon';
import AuthContext from '../../store/auth';
import classes from './Events.module.css';
import { deleteEvent } from '../../util/api';
import { confirm } from "react-confirm-box";
import { useHistory } from 'react-router-dom';

const Events = () => {
  const [error, setError] = useState();
  const [events, setEvents] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

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
  const deleteEventHandler = async (eventId) => {
    const result = await confirm("Confirm delete?");
    if (result) {
        setIsLoading(true);
        try {
            await deleteEvent(eventId, authCtx.token);
            history.go("#");
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }
}
  useEffect(() => {
    eventUpdateHandler();
  }, []);


  return (
    <section className={classes.wrapper}>
      {error && <p>{error}</p>}
      {!error && events && <EventsList onDelete={deleteEventHandler} onEventsUpdate={eventUpdateHandler} events={events} />}
      {isLoading && <LoaderIcon/>}
      
    </section>
  );
};

export default Events;
