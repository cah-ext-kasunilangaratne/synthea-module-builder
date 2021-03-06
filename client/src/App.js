// @flow
import React from 'react';
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { ConnectedRouter} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import createAppStore from './store';
import Editor from './containers/Editor/Editor';
import LogIn from './containers/Login/Login'
import { openModule } from './actions/router';
import { ProtectedRoute } from './containers/Login/Protected.Route'

const history = createHistory();

const store = createAppStore(history);

const App = () => {
  return (
    <Router>
      <div>
      <Switch>  
      <Route path="/login" component={LogIn}/>  
      
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <ProtectedRoute exact path="/" component={Editor} />          
          </ConnectedRouter>
        </Provider>
      </Switch>
      
      </div>
      
    </Router>
      
      
  );
};


// Intercept location change (hash changes) and send to a custom event
// This allows us to pull data from the read-only library

const dispatchLocationChange = location => {
  if(history.location.hash.charAt(0) === '#'){
    store.dispatch(openModule(history.location.hash.slice(1)));
  }
};

history.listen(dispatchLocationChange);

dispatchLocationChange(history.location);


export default App;
