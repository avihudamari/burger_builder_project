import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { checkValidity } from '../../../shared/utillity';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                displayValue: 'Name'
            },
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Your Email',
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
            phoneNumber: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Phone Number',
                },
                value: '',
                validation: {
                    required: true,
                    phoneValidation: true
                },
                valid: false,
                touched: false,
                displayValue: 'Phone Number'
            },
            address: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Adrress',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                displayValue: 'Address'
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'cheapest', displayValue:'Cheapest'},
                        {value: 'fastest', displayValue:'Fastest'}
                    ]
                },
                value: 'cheapest',
                validation: {},
                valid: true
            },
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let elementIdentifier in this.state.orderForm) {
            formData[elementIdentifier] = this.state.orderForm[elementIdentifier].value;
        }
        const order = {
            userId: this.props.userId,
            ingredients: this.props.ings,
            price: this.props.price.toFixed(2),
            customerData: formData
        }
        axios.post('/orders.json?auth=' + this.props.token, order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false});
            console.log(error);
        });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updateOrderForm = {...this.state.orderForm};
        const updateOrderElement = {...updateOrderForm[inputIdentifier]};
        updateOrderElement.value = event.target.value;
        updateOrderElement.valid = checkValidity(updateOrderElement.value, updateOrderElement.validation);
        updateOrderElement.touched = true;
        updateOrderForm[inputIdentifier] = updateOrderElement;
        
        let formIsValid = true;
        for (let element in updateOrderForm) {
            formIsValid = updateOrderForm[element].valid && formIsValid;
        }
        
        this.setState({orderForm: updateOrderForm, formIsValid: formIsValid});
    }

    render() {
        let orderFormArray = [];
        for (let element in this.state.orderForm) {
            orderFormArray.push({
                id: element,
                config: this.state.orderForm[element]
            });
        }
        let form = (           
            <form onSubmit={this.orderHandler}>
                {orderFormArray.map(element => {
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
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner/>
        }

        return (                            
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data:</h4>
                {form}
            </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(withErrorHandler(ContactData, axios));