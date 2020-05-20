import React, { Component } from 'react';
// import Main from './components/maincomponent';
import { Provider } from 'react-redux'
import { ConfigureStore } from './redux/ConfigureStore'
import { PersistGate } from 'redux-persist/es/integration/react' 
import {Loading} from './components/LoadingComponent'

import AboutUs from './components/aboutcomponent';
import ContactUs from './components/contactcomponent';
import Home from './components/homecomponent';
import Reservation from './components/Reservation';
import Practice from './components/practice';
import Login from './components/LoginComponent';


const {persistor, store} = ConfigureStore();

export default class App extends Component {
  render() {
  return (
  <Provider store={store}>
    <PersistGate 
      loading = {<Loading />}
      persistor = {persistor}>

    <Login />
    {/* <Main /> */}
    {/* <Reservation /> */}
    {/* <Practice /> */}

    </PersistGate>
  </Provider>
  );
}
}
