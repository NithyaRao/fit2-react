/* eslint-disable max-len, arrow-body-style, no-underscore-dangle,react/no-string-refs,react/self-closing-comp,camelcase */
/* global localStorage */

import React from 'react';
import axios from 'axios';
import Run from './Run';

export default class Runs extends React.Component {
  constructor(props) {
    super(props);
    const authorization = localStorage.getItem('token');
    this.state = { authorization, devices: [] };
    this.refresh = this.refresh.bind(this);
    this.create = this.create.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    axios.get('http://localhost:9001/api/devices', { headers: { authorization: this.state.authorization } })
    .then(res => {
      this.setState({ devices: res.data });
    });
  }

  create(e) {
    e.preventDefault();
    const serial_id = this.refs.serial_id.value;
    const product = this.refs.product.value;
    const category = this.refs.category.value;
    axios.post('http://localhost:9001/api/devices', { serial_id, product, category }, { headers: { authorization: this.state.authorization } })
    .then(() => {
      this.refresh();
    });
  }

  render() {
    return (
      <div>
        <h1>Runs</h1>
        <div className="row">
          <div className="col-xs-3" />
          <div className="col-xs-9">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Start</th>
                  <th>Stop</th>
                </tr>
              </thead>
                {this.state.devices.map(e =>
                  <Run key={e.id} device={e} />
                )}
            </table>
          </div>
        </div>
      </div>
    );
  }
}
