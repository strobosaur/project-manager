import { BrowserRouter, Route, Switch } from 'react-router-dom';

// PAGES
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Project from './pages/project/Project';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// CSS STYLES
import './App.css';

// MAIN APP
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Sidebar />
      <div className="container">
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Dashboard />
          </Route>
          <Route path='/create'>
            <Create />
          </Route>
          <Route path='/projects/:id'>
            <Project />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>

    </div>
  );
}

export default App;
