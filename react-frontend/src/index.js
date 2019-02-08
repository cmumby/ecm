//index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore } from 'redux';
import {Header} from "./components/Header";
import AddTodo from './components/AddTodo';
import ListCase from './components/ListCase';
import UpdateTodo from './components/UpdateTodo';
import Case from './components/Case';
import CaseMenu from './components/CaseMenu';
import reducer from './store/reducers/reducer';
import { Provider } from 'react-redux';

let currentLocation = document.location.href;
let mainSize = (currentLocation.indexOf('/requirements') >=0)?'col-md-10': 'col-md-12';
mainSize += ' col-xs-12';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
  <div className="box-header ui-sortable-handle">
    <div className="row">
      <div className="col-xs-12">
        <Header/>
      </div>
    </div>
    <div className="row">
      <Router>
        <div className="col-md-2 col-xs-12">
          <Route path='/case/:ecmId/requirements' component={CaseMenu} />
        </div>
      </Router>
      <Router>
      <div className={mainSize}>
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
  </Provider>
,
  document.getElementById('root')
);