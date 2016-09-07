/* eslint-disable max-len, arrow-body-style, no-underscore-dangle,react/no-string-refs,react/self-closing-comp,camelcase */
/* global localStorage */

import React from 'react';
import axios from 'axios';

export default class Devices extends React.Component {
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

        <h1>Devices</h1>

        <div className="row">
          <div className="col-xs-3">
            <form>
              <div className="form-group">
                <label htmlFor="serial_id">Serial Id</label>
                <input ref="serial_id" type="text" className="form-control" id="serial_id" />
              </div>

              <div className="form-group">
                <label htmlFor="product">Product</label>
                <input ref="product" type="text" className="form-control" id="product" />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input ref="category" type="text" className="form-control" id="category" />
              </div>

              <button onClick={this.create} type="submit" className="btn btn-default">Create</button>
            </form>
          </div>
          <div className="col-xs-9">

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Serial id</th>
                  <th>Product</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {this.state.devices.map(e =>
                  <tr key={e.id}>
                    <td>{e.serial_id}</td>
                    <td>{e.product}</td>
                    <td>{e.category}</td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>
        </div>

      </div>
    );
  }
}
