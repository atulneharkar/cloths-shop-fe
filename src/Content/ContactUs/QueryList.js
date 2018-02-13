import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';

import * as actions from '../../_actions';
import AdminSubNav from '../AdminDashboard/AdminSubNav';

class QueryList extends Component {
	componentWillMount() {
		this.props.getQueryList();
  }

  handleChangeStatus(event) {
  	const queryId = event.target.getAttribute("data-query-id");
    const selectedStatus = event.target.value;
  	this.props.updateQuery(queryId, {
	    queryStatus: selectedStatus
	  });
  }

  renderChangeStatus(status, queryId) {
    return(
      <select 
        data-query-id={queryId} 
        defaultValue={status} 
        onChange={(e) => this.handleChangeStatus(e)}>
        <option value="open">Open</option>
        <option value="resolved">Resolved</option>
        <option value="inProgress">In Progress</option>
      </select>
    );
  }

  renderQueries() {
    return this.props.queryData.map((query) => {
      return (
        <tr key={query._id}>
          <td>{query.name}</td>
          <td>{query.email}</td>
          <td>{query.phone}</td>
          <td>{query.description}</td>
          <td>{Moment(query.createdDate).format('MM-DD-YYYY')}</td>
          <td>{query.queryStatus}</td>
          <td>{this.renderChangeStatus(query.queryStatus, query._id)}</td>
        </tr>
      );
    });
  }

  renderQueryListTemplate() {
  	if(this.props.queryData.length) {
	  	return(
        <div className="table-responsive">
  	  		<table className="table table-striped">
  	        <thead>
  	          <tr>
  	            <th>Name</th>
  	            <th>Email</th>
  	            <th>Phone</th>
  	            <th>Description</th>
  	            <th>Submitted Date</th>
  	            <th>Query Status</th>
  	            <th>Edit</th>
  	          </tr>
  	        </thead>
  	        <tbody>
  	          {this.renderQueries()}
  	        </tbody>
  	      </table>
        </div>
	  	);
    } else {
    	return (
    		<p>No Queries Found.</p>
    	);
    }
  }

  render() {

		return (
		  <div className="admin-dashboard-wrapper wrapper">
		    <AdminSubNav />
				<div className="query-list">
	        <p className="list-title">
	          Queries
	        </p>
	        {this.renderQueryListTemplate()}
	      </div>
      </div>
		);
  }
}

const mapStateToProps = (state) => ({
  queryData: state.contactUs.all
});

export default connect(
  mapStateToProps,
  actions
)(QueryList);

