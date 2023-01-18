import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { reserveEvent, cancelReservedEvent } from '../../util/api';
import { toast } from 'react-toastify';
import EventCardHome from '../Common/EventCardHome';
import AuthContext from '../../store/auth';
import classes from './EventsList.module.css';

function EventsList({ events, onEventsUpdate }) {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const history = useHistory();

    const reservationHandler = async (eventId) => {
        if (!isLoggedIn) {
            toast("You need to login in order to reserve an event.", {
                autoClose: 5000,
                type: "warning"
            });
            return history.push('/auth');
        }

        try {
            await toast.promise(reserveEvent(authCtx.userId, authCtx.username, authCtx.name, eventId, authCtx.token),
                {
                    pending: 'Processing reservation!',
                    success: 'Reservation completed!',
                    error: 'Reservation error!!!'
                });
            onEventsUpdate(eventId);
        } catch (err) {
            toast(err.message, {
                autoClose: 3000,
                type: "error"
            });
        }
    }

    const cancelReservationHandler = async (eventId) => {
        if (!isLoggedIn) {
            return history.push('/auth');
        }
        try {
            await toast.promise(cancelReservedEvent(authCtx.userId, eventId, authCtx.token),
                {
                    pending: 'Canceling reservation!',
                    success: 'Reservation canceled!',
                    error: 'Reservation cancelation error!!!'
                });
            onEventsUpdate(eventId);
        } catch (err) {
            toast(err.message, {
                autoClose: 3000,
                type: "error"
            });
        }
    }

    return (
        <section className={classes.wrapper}>
            <ul className={classes.events}>
                {events.map((event) => (
                    <li key={event.id}>
                        <EventCardHome onCancelClick={() => { cancelReservationHandler(event.id) }} onReserveClick={() => { reservationHandler(event.id) }} event={event} />
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default EventsList;