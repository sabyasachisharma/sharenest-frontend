// Role mapping utilities to bridge backend (tenant/landlord) and frontend routes (guest/host)

export type BackendRole = 'tenant' | 'landlord';
export type FrontendRole = 'guest' | 'host';

/**
 * Maps backend roles to frontend route roles
 */
export const mapBackendToFrontendRole = (backendRole: BackendRole): FrontendRole => {
  switch (backendRole) {
    case 'tenant':
      return 'guest';
    case 'landlord':
      return 'host';
    default:
      return 'guest';
  }
};

/**
 * Maps frontend route roles to backend roles
 */
export const mapFrontendToBackendRole = (frontendRole: FrontendRole): BackendRole => {
  switch (frontendRole) {
    case 'guest':
      return 'tenant';
    case 'host':
      return 'landlord';
    default:
      return 'tenant';
  }
};

/**
 * Gets the appropriate dashboard route for a user based on their backend role
 */
export const getDashboardRoute = (userRole: BackendRole): string => {
  const frontendRole = mapBackendToFrontendRole(userRole);
  return frontendRole === 'host' ? '/host' : '/guest';
}; 