import React, { PureComponent } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { withRouter, Link } from 'react-router-dom';
import { registrationFail } from '../actions';


const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});


class RegistrationPdf extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1
    };
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));

  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

  render() {
    const { registration, index, pageNumber, numPages } = this.props;
    return (
      <div key={registration.id}>
        <nav>
          <button onClick={this.goToPrevPage}>Prev</button>
          <button onClick={this.goToNextPage}>Next</button>
        </nav>
        <MyDocument
          key={registration.id}
          registration={{
            id: registration.id,
            port: registration.port,
            vessel: registration.vessel,
            tonnage: registration.tonnage,
            propulsion: registration.propulsion,
            yard_number: registration.yard_number,
            vessel_length: registration.vessel_length,
            hulls: registration.hulls,
            purpose: registration.purpose,
            start_date: registration.start_date,
            expiration_date: registration.expiration_date,
            owner: registration.owner
          }}
          index={index + 1}
        />
        {/* <div className="card-content" style={{ paddingTop: '0.5rem' }}>
          <p className="is-6"><b>Name of Ship: </b>{registration.vessel.name}</p>
          <p className="is-6"><b>port: </b>{registration.port.name}</p>
          <p className="is-6"><b>imo: </b>{registration.vessel.imo}</p>
          <p className="is-6"><b>tonnage: </b>{registration.tonnage}</p>
          <p className="is-6"><b>propulsion: </b>{registration.propulsion.name}</p>
          <p className="is-6"><b>yard_number: </b>{registration.yard_number}</p>
          <p className="is-6"><b>vessel_length: </b>{registration.vessel_length}</p>
          <p className="is-6"><b>hulls: </b>{registration.hulls}</p>
          <p className="is-6"><b>purpose: </b>{registration.purpose}</p>
          <p className="is-6"><b>start_date: </b>{registration.start_date}</p>
          <p className="is-6"><b>expiration_date: </b>{registration.expiration_date}</p>
          <div className="is-6"><b>OWNERSHIP DETAILS: </b>
            <div key={index} className="pl-5">
              <p className="is-6"><b>Name: </b>{registration.owner.name}</p>
              <p className="is-6"><b>Email: </b>{registration.owner.email}</p>
              <p className="is-6"><b>Address: </b>{registration.owner.address}</p>
              <p className="is-6"><b>Account Type: </b>{registration.owner.account}</p>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default withRouter(RegistrationPdf);
