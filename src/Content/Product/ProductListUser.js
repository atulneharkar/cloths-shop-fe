import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'moment';

import * as actions from '../../_actions';

class ProductListUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showProductDeleteModal: false,
      productId: ''
    };
  }

  componentWillMount() {
    this.props.getProductList();
    this.props.getProductCategory();
  }

  renderProductImage(img) {
    if(img) {
      return (
        <img alt="Product pic" src={img} />
      );
    }
  }

  checkAvailability(availablity) {
    if(availablity === 'No') {
      return (
        <p className="availability-status">Out of Stock</p>
      );
    }
  }

  renderProductCardTemplate() {
    if(this.props.productData.length) {
      return this.props.productData.map((product) => {
        return (
          <div key={product._id} className="col-xs-12 col-sm-4 col-lg-4 product-card-container">
            <div className="product-card">
              <Link to={`/product-detail/${product._id}`} className="clearfix" >
                {this.renderProductImage(product.productImage)}
                <div className="product-info">
                  <p className="product-title">{product.productName}</p>
                  <p className="product-category">{product.productCategory}</p>
                  <p className="product-price">Rs {product.customerPrice} <strike>Rs {product.originalPrice}</strike></p>
                  <p className="product-sizes">Size: {product.sizes}</p>
                  {this.checkAvailability(product.availablity)}
                </div>
              </Link>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className="no-product-wrapper">
          <p>No Product found.</p>
        </div>
      );
    }
  }

  renderProductCategoryList() {
    if(!!this.props.productCategory && this.props.productCategory.length) {
      return this.props.productCategory.map((category) => {
        return (
          <option key={category.value} value={category.label}>{category.label}</option>
        );
      });
    }
  }

  handleCategoryChange(event) {
    const selectedProductCategory = event.target.value;
    this.props.getProductByCategory(selectedProductCategory);
  }

  renderSelectCategory() {
    return(
      <select 
        onChange={(e) => this.handleCategoryChange(e)}>
        <option>All</option>
        {this.renderProductCategoryList()}
      </select>
    );
  }

  render() {

    return (
      <div className="wrapper product-card-list clearfix">
        <h2 className="main-title">
          Products
        </h2>
        <div className="clearfix">
          <p className="category-filter user-page-category">Category: {this.renderSelectCategory()}</p>
        </div>
        <div>
          {this.renderProductCardTemplate()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  productData: state.product.all,
  productCategory: state.product.productCategory
});

export default connect(
  mapStateToProps,
  actions
)(ProductListUser);
