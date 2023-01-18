import { Link } from 'react-router-dom';
import Moment from 'moment';

function EventCard({ event, onDelete }) {
    return (
        <div className='tdiv event-card-wrap'>
            <div className='rdiv'>
                <div className='cdiv event-card event-img'>
                    <img src={event.image} alt={event.name} />
                </div>
                <div className='cdiv event-card event-content'>
                    <div className='event-date'>{Moment(event.date).format('MMM D')} @ {event.time} {event.isReserved && <span className='will-attend'> - Will Attend</span>}</div>
                    <div className='event-title'>{event.name}</div>

                    <div className='event-venue'>{event.venue}</div>
                    <div className='event-performer'>Performer: {event.performer}</div>
                    <p>{event.description}</p>


                </div>
                <div className='cdiv event-card event-buttons'>
                    <menu className="card-menu vertical">
                        <Link className="card-btn card-view" to={`events/${event.id.toString()}`}>View</Link>
                        <Link className="card-btn card-edit" to={`events/${event.id.toString()}/edit`}>Edit</Link>
                        <Link className="card-btn card-atte" to={`events/${event.id.toString()}/attendees`}>Attendees</Link>
                        
                        <button className="card-btn card-dele" onClick={onDelete}>Delete</button>
                    </menu>
                </div>
            </div>


        </div>
    );
}

export default EventCard;