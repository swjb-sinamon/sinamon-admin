import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import PermissionRoute from './utils/Route/PermissionRoute';
import PermissionPage from './pages/PermissionPage';
import UmbrellaPage from './pages/UmbrellaPage';
import UmbrellaManagePage from './pages/UmbrellaManagePage';
import CodePage from './pages/CodePage';
import UserPage from './pages/UserPage';
import ContestPage from './pages/ContestPage';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PermissionRoute
          exact
          path="/"
          success={MainPage}
          failure={() => <Redirect to="/login" />}
          permissions={['admin', 'teacher', 'schoolunion']}
        />
        <PermissionRoute
          exact
          path="/umbrella"
          success={UmbrellaPage}
          failure={PermissionPage}
          permissions={['admin', 'teacher', 'schoolunion']}
        />
        <PermissionRoute
          exact
          path="/umbrella/manage"
          success={UmbrellaManagePage}
          failure={PermissionPage}
          permissions={['admin', 'teacher', 'schoolunion']}
        />
        <PermissionRoute
          exact
          path="/contest"
          success={ContestPage}
          failure={PermissionPage}
          permissions={['admin', 'teacher', 'schoolunion']}
        />
        <PermissionRoute
          exact
          path="/code"
          success={CodePage}
          failure={PermissionPage}
          permissions={['admin', 'teacher']}
        />
        <PermissionRoute
          exact
          path="/user"
          success={UserPage}
          failure={PermissionPage}
          permissions={['admin', 'teacher']}
        />
        <PermissionRoute
          exact
          path="/login"
          success={() => <Redirect to="/" />}
          failure={LoginPage}
          permissions={['admin', 'teacher', 'schoolunion']}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
