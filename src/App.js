import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Movies from './components/movies';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import Customers from './components/customers';
import NavBar from './components/navbar';
import MovieForm from './components/movieForm';

import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
