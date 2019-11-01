import React from 'react';
import './App.css';
import StudentList from './StudentList';
import Home from './Home';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Router>
        {/* <div>
          <ul>
            <li>
              <Link to='/students'>Student List</Link>
            </li>
            <li>
              <Link to='/'>Home</Link>
            </li>
          </ul>
        </div> */}
        <Switch>
          <Route exact path='/hello' component={Home} />
          <Route path='/hello/students' component={StudentList} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

function NotFound() {
  return <h1>Hey not found!</h1>;
}

export default App;
