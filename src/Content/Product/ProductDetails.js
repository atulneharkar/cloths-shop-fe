import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'moment';

import * as actions from '../../_actions';
import { history } from '../../_helpers';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      productId: '',
      productSize: '',
      userCartItems: [],
      showSizeSelectError: false
    };
  }

  componentWillMount() {
    const productId = this.props.match.params.productId;
    if(productId) {
      this.props.getProductById(productId);
      this.setState({ productId });
    }

    this.setUserId();
    this.setUserCartItems();
  }

  componentWillReceiveProps() {
    this.setUserCartItems();
  }

  setUserCartItems() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userCartItems = (userInfo) ? userInfo.myCart : [];
    this.setState({ userCartItems });
  }

  setUserId() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = (userInfo) ? userInfo._id : '';
    this.setState({ userId });
  }

  renderProductImage(img) {
    if(img) {
      return (
        <img alt="Product pic" src={img} />
      );
    }
  }

  renderAddToCartBtn(availablity) {
    if(availablity === 'Yes') {
      let productAddedToCart = false;
      const cartItems = this.state.userCartItems;
      if(cartItems) {
        for(let i = 0; i < cartItems.length; i++) {
          if(cartItems[i].productId._id === (this.state.productId)) {
            productAddedToCart = true;
          }
        }
      }
      if(productAddedToCart) {
        return (
          <div className="go-to-cart-btn">
            <Link to={`/my-cart/${this.state.userId}`}>Go to cart</Link>
          </div>
        );
      } else {
        return (
          <div className="add-to-cart-btn" onClick={() => this.addProductToCart()}>
            <span>Add to cart</span>
          </div>
        );
      }
    } else {
      return (
        <p className="availability-status">Out of Stock</p>
      );
    }
  }

  addProductToCart() {
    if(this.props.authenticated) {
      if(this.state.productSize) {
        this.props.addProductToCart(this.state.productId, this.state.userId, this.state.productSize);
      } else {
        this.setState({ showSizeSelectError: true });
      }
    } else {
      history.push(`/login?redirectUrl=/product-detail/${this.props.match.params.productId}`);
    }
  }

  renderProductSizeList(productSizeList) {
    return productSizeList.split(',').map((size) => {
      return (
        <option key={size} value={size}>{size}</option>
      );
    });
  }

  handleSizeChange(event) {
    const productSize = event.target.value;

    if(productSize) {
      this.setState({ showSizeSelectError: false });
      this.setState({ productSize });
    } else {
      this.setState({ productSize: '' });
    }
  }

  renderSelectSize(productSizeList) {
    return(
      <select 
        onChange={(e) => this.handleSizeChange(e)}>
        <option>Select Size</option>
        {this.renderProductSizeList(productSizeList)}
      </select>
    );
  }

  renderSelectSizeError() {
    if(this.state.showSizeSelectError) {
      return (
        <p>Please select size</p>
      );
    }
  }

  renderProductCardTemplate() {
    if(this.props.productData) {
      const product = this.props.productData;
      return (
        <div className="product-detail-container">
          {this.renderProductImage(product.productImage)}
          <div className="product-info">
            <p className="product-title">{product.productName}</p>
            <p className="product-category">{product.productCategory}</p>
            <p className="product-price">Rs {product.customerPrice} <strike>Rs {product.originalPrice}</strike></p>
            <p className="product-sizes">Size: {this.renderSelectSize(product.sizes)}</p>
            {this.renderAddToCartBtn(product.availablity)}
            {this.renderSelectSizeError()}
          </div>
        </div>
      );
    }
  }
  render() {

    return (
      <div className="wrapper product-card-list clearfix">
        <h2 className="main-title">
          Product Details
        </h2>
        <div>
          {this.renderProductCardTemplate()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.authentication.isAuthenticated,
  productData: state.product.productDetail,
  userInformation: state.user.userDetail
});

export default connect(
  mapStateToProps,
  actions
)(ProductDetails);
