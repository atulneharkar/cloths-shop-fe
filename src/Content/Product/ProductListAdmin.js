import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'moment';

import * as actions from '../../_actions';
import defaultProfileImage from '../../assets/images/default-profile-image.png';
import AdminSubNav from '../AdminDashboard/AdminSubNav';

class ProductListAdmin extends Component {
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

  toggleProductDeleteModal(showProductDeleteModal, productId = '') {
    this.setState({ showProductDeleteModal, productId });
  }

  handleDelete() {
    this.props.removeProduct(this.state.productId);
    this.setState({ showProductDeleteModal: false, productId: '' });
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

  renderProductPicture(avatar) {
    if(avatar) {
      return (
        <img alt="Product" src={avatar} width="50" height="50" />
      );
    } else {
      return (
        <img alt="Product" src={defaultProfileImage} width="50" height="50" />
      );
    }
  }

  renderProducts() {
    let productCount = 1;
    return this.props.productData.map((product) => {
      return (
        <tr key={product._id}>
          <td>{this.renderProductPicture(product.productImage)}</td>
          <td>{product.productName}</td>
          <td>{product.productCategory}</td>
          <td>{product.sizes}</td>
          <td>{product.originalPrice}</td>
          <td>{product.customerPrice}</td>
          <td>{product.availablity}</td>
          <td>{product.productDescription}</td>
          <td><Link className="edit-link" to={`/edit-product/${product._id}`}>Edit</Link></td>
          <td><span className="delete-link" onClick={() => this.toggleProductDeleteModal(true, product._id)}>Delete</span></td>
        </tr>
      );
    });
  }

  renderProductListTemplate() {
    if(this.props.productData.length) {
      return(
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Sizes</th>
                <th>Original Price</th>
                <th>Customer Price</th>
                <th>Availablity</th>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.renderProducts()}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <p>No Products Added.</p>
      );
    }
  }

  render() {

    return (
      <div className="admin-dashboard-wrapper wrapper">
        <AdminSubNav />
        <div className="product-list">
          <p className="list-title">
            Products
          </p>
          <div className="clearfix">
            <p className="category-filter">Category: {this.renderSelectCategory()}</p>
            <Link to="/create-product" className="create-product-btn">Create Product</Link>
          </div>
          {this.renderProductListTemplate()}

          <div className={this.state.showProductDeleteModal ? 'show-product-modal' : ''} >
            <div className="modal-message">
              <p>Are you sure you want to delete product?</p>
              <div className="modal-btn-wrapper">
                <span onClick={() => this.toggleProductDeleteModal(false)}>No</span>
                <span onClick={() => this.handleDelete()}>Yes</span>
              </div>
            </div>
            <div className="modal-overlay" onClick={() => this.toggleProductDeleteModal(false)}></div>
          </div>

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
)(ProductListAdmin);
