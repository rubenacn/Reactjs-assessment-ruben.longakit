import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../store/auth';
import EventForm from '../Events/EventForm';
import LoaderIcon from '../Common/LoaderIcon';
import { getEvent, saveEvent } from '../../util/api';
import { useHistory, useParams } from 'react-router-dom';

const EditEvent = () => {
    let { id } = useParams();
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [event, setEvent] = useState();

    const cancelHandler = async (event) => {
        history.push("/events");
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        setIsLoading(true);
        try {
            await saveEvent({
                id: id,
                date: formData.get('date').trim(),
                name: formData.get('name').trim(),
                venue: formData.get('venue').trim(),
                time: formData.get('time').trim(),
                performer: formData.get('performer').trim(),
                image: formData.get('image').trim(),
                description: formData.get('description').trim(),
            }, authCtx.token);

        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
        history.push("/events");
    }

    useEffect(() => {
        async function loadEvent(id) {
            setIsLoading(true);
            try {
                const event = await getEvent(id);
                setEvent(event);
            } catch (err) {
                history.replace("/");
            }
            setIsLoading(false);
        }

        loadEvent(id);
    }, [id]);

    return (<section className="wrapper">
        {!event && <LoaderIcon />}
        {event && <EventForm
            event={event}
            onCancel={cancelHandler}
            onSubmit={submitHandler}
            isLoading={isLoading}
        />}
    </section>

    );
};

export default EditEvent;
