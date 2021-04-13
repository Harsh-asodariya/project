import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
// import LoginScreen from './LoginScreen/Login/loginScreen';
import Campaigns from './Campaigns/campaigns';
import Order from './Order/order';
import Advertiser from './Advertiser/advertiser';
// import signUpScreen from './LoginScreen/SignUp/signUpScreen';
// import Auth from './Auth/auth';
// import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Dashboard from './Dashboard/dashboard';
import { connect } from 'react-redux';
import Login from './LoginScreen/Login/login';
import ChangePassword from './ChangePassword/changePassword';
import VideosInProduction from './VideosInProduction/videosInProduction';

import CampaignDetail from './CampaignDetail/campaignDetail';
// import * as actions from './Store/Actions/auth';
// import AddNewAdvertiser from './Forms/AddNewAdvertiser/addNewAdvertiser'
// import AddNewOrder from './Forms/AddNewOrder/addNewOrder';
// import AddAssets from './Forms/AddAssets/addAssets';

const App = (props) => {
  // let carOptions = [
  //   { value: 'tesla', label: 'Tesla' },
  //   { value: 'lamborgini', label: 'Lamborgini' },
  //   { value: 'jaguar', label: 'Jaguar' },
  //   { value: 'fortuner', label: 'Fortuner' }
  // ]
  let routes = (
    <Switch>
      <Route path='/login' render={() => <Login />} />
      <Redirect to='/login' />
    </Switch>
  )
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/campaigns' exact component={Campaigns} />
        <Route path='/advertiser' exact component={Advertiser} />
        <Route path='/order' exact component={Order} />
        <Route path='/changePassword' exact component={ChangePassword} />
        <Route path='/videosinproduction' exact component={VideosInProduction} />
        <Route path='/campaigndetail/:id' component={CampaignDetail}/>
        {/* <Route path='/signup' component={signUpScreen} /> */}
        <Redirect to='/dashboard' />
      </Switch>)
  }

  return (
    <div>
      {routes}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.authenticated
  }
}

// const mapDispatchToProps = dispatch => {
//   return{
//     loginSuccessHandler : () => dispatch(actions.loginSuccessHandler)
//   }
// }
export default connect(mapStateToProps)(withRouter(App));
