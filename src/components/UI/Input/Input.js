import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];
    let validationError = null;

    if (!props.valid && props.touched) {
        inputClasses.push(classes.InputInvalid);
        validationError = <p className={classes.ValidationError}>Please enter a valid {props.displayValue}</p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option =>{
                        return (
                            <option
                                key={option.value}
                                value={option.value}
                                >{option.displayValue}
                            </option>
                        );
                    })}
                </select>
            );
            break;
        default:
            inputElement =
            <input className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />;
            break;
    }
    return(
        <div className={classes.Input}>
           <label className={classes.label}>{props.label}</label>
           {inputElement}
           {validationError}
        </div>
    );
}

export default input;