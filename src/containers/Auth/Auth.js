import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utillity';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'mail',
                    placeholder: 'Email Address',
                },
                value: '',
                validation: {
                    required: true,
                    emailValidation: true
                },
                valid: false,
                touched: false,
                displayValue: 'Email'
            },
            password: {
                elementType: 'input',
                elementConfig:{
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                displayValue: 'Password (minimum 6 characters)'
            }
        },
        isSignup: false
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updateControls = {
            ...this.state.controls,
            [inputIdentifier]: {
                ...this.state.controls[inputIdentifier],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[inputIdentifier].validation),
                touched: true
            }
        };
        this.setState({controls: updateControls});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevStste => {
            return {isSignup: !prevStste.isSignup}
        });
    }

    render() {
        let controlsFormArray = [];
        for (let element in this.state.controls) {
            controlsFormArray.push({
                id: element,
                config: this.state.controls[element]
            });
        }
        let title = <div className={classes.Title}>Sign Up</div>;
        
        if (!this.state.isSignup) {
            title = <div className={classes.Title}>Sign In</div>
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = <p className={classes.ErrorMessage}>{this.props.error.message}</p>
        }

        let form = (           
            <form onSubmit={this.onSubmitHandler}>
                {controlsFormArray.map(element => {
                    return(
                        <Input
                            key={element.id}
                            displayValue={element.config.displayValue}
                            elementType={element.config.elementType}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            valid = {element.config.valid}
                            touched = {element.config.touched}
                            changed={(event)=> this.inputChangedHandler(event, element.id)} />
                    )
                })}
                {errorMessage}
                <Button btnType='Success'>Submit</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner/>
        }

        let redirectIfAuth = null;
        if (this.props.isAuth) {
            if (this.props.building) {
                redirectIfAuth = <Redirect to='/checkout'/>
            }
            else {
                redirectIfAuth = <Redirect to='/'/>
            }
        }

        return (
            <div className={classes.Auth}>
                {redirectIfAuth}
                {title}
                {form}
                <Button btnType='Danger' clicked={this.switchAuthModeHandler}>Switch to {this.state.isSignup ? "Sign In" : "Sign Up"}</Button>            
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.idToken !== null,
        building: state.burgerBuilder.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);