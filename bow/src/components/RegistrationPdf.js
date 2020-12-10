import React, { PureComponent } from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image, Font, PDFViewer } from '@react-pdf/renderer';
import { withRouter, Link } from 'react-router-dom';
import { registrationFail } from '../actions';
import { connect } from 'react-redux';


// WIP

// Intention of this page:
// Grab information from the registration card
// Use this page to create the pdf and either view it or download it
//    Either view pdf in a new tab (no navbar, etc)
//    Or, download the pdf
//
// Documentation for react-pdf: https://react-pdf.org/
// Tutorials I was following:
//    https://pspdfkit.com/blog/2018/open-pdf-in-react/
//    https://dev.to/finallynero/generating-pdf-documents-in-react-using-react-pdf-4ka7
//

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  image: {
    height: 150,
    marginBottom: 30,
    marginHorizontal: 100,
  },
});

const MyDocument = ({ name, registration }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Name: {name}</Text>
        <Text>Email: {registration.email}</Text>
        <Text>Phone: {registration.phone}</Text>
        <Text>Address: {registration.address}</Text>
        <Text>Vessel: {registration.vessel}</Text>
        <Text>Port: {registration.port}</Text>
        <Text>IMO: {registration.imo}</Text>
        <Text>Builder: {registration.builder_name}</Text>
        <Text>Builder Address: {registration.builder_address}</Text>
        <Text>Yard Number: {registration.yard_number}</Text>
        <Text>Registration Date: {registration.date}</Text>
        <Text>Hulls: {registration.hulls}</Text>
        <Text>Gross Tonnage: {registration.tonnage}</Text>
        <Text>Method of Propulsion: {registration.propulsion}</Text>
        <Text>Vessel Length: {registration.vessel_length}</Text>
      </View>
      <View style={styles.image}>
        <Image src="../assets/Coat_of_arms_of_the_United_Kingdom_(black_and_white).svg" />
      </View>
    </Page>
  </Document>
);


class RegistrationPdfBase extends PureComponent {
  constructor(props) {
    super(props);
    console.log(props)
    console.log("IMO", props.location.imo)
    var formData = localStorage.getItem(props.location.imo)
    console.log(formData)
    console.log(JSON.parse(formData))
    this.state = {
      numPages: null,
      pageNumber: 1,
      formData: JSON.parse(formData),
      name: props.auth.user.name
    };
    // localStorage.removeItem(props.location.imo)
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
    const { name, formData } = this.state;
    return (
      // Download works, pdfviewer is for testing
      <div align="center">
        <PDFDownloadLink document={<MyDocument name={name} registration={formData} />} fileName="registration.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
      </div>
      // <div>
      //   <PDFViewer>
      //     <MyDocument name={name} registration={formData} />
      //   </PDFViewer>
      // </div>
    );

    // return ReactPDF.render(<MyDocument
    // key={registration.id}
    // registration={{
    //   id: registration.id,
    //   port: registration.port,
    //   vessel: registration.vessel,
    //   tonnage: registration.tonnage,
    //   propulsion: registration.propulsion,
    //   yard_number: registration.yard_number,
    //   vessel_length: registration.vessel_length,
    //   hulls: registration.hulls,
    //   purpose: registration.purpose,
    //   start_date: registration.start_date,
    //   expiration_date: registration.expiration_date,
    //   owner: registration.owner
    // }}
    // index={index + 1}
    // />, `${__dirname}/example.pdf`);
    // return (
    //   <div key={registration.id}>
    //     <nav>
    //       <button onClick={this.goToPrevPage}>Prev</button>
    //       <button onClick={this.goToNextPage}>Next</button>
    //     </nav>
    //     {/* <div className="card-content" style={{ paddingTop: '0.5rem' }}>
    //       <p className="is-6"><b>Name of Ship: </b>{registration.vessel.name}</p>
    //       <p className="is-6"><b>port: </b>{registration.port.name}</p>
    //       <p className="is-6"><b>imo: </b>{registration.vessel.imo}</p>
    //       <p className="is-6"><b>tonnage: </b>{registration.tonnage}</p>
    //       <p className="is-6"><b>propulsion: </b>{registration.propulsion.name}</p>
    //       <p className="is-6"><b>yard_number: </b>{registration.yard_number}</p>
    //       <p className="is-6"><b>vessel_length: </b>{registration.vessel_length}</p>
    //       <p className="is-6"><b>hulls: </b>{registration.hulls}</p>
    //       <p className="is-6"><b>purpose: </b>{registration.purpose}</p>
    //       <p className="is-6"><b>start_date: </b>{registration.start_date}</p>
    //       <p className="is-6"><b>expiration_date: </b>{registration.expiration_date}</p>
    //       <div className="is-6"><b>OWNERSHIP DETAILS: </b>
    //         <div key={index} className="pl-5">
    //           <p className="is-6"><b>Name: </b>{registration.owner.name}</p>
    //           <p className="is-6"><b>Email: </b>{registration.owner.email}</p>
    //           <p className="is-6"><b>Address: </b>{registration.owner.address}</p>
    //           <p className="is-6"><b>Account Type: </b>{registration.owner.account}</p>
    //         </div>
    //       </div>
    //     </div> */}
    //   </div>
    // );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const RegistrationPdf = connect(
  mapStateToProps
)(RegistrationPdfBase);

export default withRouter(RegistrationPdf);
