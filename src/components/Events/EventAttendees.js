import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../store/auth';
import classes from './EventAttendees.module.css';
import LoaderIcon from '../Common/LoaderIcon';
import ErrorContent from '../Common/ErrorContent';
import Attendees from './Attendees';
import { Link } from 'react-router-dom';
import { getEventAttendees, deleteEvent } from '../../util/api';
import { useHistory, useParams } from 'react-router-dom';
import { confirm } from "react-confirm-box";

const EventAttendees = () => {
  let { id } = useParams();
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const [error, setError] = useState();
  const [attendees, setAttendees] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredAttendees, setFilteredAttendees] = useState();

  const deleteEventHandler = async (eventId) => {
    const result = await confirm("Continue logout?");
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
  

  const changeHandler = (event) => {
      const query = event.target.value;
      var updatedList = [...attendees];

      updatedList = updatedList.filter((item) => {
          return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });

      setFilteredAttendees(updatedList);
  };

  useEffect(() => {
    async function loadEvent(id) {
      setIsLoading(true);
      try {
        const response = await getEventAttendees(id, authCtx.token);
        setAttendees(response);
        setFilteredAttendees(response);
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
      <div className='tdiv'>
          <div className='rdiv'>
              <div className='cdiv'><input onChange={changeHandler} type={"text"} placeholder="Search for events..." /></div>
          </div>
      </div>
      {error && <ErrorContent />}
      {isLoading && <LoaderIcon />}
      {!error && !isLoading && <Attendees attendees={filteredAttendees} />}
      <button className='back-btn' onClick={() => { history.push("/events") }}>Back</button>

    </section>
  );
};

export default EventAttendees;
