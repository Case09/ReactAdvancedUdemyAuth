import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    // contextTypes is used to get access to router inside out class
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStatetoProps(state) {
    return {
      authenticated: state.authenticated
    };
  }

  return connect(mapStatetoProps)(Authentication);
}

// In some other location... Not in this file...
// We want to use this HOC
// import Authentication // This is my HOC
// import Resources // This is the component i want to wrap

// const ComposedComponent = Authentication(Resources);

// // In some render method...
// <ComposedComponent />