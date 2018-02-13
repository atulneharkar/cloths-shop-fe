import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductListUser from '../Product/ProductListUser';

import * as actions from '../../_actions';

class Home extends Component {
	render() {
		return (
			<div>
				<ProductListUser />
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    
  }
}

export default connect(mapStateToProps, actions)(Home);