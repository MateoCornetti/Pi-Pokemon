import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './components/LandingPage/Landing'
import Home from './components/HomePage/Home';
import GlobalStyles from './components/Font/Font';
import Nav from './components/NavigationBar/Navigation'
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';

function App() {

  return (
    <div className="App">
      <Router>
        <GlobalStyles />
        <Route path={['/Home', '/Detail/:id', '/About', '/Form']} component={Nav} />
        <Route exact path='/' component={Landing} />
        <Route path="/Home" component={Home} />
        <Route path='/Detail/:id' component={Detail} />
        <Route path='/Form' component={Form} />  
      </Router>
    </div>
  );
}

export default App;