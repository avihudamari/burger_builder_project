import React, {Component} from 'react';
import Auxiliray from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }

    updatePurchaseState = () => {
        if (!this.props.ings) {
            return false;
        }
        const sum = Object.keys(this.props.ings)
            .map((inKey) => {
                return this.props.ings[inKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            });
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({purchasing: true});
        }
        else {
            this.props.history.push('/auth');
        }
    }

    purchaseCancelledHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinuedHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {...this.props.ings};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary
                            ingredients={this.props.ings}
                            cancelled={this.purchaseCancelledHandler}
                            continued={this.purchaseContinuedHandler}
                            price={this.props.price}/>;
        
        const burger = (
            <Auxiliray>
                <Burger ingredients={this.props.ings}/>
                <BuildControls
                    addIngredient={this.props.onIngredientAdded}
                    removeIngredient={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchasable={this.updatePurchaseState()}
                    ordered={this.purchaseHandler}
                    isAuth={this.props.isAuth}/>
            </Auxiliray>
        );

        return (
            <Auxiliray>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelledHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliray>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        isAuth: state.auth.idToken !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(action.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(action.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(action.initIngredients())  
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);