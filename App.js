import React, { Component } from 'react';
import AboutUs from './components/aboutcomponent';
import ContactUs from './components/contactcomponent';
// import Main from './components/maincomponent';
import { Provider } from 'react-redux'
import { ConfigureStore } from './redux/ConfigureStore'
import Home from './components/homecomponent';
import Reservation from './components/Reservation';
import Practice from './components/practice';


const store = ConfigureStore();

export default class App extends Component {
  render() {
  return (
  <Provider store={store}>
    <AboutUs />
    {/* <Main /> */}
    {/* <Reservation /> */}
    {/* <Practice /> */}
  </Provider>
  );
}
}
