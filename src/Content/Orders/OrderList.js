import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import { Link } from 'react-router-dom';

import * as actions from '../../_actions';
import AdminSubNav from '../AdminDashboard/AdminSubNav';

class OrderList extends Component {
	componentWillMount() {
		this.props.getAllOrders();
  }

  handleChangeStatus(event) {
  	const orderId = event.target.getAttribute("data-order-id");
    const selectedStatus = event.target.value;
  	this.props.updateOrder(orderId, {
	    status: selectedStatus
	  });
  }

  renderChangeStatus(status, orderId) {
    return(
      <select 
        data-order-id={orderId} 
        defaultValue={status} 
        onChange={(e) => this.handleChangeStatus(e)}>
        <option value="open">Open</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
    );
  }

  renderProductName(productList) {
    return productList.map((product) => {
      return (
        <p key={product._id}><Link to={`/product-detail/${product._id}`}>{product.productName}</Link></p>
      );
    });
  }

  renderProductSize(productSize) {
    let count = 1;
    return productSize.map((size) => {
      return (
        <p key={count++}>{size}</p>
      );
    });
  }

  renderProductQuantity(productDetails) {
    return productDetails.map((product) => {
      return (
        <p key={product._id}>{product.quantity}</p>
      );
    });
  }

  renderProductAmount(productDetails) {
    return productDetails.map((product) => {
      return (
        <p key={product._id}>Rs {product.customerPrice}</p>
      );
    });
  }

  renderOrders() {
    let count = 1;
    return this.props.orderData.map((order) => {
      return (
        <tr key={order._id}>
          <td>{count++}</td>
          <td>{this.renderProductName(order.productList)}</td>
          <td>{this.renderProductQuantity(order.productDetails)}</td>
          <td>{this.renderProductSize(order.productSize)}</td>
          <td>{this.renderProductAmount(order.productDetails)}</td>
          <td>{order.totalQuantity}</td>
          <td>Rs {order.totalPrice}</td>
          <td>{Moment(order.createdDate).format('MM-DD-YYYY')}</td>
          <td>{Moment(order.expectedDeliveryDate).format('MM-DD-YYYY')}</td>
          <td>{order.status}</td>
          <td>{this.renderChangeStatus(order.status, order._id)}</td>
        </tr>
      );
    });
  }

  renderOrderListTemplate() {
  	if(this.props.orderData && this.props.orderData.length) {
	  	return(
        <div className="table-responsive">
  	  		<table className="table table-striped">
  	        <thead>
  	          <tr>
                <th>#</th>
  	            <th>Products</th>
                <th>Quantity</th>
                <th>Size</th>
                <th>Amount</th>
                <th>Total Quantity</th>
                <th>Total Amount</th>
                <th>Order Placed</th>
                <th>Delivery Date</th>
                <th>Order Status</th>
                <th>Edit</th>
  	          </tr>
  	        </thead>
  	        <tbody>
  	          {this.renderOrders()}
  	        </tbody>
  	      </table>
        </div>
	  	);
    } else {
    	return (
    		<p>No Orders Found.</p>
    	);
    }
  }

  render() {

		return (
		  <div className="admin-dashboard-wrapper wrapper">
		    <AdminSubNav />
				<div className="query-list">
	        <p className="list-title">
	          Orders
	        </p>
	        {this.renderOrderListTemplate()}
	      </div>
      </div>
		);
  }
}

const mapStateToProps = (state) => ({
  orderData: state.order.all
});

export default connect(
  mapStateToProps,
  actions
)(OrderList);

