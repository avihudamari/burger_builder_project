import React, { Component} from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';


class Layout extends Component {
    state = {
        sideDrawerShown: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({sideDrawerShown: false});
    }

    drawerToggleHandler = () => {
        this.setState((prevState)=> {
            return {sideDrawerShown: !prevState.sideDrawerShown};
        });
    }

    render () {
        return (
            <Auxiliary>
                <Toolbar
                    isAuth={this.props.isAuth}
                    drawerToggleClicked={this.drawerToggleHandler}/>
                <SideDrawer
                    isAuth={this.props.isAuth}
                    show={this.state.sideDrawerShown}
                    sideDrawerClosed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.idToken !== null
    }
}

export default connect(mapStateToProps)(Layout);