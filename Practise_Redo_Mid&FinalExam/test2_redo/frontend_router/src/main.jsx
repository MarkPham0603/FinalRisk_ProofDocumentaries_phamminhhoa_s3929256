// react and react-dom
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// react router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// pages and components
import Home from './Home';
import Users, {loadUsers} from './Users'
import User, {loadUser} from './User';
import UserIndex from './UserIndex';

// styles
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/users',
    element: <Users />,
    loader: loadUsers,
    children: [
      {
        index: true,
        element: <UserIndex />,
      },
      {
        path: ':userID',
        element: <User />,
        loader: loadUser,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);