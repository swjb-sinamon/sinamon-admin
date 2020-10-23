import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import PermissionRoute from './utils/Route/PermissionRoute';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PermissionRoute
          exact
          path="/"
          success={MainPage}
          failure={() => <Redirect to="/login" />}
        />
        <PermissionRoute
          exact
          path="/login"
          success={() => <Redirect to="/" />}
          failure={LoginPage}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
