import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class AdminSubNav extends Component {
  render() {
    return (
      <div className="admin-sub-nav">
        <ul>
          <li>
            <NavLink to="/admin/orders" activeClassName="active">Orders</NavLink>
          </li>
          <li>
            <NavLink to="/admin/products" activeClassName="active">Products</NavLink>
          </li>
          <li>
            <NavLink to="/admin/categories" activeClassName="active">Categories</NavLink>
          </li>
          <li>
            <NavLink to="/admin/queries" activeClassName="active">Queries</NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" activeClassName="active">Users</NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default AdminSubNav;
