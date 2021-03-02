import React, { Component } from 'react';
import Auxiliray from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map(inKey => {
            return (
                <li key={inKey}>
                    <span style={{textTransform: "capitalize"}}>{inKey}</span>: {this.props.ingredients[inKey]}
                </li>
            );
        });

        return (
            <Auxiliray>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Price: {this.props.price.toFixed(2)} $</strong></p>
                <p>Continue to checkout?</p>
                <Button
                    btnType="Danger"
                    clicked={this.props.cancelled}>
                    CANCEL
                </Button>
                <Button
                    btnType="Success"
                    clicked={this.props.continued}>
                    CONTINUE
                </Button>
            </Auxiliray>
        );
    }
}

export default OrderSummary;