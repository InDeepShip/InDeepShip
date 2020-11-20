import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import DropZoneField from './DropZoneField';
import * as actions from '../actions';
import axios from 'axios';

const required = value => (value ? undefined : 'Required');

const maxLength = max => value => (value && value.length > max ? `Must be ${max} characters or less` : undefined);
const minLength = min => value => (value && value.length < min ? `Must be at least ${min} characters long` : undefined);

const maxLength15 = maxLength(15);

const minLength6 = minLength(6);

const name = value => (value && maxLength15 && !/^[a-zA-Z ]+$/.test(value)
  ? 'Invalid Name'
  : undefined);

const renderField = ({
  input,
  label,
  placeholder,
  type,
  meta: { touched, error, warning },
}) => (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input {...input} placeholder={placeholder} type={type} className="input" />
        {touched
          && ((error && <p className="help is-danger">{error}</p>)
            || (warning && <p className="help is-warning">{warning}</p>))}
      </div>
    </div>
  );

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    // this.handleSubmit = props.handleSubmit.bind(this);
    this.state = {
      oldPassword: '',
      newPassword1: '',
      newPassword2: '',
      displayMessage: '',
      loading: false
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword1, newPassword2 } = this.state;
    this.setState({ loading: true })

    axios
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/users/password/change/`, {
        old_password: oldPassword,
        new_password1: newPassword1,
        new_password2: newPassword2
      })
      .then(res => {
        console.log(res.data)
        this.setState({ loading: false })
        this.setState({ displayMessage: res.data.detail })
      })
      .catch(err => {
        console.log(err)
        this.setState({ loading: false })
        this.setState({ displayMessage: JSON.stringify(err.response.data) })
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { pristine, submitting } = this.props;
    const { displayMessage, loading } = this.state

    return (
      <form
        name="PasswordChangeForm"
        id="PasswordChangeForm"
      >
        <br />
        <div className="columns is-centered">
          <div className="column is-6">
            <Field
              id="oldpassword-selector"
              name="oldPassword"
              component={renderField}
              type="password"
              label="Enter Password"
              placeholder="Old Password"
              validate={[required, minLength6]}
              value=''
              onChange={this.handleChange}
            />
            <Field
              id="newpassword1-selector"
              name="newPassword1"
              component={renderField}
              type="password"
              label="New Password"
              placeholder="New Password"
              value=''
              onChange={this.handleChange}
            />
            <Field
              id="newpassword2-selector"
              name="newPassword2"
              component={renderField}
              type="password"
              label="Re-Enter Password"
              placeholder="Re-Enter New Password"
              value=''
              onChange={this.handleChange}
            />
          </div>
          <div className="column is-5 is-offset-1 has-text-centered">
            <div className="field">
              <label className="label">Profile Picture</label>
              <div className='control'>
                <Field name="files" component={DropZoneField} type="file" />
              </div>
              <br />
            </div>
          </div>
        </div>
        <div className="field is-centered">
          <div className="control">
            <button
              id="save-selector"
              onClick={this.onSubmit}
              className="button is-success"
              disabled={pristine || submitting}
            >
              Save
            </button>
          </div>
        </div>
        {loading && (
          <span className="loading-icon icon is-large">
            <i className="fas fa-3x fa-spinner fa-pulse"></i>
          </span>
        )}
        <div className="field is-below">
          {displayMessage}
        </div>
      </form>
    );
  }
}

PasswordChangeForm = reduxForm({
  form: 'passwordChangeForm',
})(PasswordChangeForm);

export default PasswordChangeForm;
