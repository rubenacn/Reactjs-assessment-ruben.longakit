import { useState } from 'react';
import EventCard from '../Common/EventCard';
import classes from './EventsList.module.css';

function EventsList({ events, onEventsUpdate, onDelete }) {
    const [filteredEvents, setFilteredEvents] = useState(events);

    const changeHandler = (event) => {
        const query = event.target.value;
        var updatedList = [...events];

        updatedList = updatedList.filter((item) => {
            return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });

        setFilteredEvents(updatedList);
    };

    return (
        <section className={classes.wrapper}>
            <div className='tdiv'>
                <div className='rdiv'>
                    <div className='cdiv'><input onChange={changeHandler} type={"text"} placeholder="Search for events..." /></div>
                </div>
            </div>
            <ul className={classes.events}>
                {filteredEvents.map((event) => (
                    <li key={event.id}>
                        <EventCard onDelete={() => { onDelete(event.id) }} event={event} />
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default EventsList;