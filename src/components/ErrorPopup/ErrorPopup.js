import React, { Component } from "react";
import { connect } from "react-redux";
import phoneBookSelectors from "../../redux/phoneBook/phoneBook-selectors";
import phoneBookActions from "../../redux/phoneBook/phoneBook-actions";
import authSelectors from "../../redux/auth/auth-selectors";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import s from "./ErrorPopup.module.css";
import anim from "../animation.module.css";

class ErrorPopup extends Component {
  static propTypes = {
    message: PropTypes.string,
    error: PropTypes.object,
    clearError: PropTypes.func,
  };

  componentDidMount() {
    if (this.props.error || this.props.authError) {
      setTimeout(() => {
        this.props.clearError();
      }, 3000);
    }
  }

  render() {
    return (
      <CSSTransition
        in={!!this.props.message}
        timeout={250}
        classNames={anim}
        unmountOnExit
      >
        <div className={s.popup}>
          <p>{this.props.message}</p>
        </div>
      </CSSTransition>
    );
  }
}

const mapStateToProps = (state) => ({
  error: phoneBookSelectors.getError(state),
  authError: authSelectors.getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(phoneBookActions.clearError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPopup);
