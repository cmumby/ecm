import React, { Component } from 'react';
//import {Link} from 'react-router-dom';

export default class ListCaseRow extends Component {

 /* constructor(props) {
      super(props);
      
  }*/

  handStateLabel(){
    var statusClass = "";
    switch (this.props.obj.status) {
      case "Review In Progress":
        statusClass = "label-info";
        break;
      case 'Review Pending':
        statusClass = "label-warning";
        break;
      case 'Revisions Required':
        statusClass = "label-danger";
        break;
      case 'Requirements Complete':
        statusClass = "label-success";
        break;
      default:
        statusClass = "label-info";
    }
    return statusClass;
  }

  
  handleDaysSince() {
    const ONE_DAY = 24 * 60 * 60 * 1000;
    let statusTimestap = new Date(this.props.obj.statusTimestamp);
    return Math.round(Math.abs((statusTimestap.getTime() - new Date().getTime()) / (ONE_DAY)));
  }

  render() {
    console.log("cases:",this.props);
        
    return (
      <tr>
        <td className="ecm-id-column">
          <span className={"ecm-id label " + this.handStateLabel()}>{this.props.obj.ecmId}</span>
        </td>
        <td>
          <article className="case-details">
            <dl>
              <dt>Name:</dt>
              <dd><a className="customer-name-link" id={this.props.obj._id} onClick={this.props.onUpdate} href="">{this.props.obj.name}</a></dd>
              <dt>Type:</dt>
              <dd><span>{this.props.obj.type}</span></dd>
              <dt>Status:</dt>
              <dd><span className={"label " + this.handStateLabel()}>{this.props.obj.status}</span></dd>
            </dl>
          </article>
        </td>
        <td>
          <button id={this.props.obj._id} onClick={this.props.onDelete} type="button" value="Delete" className="case-list btn btn-danger btn-xs">Delete This Case</button>
          
        </td>
        <td>
          <span className="days-since">{this.handleDaysSince()}</span>
        </td>
      </tr>
    );
  }
}
