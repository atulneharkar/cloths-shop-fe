import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'moment';

import * as actions from '../../_actions';

class UserCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      myCartItems: [],
      productList: [],
      productDetails: [],
      totalPrice: '',
      totalQuantity: '',
      productSize: []
    };
  }

  componentWillMount() {
    this.getCartItems();
  }

  componentWillReceiveProps() {
    this.getCartItems();
  }

  getCartItems() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = (userInfo) ? userInfo._id : '';
    const myCartItems = (userInfo) ? userInfo.myCart : [];
    this.setState({ userId, myCartItems });

    if(myCartItems && myCartItems.length) {
      this.setProductDetails(myCartItems);
    }
  }

  setProductDetails(myCartItems) {
    let productDetails = [];
    let productList = [];
    let productSize = [];
    for(let i = 0; i < myCartItems.length; i++) {
      productDetails.push({
        quantity: 1,
        customerPrice: parseInt(myCartItems[i].productId.customerPrice, 10),
        originalPrice: parseInt(myCartItems[i].productId.originalPrice, 10),
      });

      productList.push(myCartItems[i].productId._id);
      productSize.push(myCartItems[i].productSize);
    }
    this.setState({ productDetails, productSize, productList });
    this.setTotalValues(productDetails);
  }

  setTotalValues(productDetails) {
    let totalPrice = 0;
    let totalQuantity = 0;

    for(let i = 0; i < productDetails.length; i++) {
      totalPrice += parseInt(productDetails[i].customerPrice, 10);
      totalQuantity += parseInt(productDetails[i].quantity, 10);
    }

    this.setState({ totalPrice, totalQuantity });
  }

  beginPayment() {
    const orderData = {
      userId: this.state.userId,
      productList: this.state.productList,
      productDetails: this.state.productDetails,
      totalPrice: this.state.totalPrice,
      totalQuantity: this.state.totalQuantity,
      productSize: this.state.productSize,
    }

    this.props.addOrder(orderData);
  }

  calculateProductAmount(event, index) {
    const quantity = event.target.value;
    let productDetails = this.state.productDetails;
    const myCartItems = this.state.myCartItems;

    productDetails[index] = {
      quantity: (quantity) ? parseInt(quantity, 10) : 1,
      customerPrice: (quantity) ? (quantity * myCartItems[index].productId.customerPrice) : myCartItems[index].productId.customerPrice,
      originalPrice: (quantity) ? (quantity * myCartItems[index].productId.originalPrice) : myCartItems[index].productId.originalPrice
    };
    this.setState({ productDetails });
    this.setTotalValues(productDetails);
  }

  removeProductFromCart(productId) {
    this.props.removeProductFromCart(productId, this.state.userId);
  }

  renderProductImage(img) {
    if(img) {
      return (
        <img className="product-img col-lg-1" alt="Product pic" src={img} />
      );
    }
  }

  renderCheckoutWrapper() {
    if(this.state.myCartItems && this.state.myCartItems.length) {
      return (
        <div className="clearfix">
          <p className="col-lg-6">Total Price: Rs {this.state.totalPrice}</p>
          <p className="col-lg-5">Total Quantity: {this.state.totalQuantity}</p>
          <p className="col-lg-1" onClick={() => this.beginPayment()}>Checkout</p>
        </div>
      );
    }
  }

  renderProductCardTemplate() {
    if(this.state.myCartItems && this.state.myCartItems.length) {
      return this.state.myCartItems.map((product, index) => {
        return (
          <div key={product.productId._id} className="mycart-card-container">
            <div className="product-card clearfix">
                {this.renderProductImage(product.productId.productImage)}
                <div className="product-info col-lg-5">
                  <p className="product-title">{product.productId.productName}</p>
                  <p className="product-category">{product.productId.productCategory}</p>
                  <p className="product-price">Price: Rs {this.state.productDetails[index].customerPrice} 
                    <strike>Rs {this.state.productDetails[index].originalPrice}</strike></p>
                </div>
                <div className="col-lg-5">
                  <p className="product-sizes">Size: {product.productSize}</p>
                  <p className="product-quantity">Quantity: <input type="number" value={this.state.productDetails[index].quantity} 
                    onChange={(e) => this.calculateProductAmount(e, index)} /></p>
                </div>
                <p className="col-lg-1" onClick={() => this.removeProductFromCart(product.productId._id)}>Remove</p>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className="no-product-wrapper">
          <p>No Products added.</p>
        </div>
      );
    }
  }

  render() {

    return (
      <div className="wrapper product-card-list clearfix">
        <h2 className="main-title">
          My Cart
        </h2>
        <div>
          {this.renderCheckoutWrapper()}
          {this.renderProductCardTemplate()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userInformation: state.user.userDetail
});

export default connect(
  mapStateToProps,
  actions
)(UserCart);
