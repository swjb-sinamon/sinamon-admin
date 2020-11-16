import React from 'react';
import { Route } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile';

interface PermissionRouteProps {
  path: string | string[];
  exact?: boolean;
  success: React.ComponentType<any>;
  failure: React.ComponentType<any>;
}

const PermissionRoute: React.FC<PermissionRouteProps> = ({
  path,
  exact,
  success: Success,
  failure: Failure
}) => {
  const profile = useProfile();

  const SuccessRoute = () => <Route exact={exact} path={path} component={Success} />;
  const FailureRoute = () => <Route exact={exact} path={path} component={Failure} />;

  if (!profile) return <FailureRoute />;

  const able =
    profile.permission.isAdmin || profile.permission.isTeacher || profile.permission.isSchoolUnion;

  return able ? <SuccessRoute /> : <FailureRoute />;
};

export default PermissionRoute;
