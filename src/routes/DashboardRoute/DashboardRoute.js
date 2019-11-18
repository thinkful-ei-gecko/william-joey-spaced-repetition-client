import React, { Component } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import Button from '../../components/Button/Button';
import './DashboardRoute.css';

class DashboardRoute extends Component {
  render() {
    return (
      <section className="dashboard-section">
        <Dashboard />
        <Button>Start Learning</Button>
      </section>
    );
  }
}

export default DashboardRoute;
