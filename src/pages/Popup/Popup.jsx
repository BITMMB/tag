import React from 'react';
import logo from '../../assets/svg/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {
  return (
    <div className="App">
      This is extension for the Adv Tags. Open the developer tools, and "Tag
      Tool" tab will appear to the right.
    </div>
  );
};

export default Popup;
