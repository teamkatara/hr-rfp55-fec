/* eslint-disable no-use-before-define */
import React from 'react';
import $ from 'jquery';
import { IoBagOutline, IoWaterOutline } from 'react-icons/io5';
import { AiOutlineFire } from 'react-icons/ai';

import ProductContext from './ProductContext';
import Overview from './overview/Overview';
import QuestionsAndAnswersWidget from './qa/QuestionsAndAnswersWidget';
import RatingsReviewsWidget from './ratings-reviews/RatingsReviewsWidget';
import RelatedProductsWidget from './related/RelatedProductsWidget';

import mockProduct from '../mock-data/sample-product.json';
import mockStyles from '../mock-data/sample-styles.json';
import mockReviews from '../mock-data/sample-reviews.json';

const findDefault = ({ results }) => {
  let defaultStyle;
  results.forEach((style) => {
    if (style['default?']) { defaultStyle = style; }
  });
  return defaultStyle;
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      color: 'cornflowerblue',
      theme: true,
      product: mockProduct,
      styles: mockStyles,
      clickedStyle: findDefault(mockStyles),
      reviews: mockReviews.results.length,
      productId: 404579,
    };

    this.updateProduct = this.updateProduct.bind(this);
    this.selectStyle = this.selectStyle.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.updateProductId = this.updateProductId.bind(this);
  }

  updateProduct(product, styles, reviews) {
    this.setState({
      product,
      styles,
      clickedStyle: findDefault(styles),
      reviews: reviews.results.length,
    });
  }

  updateProductId(id) {
    this.setState({
      productId: id,
    });
  }

  selectStyle(style) {
    this.setState({
      clickedStyle: style,
    });
  }

  toggleTheme() {
    $(document.body).toggleClass('active');
    this.setState({
      color: this.state.color === 'cornflowerblue' ? 'indianred' : 'cornflowerblue',
      theme: !this.state.theme,
    });
  }

  render() {
    return (
      <div>
        <div className="navbar">
          {this.state.theme
            ? <IoWaterOutline className="logo" onClick={this.toggleTheme} />
            : <AiOutlineFire className="logo" onClick={this.toggleTheme} />}
          <span className="brand-name">Team Katara</span>
          <IoBagOutline className="bag" />
        </div>
        <ProductContext.Provider value={this.state.productId}>
          <Overview
            selectStyle={this.selectStyle}
            product={this.state.product}
            styles={this.state.styles}
            clickedStyle={this.state.clickedStyle}
            reviews={this.state.reviews}
            updateProduct={this.updateProduct}
            color={this.state.color}
          />

          <RelatedProductsWidget updateProductId={this.updateProductId} />

          <QuestionsAndAnswersWidget />

          <RatingsReviewsWidget />
        </ProductContext.Provider>
      </div>
    );
  }
}

export default App;
