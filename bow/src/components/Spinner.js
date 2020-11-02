import React from 'react';

const Spinner = ({ fullPage }) => (
  <div className={fullPage ? 'full-page has-text-centered title' : 'title'}>
    <button className="button is-loading spinner is-large" style={{ paddingTop: '5em' }}>Loading</button>
  </div>
);

export default Spinner;
