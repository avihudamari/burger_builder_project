import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const navigationItems = (props) => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link='/' exact active>Burger Builder</NavigationItem>
			{props.isAuth ?
				<Auxiliary>
					<NavigationItem link='/orders'>Orders</NavigationItem>
					<NavigationItem link='/logout'>Logout</NavigationItem>	
				</Auxiliary>
				:
				<NavigationItem link='/auth'>Login</NavigationItem>
			}
		</ul>
	);   
}

export default navigationItems;