import React, { Component } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';

class DashboardRoute extends Component {
  render() {
    return (
      <section>
        <Dashboard />
        <button>Start Learning</button>
      </section>
    );
  }
}

export default DashboardRoute;
