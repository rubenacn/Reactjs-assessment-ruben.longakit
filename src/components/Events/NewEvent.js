import { useState, useContext } from 'react';
import EventForm from '../Events/EventForm';
import AuthContext from '../../store/auth';
import ErrorContent from '../Common/ErrorContent';
import { saveEvent } from '../../util/api';
import { useHistory } from 'react-router-dom';

const NewEvent = () => {
    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const cancelHandler = async (event) => {
        history.replace("/");
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        setIsLoading(true);
        try {
            await saveEvent({
                id: '',
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
        history.replace("/");
    }

    return (
        <>
            {error && <ErrorContent />}
            {!error && (
                <EventForm
                    onCancel={cancelHandler}
                    onSubmit={submitHandler}
                    isLoading={isLoading}
                />
            )}
        </>
    );
};

export default NewEvent;
