import useForm from "../Common/Forms/useForm";
import classes from './SignInForm.module.css';
import { signinForm } from "../Common/Forms/formConfig";
import LoaderIcon from '../Common/LoaderIcon';

function SignInForm({ onSignUpClick, onSubmit, isLoading }) {
    const { renderFormInputs, isFormValid } = useForm(signinForm);
    return (
        <form onSubmit={onSubmit} className={classes.login}>
            {renderFormInputs()}
            <div className="btn">
                <div className="btn-layer"></div>
                {!isLoading && <input disabled={isLoading} type="submit" value='Login' />}
                {isLoading && <center className="loader" ><LoaderIcon /></center>}
            </div>
            <div className={classes['signup-link']}>
                Not a member? <a onClick={onSignUpClick}>Signup now</a>
            </div>
        </form>
    );
}

export default SignInForm;
