import React from 'react';
import { Route } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile';

type Permission = 'admin' | 'teacher' | 'schoolunion';

interface PermissionRouteProps {
  path: string | string[];
  exact?: boolean;
  success: React.ComponentType<any>;
  failure: React.ComponentType<any>;
  permissions: Permission[];
}

const PermissionRoute: React.FC<PermissionRouteProps> = ({
  path,
  exact,
  success: Success,
  failure: Failure,
  permissions
}) => {
  const profile = useProfile();

  const SuccessRoute = () => <Route exact={exact} path={path} component={Success} />;
  const FailureRoute = () => <Route exact={exact} path={path} component={Failure} />;

  if (!profile) return <FailureRoute />;

  const myPermission: Permission[] = [];
  if (profile.permission.isAdmin) myPermission.push('admin');
  if (profile.permission.isTeacher) myPermission.push('teacher');
  if (profile.permission.isSchoolUnion) myPermission.push('schoolunion');

  const able = myPermission.some((v) => permissions.includes(v));

  return able ? <SuccessRoute /> : <FailureRoute />;
};

export default PermissionRoute;
