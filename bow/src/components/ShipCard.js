import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';


class ShipCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { ship } = this.props;
    return (
      <div key={ship.imo} className="card" style={{ borderRadius: '5px', marginBottom: '2.5em' }}>
        <div className="card-image has-text-centered" style={{ top: '-1em' }}>
          <figure className="image is-4by3">
            <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="Placeholder image" />
          </figure>
        </div>
        <div className="card-content" style={{ paddingTop: '0px' }}>
          <p className="title is-4">{ship.name}</p>
          <p className="subtitle is-6">
            in <Link className="has-text-link">{ship.port}</Link>
          </p>
          <p className="subtitle is-6"><b>Owner(s): </b>{ship.owner}</p>
          <p className="subtitle is-6"><b>IMO: </b>{ship.imo}</p>
          <p className="subtitle is-6"><b>Propulsion: </b>{ship.propulsion}</p>
          <p className="subtitle is-6"><b>Yard Number: </b>{ship.yard_number}</p>
          <div className="content">
            {ship.summary}
          </div>
          <p className="subtitle is-6">
            {/* Deadline: <a className="has-text-link">{(ship.date.getMonth() + 1) + '/' + ship.date.getDate() + '/' + ship.date.getFullYear()} </a> */}
            Expires: <a className="has-text-link">10/10/2021 </a>
          </p>
        </div>

        <footer className="card-footer">
          <Link className="card-footer-item has-text-success" to={`/ship/${ship.imo}`}>
            Details
          </Link>
        </footer>
      </div>
    );
  }
}

export default withRouter(ShipCard);
