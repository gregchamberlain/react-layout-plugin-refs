import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

const Wrapper = (WrappedComponent, displayName) => {

  class ClassWrapper extends Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  ClassWrapper.displayName = `ClassWrapper(${displayName})`;

  const RefsWrapper = ({ pseudoRef, ...props }) => (
    <ClassWrapper
      {...props}
      ref={instance => (typeof pseudoRef === 'function') && pseudoRef(instance)}
    />
  );

  RefsWrapper.displayName = `RefsWrapper(${displayName})`
  hoistNonReactStatic(RefsWrapper, WrappedComponent);

  return RefsWrapper;

};

export default Wrapper;