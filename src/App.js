import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent'; 

const asyncOrders = asyncComponent(()=> {
  return import('./containers/Orders/Orders');
});

const asyncCheckout = asyncComponent(()=> {
  return import('./containers/Checkout/Checkout');
});

const asyncAuth = asyncComponent(()=> {
  return import('./containers/Auth/Auth');
});

const asyncLogout = asyncComponent(()=> {
  return import('./containers/Auth/Logout/Logout');
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render() {   
    let routs = (
      <Switch>
        <Route path='/auth' component={asyncAuth}/>
        <Route path='/' component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>
      );
    
    if (this.props.isAuth) {
      routs = (
        <Switch>
          <Route path='/auth' component={asyncAuth}/>
          <Route path='/checkout' component={asyncCheckout}/>
          <Route path='/logout' component={asyncLogout}/>
          <Route path='/orders' component={asyncOrders}/>
          <Route path='/' component={BurgerBuilder}/>
          <Redirect to='/'/>
        </Switch>
      );
    }
    return (
      <Layout>       
        {routs}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.idToken !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: ()=> dispatch(actions.authCheck())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);