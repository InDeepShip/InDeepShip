import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import DropZoneField from './DropZoneField';
import * as actions from '../actions';

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

class UserSetupForm extends Component {
  constructor(props) {
    super(props);

    // this.handleSubmit = props.handleSubmit.bind(this);
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form
        name="userSetupForm"
        onSubmit=''
        id="userSetupForm"
      >
        <br />
        <div className="columns is-centered">
          <div className="column is-6">
            <Field
              name="displayName"
              component={renderField}
              type="text"
              label="Display Name"
              placeholder="This should auto populate"
              validate={[required, name]}
              value={this.props.auth.displayName ? this.props.auth.displayName : ''}
            />
            <Field
              name="oldPassword"
              component={renderField}
              type="text"
              label="Enter Password"
              placeholder="Old Password"
              validate={[required, minLength6]}
              value=''
            />
            <Field
              name="newPassword1"
              component={renderField}
              type="text"
              label="New Password"
              placeholder="New Password"
              value=''
            // need to add validation
            />
            <Field
              name="newPassword2"
              component={renderField}
              type="text"
              label="Re-Enter Password"
              placeholder="Re-Enter New Password"
              value=''
            // need to add validation and hide if newPassword1 is empty
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
              // onClick={handleSubmit}
              className="button is-success"
              disabled={pristine || submitting}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    );
  }
}

UserSetupForm = reduxForm({
  form: 'userSetupForm',
})(UserSetupForm);

function mapStateToProps({ auth, profile }) {
  return { auth, profile };
}

export default connect(mapStateToProps, actions)(UserSetupForm);
