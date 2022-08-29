import Permissions from 'src/security/permissions';
import config from 'src/config';
const permissions = Permissions.values;

const privateRoutes = [
  {
    path: '/',
    i18n: 'dashboard.menu',
    loader: () =>
      import('src/view/dashboard/DashboardPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/report',
    collapseName: 'reports',
    i18n: 'collapses.reports.menu',
    parent: '/',
    redirect: '/report/tasks-by-month',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/person-name-breadcrumb',
    collapseName: 'my-profile',
    // labelCode: '{USER_TEXT}',
    i18n: 'roles.admin.label',
    parent: '/',
    redirect: '/profile',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/profile',
    collapseName: 'my-profile',
    i18n: 'auth.profile.title',
    parent: '/person-name-breadcrumb',
    loader: () => import('src/view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/password-change',
    collapseName: 'my-profile',
    i18n: 'auth.passwordChange.title',
    parent: '/person-name-breadcrumb',
    loader: () =>
      import('src/view/auth/PasswordChangeFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/tenant',
    collapseName: 'my-profile',
    i18n: 'tenant.list.title',
    parent: '/person-name-breadcrumb',
    loader: () =>
      import('src/view/tenant/list/TenantListPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/tenant/new',
    collapseName: 'my-profile',
    i18n: 'tenant.new.title',
    parent: '/tenant',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/tenant/:id/edit',
    collapseName: 'my-profile',
    i18n: 'tenant.edit.title',
    parent: '/tenant',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: null,
    exact: true,
  },

  config.isPlanEnabled && {
    path: '/plan',
    i18n: 'plan.title',
    collapseName: 'my-profile',
    parent: '/person-name-breadcrumb',
    loader: () => import('src/view/plan/PlanPage'),
    permissionRequired: permissions.planRead,
    exact: true,
  },

  {
    path: '/user',
    i18n: 'user.menu',
    parent: '/',
    loader: () => import('src/view/user/list/UserPage'),
    permissionRequired: permissions.userRead,
    exact: true,
  },

  {
    path: '/user/new',
    i18n: 'user.new.title',
    parent: '/user',
    loader: () => import('src/view/user/new/UserNewPage'),
    permissionRequired: permissions.userCreate,
    exact: true,
  },

  {
    path: '/user/importer',
    i18n: 'user.importer.title',
    parent: '/user',
    loader: () =>
      import('src/view/user/importer/UserImporterPage'),
    permissionRequired: permissions.userImport,
    exact: true,
  },

  {
    path: '/user/:id/edit',
    i18n: 'user.edit.title',
    parent: '/user',
    loader: () => import('src/view/user/edit/UserEditPage'),
    permissionRequired: permissions.userEdit,
    exact: true,
  },

  {
    path: '/user/:id',
    i18n: 'user.view.title',
    parent: '/user',
    loader: () => import('src/view/user/view/UserViewPage'),
    permissionRequired: permissions.userRead,
    exact: true,
  },

  {
    path: '/settings-breadcrumb',
    collapseName: 'settings',
    i18n: 'settings.title',
    parent: '/',
    redirect: '/settings',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/audit-logs',
    collapseName: 'settings',
    i18n: 'auditLog.menu',
    parent: '/settings-breadcrumb',
    loader: () => import('src/view/auditLog/AuditLogPage'),
    permissionRequired: permissions.auditLogRead,
  },

  {
    path: '/settings',
    collapseName: 'settings',
    i18n: 'settings.tenant',
    parent: '/settings-breadcrumb',
    loader: () =>
      import('src/view/settings/SettingsFormPage'),
    permissionRequired: permissions.settingsEdit,
  },

  /**
   * ! Routes Collapse
   */
  {
    path: '/routes',
    collapseName: 'routes',
    i18n: 'collapses.routes.menu',
    parent: '/',
    redirect: '/navigation',
    permissionRequired: null,
    virtual: true,
  },

  /**
   * !! Navigation routes start
   */
  {
    path: '/navigation',
    collapseName: 'routes',
    i18n: 'entities.navigation.menu',
    parent: '/routes',
    loader: () =>
      import('src/view/navigation/list/NavigationListPage'),
    permissionRequired: permissions.navigationRead,
    exact: true,
  },

  {
    path: '/navigation/new',
    collapseName: 'routes',
    i18n: 'entities.navigation.new.title',
    parent: '/navigation',
    loader: () =>
      import('src/view/navigation/form/NavigationFormPage'),
    permissionRequired: permissions.navigationCreate,
    exact: true,
  },

  {
    path: '/navigation/importer',
    collapseName: 'routes',
    i18n: 'entities.navigation.importer.title',
    parent: '/navigation',
    loader: () =>
      import(
        'src/view/navigation/importer/NavigationImporterPage'
      ),
    permissionRequired: permissions.navigationImport,
    exact: true,
  },

  {
    path: '/navigation/:id/edit',
    collapseName: 'routes',
    i18n: 'entities.navigation.edit.title',
    parent: '/navigation',
    loader: () =>
      import('src/view/navigation/form/NavigationFormPage'),
    permissionRequired: permissions.navigationEdit,
    exact: true,
  },

  {
    path: '/navigation/:id',
    collapseName: 'routes',
    i18n: 'entities.navigation.view.title',
    parent: '/navigation',
    loader: () =>
      import('src/view/navigation/view/NavigationViewPage'),
    permissionRequired: permissions.navigationRead,
    exact: true,
  },
  /**
   * !! Navigation routes end
   */

  /**
   * !! Category routes start
   */
  {
    path: '/category',
    collapseName: 'routes',
    i18n: 'entities.category.menu',
    parent: '/routes',
    loader: () =>
      import('src/view/category/list/CategoryListPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: '/category/new',
    collapseName: 'routes',
    i18n: 'entities.category.new.title',
    parent: '/category',
    loader: () =>
      import('src/view/category/form/CategoryFormPage'),
    permissionRequired: permissions.categoryCreate,
    exact: true,
  },

  {
    path: '/category/importer',
    collapseName: 'routes',
    i18n: 'entities.category.importer.title',
    parent: '/category',
    loader: () =>
      import(
        'src/view/category/importer/CategoryImporterPage'
      ),
    permissionRequired: permissions.categoryImport,
    exact: true,
  },

  {
    path: '/category/:id/edit',
    collapseName: 'routes',
    i18n: 'entities.category.edit.title',
    parent: '/category',
    loader: () =>
      import('src/view/category/form/CategoryFormPage'),
    permissionRequired: permissions.categoryEdit,
    exact: true,
  },

  {
    path: '/category/:id',
    collapseName: 'routes',
    i18n: 'entities.category.view.title',
    parent: '/category',
    loader: () =>
      import('src/view/category/view/CategoryViewPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  /**
   * !! Category routes end
   */
].filter(Boolean);

const publicRoutes = [
  {
    path: '/auth/signin',
    loader: () => import('src/view/auth/SigninPage'),
  },
  {
    path: '/auth/signup',
    loader: () => import('src/view/auth/SignupPage'),
  },
  {
    path: '/auth/forgot-password',
    loader: () =>
      import('src/view/auth/ForgotPasswordPage'),
  },
].filter(Boolean);

const emptyTenantRoutes = [
  {
    path: '/auth/tenant',
    loader: () => import('src/view/auth/TenantPage'),
  },
].filter(Boolean);

const emptyPermissionsRoutes = [
  {
    path: '/auth/empty-permissions',
    loader: () =>
      import('src/view/auth/EmptyPermissionsPage'),
  },
].filter(Boolean);

const emailUnverifiedRoutes = [
  {
    path: '/auth/email-unverified',
    loader: () =>
      import('src/view/auth/EmailUnverifiedPage'),
  },
].filter(Boolean);

const simpleRoutes = [
  {
    path: '/auth/password-reset',
    loader: () => import('src/view/auth/PasswordResetPage'),
  },
  {
    path: '/auth/invitation',
    loader: () => import('src/view/auth/InvitationPage'),
  },
  {
    path: '/auth/verify-email',
    loader: () => import('src/view/auth/VerifyEmailPage'),
  },
  {
    path: '/403',
    loader: () =>
      import('src/view/shared/errors/Error403Page'),
  },
  {
    path: '/500',
    loader: () =>
      import('src/view/shared/errors/Error500Page'),
  },
  {
    path: '**',
    loader: () =>
      import('src/view/shared/errors/Error404Page'),
  },
].filter(Boolean);

export default {
  privateRoutes,
  publicRoutes,
  emptyTenantRoutes,
  emptyPermissionsRoutes,
  emailUnverifiedRoutes,
  simpleRoutes,
};

export function findRoute(url = null, routes = []) {
  return (
    !!url &&
    (routes.find((route) => url === route.path) ||
      routes.find(
        (route) =>
          /\/:[\w\d_-]+/g.test(route.path) &&
          new RegExp(
            `^${route.path.replace(
              /:[\w\d_-]+/g,
              '[\\w\\d]+',
            )}$`,
          ).test(url),
      ))
  );
}

export function matchedRoutes(
  url = null,
  exactOnly = false,
) {
  if (url === null || url === undefined) {
    return null;
  }

  let routes = [];

  const searchRouteStack = (url, exactOnly) => {
    const found = findRoute(url, privateRoutes);

    if (exactOnly === true) {
      return found;
    }

    if (found) {
      routes.push(found);
      if (found.parent && found.parent !== '/') {
        return searchRouteStack(found.parent, exactOnly);
      }
    }

    routes.reverse();

    return routes;
  };

  return searchRouteStack(url, exactOnly);
}
