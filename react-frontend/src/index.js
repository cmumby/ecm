//index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import {Header} from "./components/Header";

import AddTodo from './components/AddTodo';
import ListCase from './components/ListCase';
//import ListCase from './components/ListCase';
import UpdateTodo from './components/UpdateTodo';
import Case from './components/Case';


import './index.css';

ReactDOM.render(
  <div className="box-header ui-sortable-handle">
    <div className="row">
      <div className="col-xs-12">
        <Header/>
      </div>
    </div>
    <div>
      <Router>
      <div>
      <Route path='/add' component={AddTodo} />
      <Route path='/cases' component={AddTodo} />
      <Route exact path='/' component={ListCase} />
      <Route path='/update/:id' component={UpdateTodo} />
      <Route path='/case/:ecmId/requirements' component={Case} />
      </div>
      </Router>
    </div>
    <div>

    </div>
  </div>
,
  document.getElementById('root')
);
