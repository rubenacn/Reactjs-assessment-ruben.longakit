import useForm from "../Common/Forms/useForm";
import classes from './EventForm.module.css';
import LoaderIcon from '../Common/LoaderIcon';
import { eventForm } from "../Common/Forms/formConfig";

export default function EventForm({ event, onSubmit, onCancel, isLoading }) {
  const { renderFormInputs, isFormValid } = useForm(eventForm(event), event ? true : false);

  return (
    <div className={classes.wrapper}>
      <div className={classes['title-text']}>
        <div className={classes.title}>
          {event && 'Edit Event'}
          {!event && 'New Event'}
          
        </div>
      </div>
      <div className={classes['form-container']}>
        <form onSubmit={onSubmit}>
          {renderFormInputs()}
          <div className="field btn">
            <div className={`btn-layer ${!isFormValid() && "disabled"}`}></div>
            {!isLoading && <input disabled={!isFormValid()} type="submit" value='Save' />}
            {isLoading && <center className="loader" ><LoaderIcon /></center>}
          </div>
          <div className="field btn">
            <div className={`btn-layer secondary`}></div>
            {!isLoading && <button onClick={onCancel} className="primary-btn">Cancel</button>}
            {isLoading && <center className="loader" ><LoaderIcon /></center>}
          </div>
        </form>
      </div>
    </div>
  );
}
