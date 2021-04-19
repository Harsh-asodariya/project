import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import Campaigns from './Campaigns/campaigns';
import Order from './Order/order';
import Advertiser from './Advertiser/advertiser';
import { Redirect } from 'react-router-dom';
import Dashboard from './Dashboard/dashboard';
import { connect } from 'react-redux';
import Login from './LoginScreen/Login/login';
import ChangePassword from './ChangePassword/changePassword';
import VideosInProduction from './VideosInProduction/videosInProduction';
import * as actions from './Store/Actions/auth';

import CampaignDetail from './CampaignDetail/campaignDetail';
import { useEffect } from 'react';

const App = (props) => {

  useEffect(() => {
    if(localStorage.getItem('token')){
      let token = localStorage.getItem('token')
      let personData = JSON.parse(localStorage.getItem('personData'))
      props.loginSuccessHandler(token, personData)
    }
  },[])

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

const mapDispatchToProps = dispatch => {
  return{
    loginSuccessHandler : (token,personData) => dispatch(actions.loginSuccessHandler(token, personData))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
