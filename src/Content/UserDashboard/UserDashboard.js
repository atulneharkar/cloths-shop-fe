import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'moment';

import * as actions from '../../_actions';

class UserDashboard extends Component {
	componentWillMount() {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if(userInfo) {
			this.props.getMyOrders(userInfo._id);
		}
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
    return this.props.myOrders.map((order) => {
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
        </tr>
      );
    });
  }

  renderMyOrdersTemplate() {
  	if(this.props.myOrders && this.props.myOrders.length) {
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
    		<div className="no-course-wrapper">
	    		<p>You have not placed any orders with us yet.</p>
    		</div>
    	);
    }
  }

  render() {

		return (
			<div className="wrapper course-card-list clearfix user-dashboard admin-dashboard-wrapper">
			  <p className="list-title">My Orders</p>
        {this.renderMyOrdersTemplate()}
      </div>
		);
  }
}

const mapStateToProps = (state) => ({
  myOrders: state.order.myOrder
});

export default connect(
  mapStateToProps,
  actions
)(UserDashboard);
