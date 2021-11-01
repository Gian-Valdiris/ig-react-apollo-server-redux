import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import { map } from 'lodash';

export default function AppRouter() {
  return (
    <div>
      <Router>
        <Switch>
          {map(routes, ({Layout,Component,...rest}, index) => (
            <Route
              key={index}
              {...rest}
             render={(props)=>(<Layout><Component {...props}/></Layout>)}
            />
          ))}
        </Switch>
      </Router>
    </div>
  );
}
