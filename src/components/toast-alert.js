import React, { Fragment } from 'react';
import { Toast } from 'react-bootstrap';

const ToastComponent = props => {
  return (
    <Fragment>
      <Toast
        onClose={props.closeToast}
        show={props.showToast}
        delay={3000}
        autohide={props.autohide}
        style={{
          position: 'fixed',
          top: '10%',
          left: '40%',
          zIndex: 2
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">{props.toastMessage}</strong>
        </Toast.Header>
      </Toast>
    </Fragment>
  );
};

export default ToastComponent;
