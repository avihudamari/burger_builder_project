import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class checkout extends Component {
    cancelledHandler = () => {
        this.props.history.goBack();
    }

    continuedHandler = () => {
        this.props.history.replace(this.props.match.path + '/content-data');
    }
    
    render() {
        let summery = (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    cancelled={this.cancelledHandler}
                    continued={this.continuedHandler}/>
                <Route
                    path={this.props.match.path + '/content-data'}
                    component={ContactData}/>
            </div>
        );

        let ingredientsArray = Object.keys(this.props.ings)
        .map(igKey => {
            return [...Array( this.props.ings[igKey])]
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

        if (ingredientsArray.length === 0) {
            summery = <Redirect to='/'/>;
        }

        return summery;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients
    }
}

export default connect(mapStateToProps)(checkout);