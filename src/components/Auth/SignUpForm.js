import useForm from "../Common/Forms/useForm";
import classes from './SignUpForm.module.css';
import LoaderIcon from '../Common/LoaderIcon';
import { signupForm } from "../Common/Forms/formConfig";

export default function SignUpForm({ onSubmit, isLoading }) {
    const { renderFormInputs, isFormValid } = useForm(signupForm);

    return (
        <form onSubmit={onSubmit} className={classes.signup}>
            {renderFormInputs()}
            <div className="field btn">
                <div className={`btn-layer ${!isFormValid() && "disabled"}`}></div>
                {!isLoading && <input disabled={!isFormValid()} type="submit" value='Signup' />}
                {isLoading && <center className="loader" ><LoaderIcon /></center>}
            </div>
        </form>
    );
}
