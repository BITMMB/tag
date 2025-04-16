import Competitor from './Competitor';
import React, { useState, useEffect } from 'react';

const Competitors = ({ competitors }) => {
  return [...new Set(competitors)].map((competitor) => (
    <Competitor competitor={competitor} />
  ));
};

export default Competitors;
