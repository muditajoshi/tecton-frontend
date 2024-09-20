import React from 'react';

const externalRedirects = {
  // Define your route-URL mappings here
  '/contact-us': 'https://blog.tectonlife.com/contact-us/',
  '/science': 'https://blog.tectonlife.com/science/',
  '/science/Pkstudy': 'https://blog.tectonlife.com/pk-study/',
  '/science/KetonesandConcussions': 'https://blog.tectonlife.com/can-ketones-help-mitigate-concussions/',
  '/true-purpose': 'https://blog.tectonlife.com/true-purpose/',
  '/science/ketonesandsugar': 'https://blog.tectonlife.com/are-ketones-better-than-glucose-as-an-energy-source/',
  '/science/ketoneSaltvsKetoneEster': 'https://blog.tectonlife.com/ketone-salts-vs-ketone-esters/',
  '/science/WhatCanYouDrinkDuringIntermittentFasting': 'https://blog.tectonlife.com/what-can-you-drink-during-intermittent-fasting/',
  '/exogenous-ketones': 'https://blog.tectonlife.com/benefits-of-exogenous-ketones/',
  '/all-products':'https://tectonlife.com/shop/',
};

const RedirectExternal = ({ to }) => {
  const externalUrl = externalRedirects[to];
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (externalUrl) {
      window.location.href = externalUrl;
    } else {
       setIsLoading(false);
    }
  }, [externalUrl]);

  return (null)
};

export default RedirectExternal;