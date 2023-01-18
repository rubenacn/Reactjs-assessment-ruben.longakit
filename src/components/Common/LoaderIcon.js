import classes from './LoaderIcon.module.css';

function LoaderIcon() {
    return (
        <div className={classes.wrapper}><div className={classes['lds-ellipsis']}><div></div><div></div><div></div><div></div></div></div>
    );
}

export default LoaderIcon;