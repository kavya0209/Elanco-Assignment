/**
 * owner : Hitachi
 * author : Divyangi from Affine
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import Header from './components/shared/Header';
// import Footer from './components/shared/Footer';

import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-promise-loader';

import { Tooltip } from "/node_modules/bootstrap/dist/js/bootstrap.esm.min.js";


// This is the APP js file.

class App extends Component {
  
  state = {}
  componentDidMount() {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Tooltip(tooltipTriggerEl);
    });
    this.onRouteChanged();
  }
  render () {
    let headerComponent = !this.state.isFullPageLayout ? <Header/> : '';
    // let footerComponent = !this.state.isFullPageLayout ? <Footer/> : '';
    return (
      <div className='app'>
        { headerComponent }
        <div className="az-content-wrapper">
          <AppRoutes/>
        </div>
        {/* { footerComponent } */}
        <Loader promiseTracker={usePromiseTracker} color={'#3d5e61'} background={'rgba(255,255,255,.5)'} />
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/login'];
    for ( let i = 0; i < fullPageLayoutRoutes.length; i++ ) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true
        })
        document.querySelector('.az-content-wrapper').classList.add('p-0');
        break;
      } else {
        this.setState({
          isFullPageLayout: false
        })
        document.querySelector('.az-content-wrapper').classList.remove('p-0');
      }
    }
  }

}

export default withRouter(App);
