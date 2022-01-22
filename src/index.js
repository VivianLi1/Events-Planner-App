import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { EventContextProvider } from "./contexts/EventContext";

ReactDOM.render(
  <React.StrictMode>
    <EventContextProvider>
      <App />
    </EventContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

