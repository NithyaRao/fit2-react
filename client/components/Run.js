/* eslint-disable jsx-quotes, react/prop-types, max-len, no-underscore-dangle, arrow-body-style */

import React from 'react';
import moment from 'moment';

export default (props) => {
  return (
    <tbody>
      <tr><td key={props.device.id}>{ props.device.product } - { props.device.category }</td></tr>
      {props.device.runs.map(e =>
        <tr key={e.id}>
          <td />
          <td>{e.startTime ? moment(e.startTime).format('YYYY-MM-DD HH:mm:ss') : ''}</td>
          <td>{e.stopTime ? moment(e.stopTime).format('YYYY-MM-DD HH:mm:ss') : ''}</td>
        </tr>
      )}
    </tbody>
);
};
