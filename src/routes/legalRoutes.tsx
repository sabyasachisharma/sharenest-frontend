import { RouteObject } from 'react-router-dom';
import PrivacyPolicy from '../pages/legal/PrivacyPolicy';
import TermsOfService from '../pages/legal/TermsOfService';
import CookiePolicy from '../pages/legal/CookiePolicy';

export const legalRoutes: RouteObject[] = [
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/terms-of-service',
    element: <TermsOfService />,
  },
  {
    path: '/cookie-policy',
    element: <CookiePolicy />,
  },
]; 