import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import * as actions from '../actions';
import UserSetupForm from './UserSetupForm';
import 'react-tabs/style/react-tabs.css';

class EditProfile extends Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <section className="section">
        <div className="container has-text-centered">
          <h1 className="is-size-1">Settings</h1><br />

          <Tabs>
            <TabList>
              <Tab>User</Tab>
              <Tab>Ships</Tab>
              <Tab>Notifications</Tab>
            </TabList>

            <TabPanel>
              <UserSetupForm onSubmit={this.handleSubmitUser} user={this.props.auth} initialValues={{ displayName: [this.props.auth.name], setupBio: [this.props.auth.bio] }} />
            </TabPanel>
            <TabPanel>
              <div className="subtitle">Coming Soon!</div>
            </TabPanel>
            <TabPanel>
              <div className="subtitle">Coming Soon!</div>
            </TabPanel>
          </Tabs>

        </div>
      </section>
    );
  }
}

function mapStateToProps({ auth, profile }) {
  return { auth, profile };
}

export default connect(mapStateToProps, actions)(EditProfile);
