import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'active' : ''
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? 'active' : ''
            }
          >
            Customers
          </NavLink>
        </li>        
      </ul>
    </nav>
  )
}
