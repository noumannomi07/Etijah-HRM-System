import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoles, useUser } from '@/contexts';
import { Loading, NoPermission } from '@/components';

const withPermissions = (Component, page, config = {}) => {
	const { isComponent = false, isView = true, isEdit = false, isAdd = false } = config;
	return function WithPermissionsWrapper(props) {
		const navigate = useNavigate();
		const { userRoles, loading } = useRoles();

		const permissions = useMemo(() => ({
			create: userRoles?.permissions?.some(role => role === `${page}-create`) || true,
			read: userRoles?.permissions?.some(role => role === `${page}-read`) || true,
			update: userRoles?.permissions?.some(role => role === `${page}-update`) || true,
			delete: userRoles?.permissions?.some(role => role === `${page}-delete`) || true,
		}), [userRoles, page]);

		if (loading) {
			return <Loading />;
		}


		if (!isComponent) {
			if (!permissions?.read && isView) {
				return <NoPermission />;
			}
			if (!permissions?.create && isAdd) {
				return <NoPermission />;
			}
			if ((!permissions?.update && isEdit)) {
				return <NoPermission />;
			}

		}


		return <Component {...props} permissions={permissions} />;
	};
};

export default withPermissions;
