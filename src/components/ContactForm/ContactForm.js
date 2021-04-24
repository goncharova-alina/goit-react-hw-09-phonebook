import React, { Component } from 'react';
import { connect } from 'react-redux';
import phoneBookOperations from '../../redux/phoneBook/phoneBook-operations';
import phoneBookSelectors from '../../redux/phoneBook/phoneBook-selectors';
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

class ContactForm extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        number: PropTypes.string,
      }),
    ),
    onAddContact: PropTypes.func.isRequired,
  };
  state = {
    name: '',
    number: '',
    error: false,
    errorMessage: null,
  };

  reset() {
    this.setState({ name: '', number: '' });
  }

  handleChangeInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const contacts = this.props.contacts;

    if (contacts.some(contact => contact.name === name)) {
      this.setState({
        errorMessage: 'Этот контакт уже существует',
      });
      setTimeout(() => {
        this.setState({ errorMessage: null });
      }, 3000);
      this.reset();
      return;
    }

    this.props.onAddContact(name, number);
    this.reset();
  };

  render() {
    const { name, number, errorMessage } = this.state;

    return (
      <div>
        <ErrorPopup message={errorMessage} />
        <form className={s.wrapper} onSubmit={this.handleSubmit}>
          <label className={s.field}>
            <span className={s.name}>Name</span>
            <input
              className={s.input}
              type="text"
              name="name"
              value={name}
              placeholder="Enter name"
              onChange={this.handleChangeInput}
              required
            />
          </label>
          <label className={s.field}>
            <span className={s.number}>Number</span>
            <input
              className={s.input}
              type="tel"
              name="number"
              value={number}
              placeholder="Enter number"
              onChange={this.handleChangeInput}
              required
            />
          </label>
          <button className={s.button} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  contacts: phoneBookSelectors.getAllContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onAddContact: (name, number) =>
    dispatch(phoneBookOperations.addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
