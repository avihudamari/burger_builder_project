import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Salad', type: 'salad' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)} $</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.addIngredient(ctrl.type)}
                removed={() => props.removeIngredient(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>{props.isAuth ? "ORDER NOW" : "LOG IN TO ORDER"}</button>
    </div>
);

export default buildControls;