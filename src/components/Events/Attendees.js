import { Link } from 'react-router-dom';

import classes from './Attendees.module.css';

function Attendees({ attendees }) {
    return (
        <div className={classes.attendees}>
            {attendees.map((attendee) => (
                <div key={attendee.id}>
                    {attendee.name && (<div className={classes.wrapper}>
                        <div className={classes.tittle}><label>Name:</label>{attendee.name}</div>
                        <div className={classes.subTitle}><label>email:</label>{attendee.username}</div>
                    </div>

                    )}
                </div>
            ))}
        </div>
    );
}

export default Attendees;
