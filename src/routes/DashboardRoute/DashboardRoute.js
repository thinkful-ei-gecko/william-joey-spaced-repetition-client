import React, { Component } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import {Link} from 'react-router-dom';
import Button from '../../components/Button/Button';
import './DashboardRoute.css';

class DashboardRoute extends Component {
  render() {
    return (
      <section className="dashboard-section">
        <Dashboard />
        <Button>
          <Link to='/learn'>
          Start Learning
          </Link>
        </Button>
      </section>
    );
  }
}

export default DashboardRoute;
