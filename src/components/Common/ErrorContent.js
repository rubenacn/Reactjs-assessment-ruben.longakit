import classes from './ErrorContent.module.css';
import { Link } from 'react-router-dom';

function ErrorContent() {
    return (
        <div className={classes.error_wrapper}>
            <h3>Error loading page...</h3>
            <Link to={"/"} className={classes.btn}>Return Home</Link>
        </div>
    );
}

export default ErrorContent;