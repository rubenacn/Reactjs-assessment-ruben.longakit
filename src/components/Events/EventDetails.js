import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../store/auth';
import classes from './EventDetails.module.css';
import LoaderIcon from '../Common/LoaderIcon';
import ErrorContent from '../Common/ErrorContent';
import { Link } from 'react-router-dom';
import { getEvent, deleteEvent } from '../../util/api';
import { useHistory, useParams } from 'react-router-dom';
import { confirm } from "react-confirm-box";
import Moment from 'moment';

const EventDetails = () => {
  let { id } = useParams();
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const [error, setError] = useState();
  const [event, setEvent] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const deleteEventHandler = async (eventId) => {
    const result = await confirm("Confirm delete?");
    if (result) {
      setIsLoading(true);
      try {
        await deleteEvent(eventId, authCtx.token);
        history.replace("/");
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function loadEvent(id) {
      setIsLoading(true);
      try {
        const event = await getEvent(id);
        setEvent(event);
      } catch (err) {
        setError(err.message)
        //history.replace("/");
      }
      setIsLoading(false);
    }

    loadEvent(id);
  }, []);

  return (
    <section className={classes.wrapper}>
      {error && <ErrorContent />}
      {isLoading && <LoaderIcon />}
      {!error && !isLoading && (
        <div className='tdiv event-card-wrap'>
          <div className='rdiv'>
            <div className='cdiv event-card event-content'>
              <div className='event-date'>{Moment(event.date).format('MMM D')} @ {event.time} {event.isReserved && <span className='will-attend'> - Will Attend</span>}</div>
              <div className='event-title'>{event.name}</div>

              <div className='event-venue'>{event.venue}</div>
              <div className='event-performer'>Performer: {event.performer}</div>
              <p>{event.description}</p>
            </div>
            <div className='cdiv event-card event-img'>
              <img src={event.image} alt={event.name} />
            </div>
          </div>


        </div>


      )}
      <button className='back-btn' onClick={() => { history.push("/events") }}>Back</button>
    </section>
  );
};

export default EventDetails;
