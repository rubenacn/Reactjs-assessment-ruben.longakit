import { Link } from 'react-router-dom';
import Moment from 'moment';

function EventCardHome({ event, onReserveClick, onCancelClick }) {
    function isBeforeToday(tmpDate) {
        const today = new Date();
        const date = new Date(tmpDate);
        today.setHours(0, 0, 0, 0);
        return date < today;
      }

    return (
        <div className='tdiv event-card-wrap'>
            <div className='rdiv'>
                <div className='cdiv event-card event-content'>
                    <div className='event-date'>{Moment(event.date).format('MMM D')} @ {event.time} {event.isReserved && <span className='will-attend'> - Will Attend</span>}</div>
                    <div className='event-title'>{event.name}</div>

                    <div className='event-venue'>{event.venue}</div>
                    <div className='event-performer'>Performer: {event.performer}</div>
                    <p>{event.description}</p>
                    
                    <menu className="card-menu">
                        <Link className="card-btn card-view" to={`events/${event.id.toString()}`}>View</Link>
                        {!event.isReserved && !isBeforeToday(event.date) && <button className="card-btn card-reserve" onClick={onReserveClick}>Reserve Now</button>}
                        {event.isReserved && !isBeforeToday(event.date) && <button className="card-btn card-cancel" onClick={onCancelClick}>Cancel Reservation</button>}
                        {isBeforeToday(event.date) && <span className="card-btn card-past">Past Event</span>}
                    </menu>
                </div>
                <div className='cdiv event-card event-img'>
                    <img src={event.image} alt={event.name} />
                </div>
            </div>


        </div>
    );
}

export default EventCardHome;