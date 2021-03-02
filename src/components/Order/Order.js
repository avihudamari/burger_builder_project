import React from 'react';
import classes from './Order.css';

const order = (props) =>{
    const ingredients = [];
    let spanClasses = [classes.Span];

    for ( let ingredientName in props.ingredients ) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }
        
    const ingredientOutput = ingredients.map(ig => {
        if ( ig.amount > 0) {
            spanClasses.push(classes[ig.name]);
            return (
                <span key={ig.name} className={spanClasses.join(' ')}>
                    {ig.name} ({ig.amount})
                </span>
            );
        }
        return null;
    });

    return (
        <div className={classes.Order}>
            <p className={classes.Ingredients}>Ingredients: {ingredientOutput}</p>
            <p className={classes.Price}>Price: <strong>{props.price} USD</strong></p>
        </div>
    );
}

export default order;