import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import Login from './pages/Login/Login/Login';
import SignUp from './pages/Login/SignUp/SignUp';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';

import Form from './pages/Form/Form';
import PrivateRoute from './ProtectedRoute/PrivateRoute/PrivateRoute';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path:"/",
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path:"/login",
      element:<Login />,index:true,    
    },
    {
      path: "/signup",
      element:<SignUp/>
    },
    {
      path: '/dashboard',
      element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
      children: [
        { element: <Navigate to="/dashboard/app" />},
        { path: 'app', 
          element: <DashboardAppPage /> },
        { path: 'form', element: <Form /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
