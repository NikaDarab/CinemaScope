import React from "react";
import { string } from "prop-types";
import "../styles/LandingPage.css";

const LandingPage = ({ landingText }) => (
  <div
    className="landing-page"
    dangerouslySetInnerHTML={{ __html: landingText }}
  />
);

LandingPage.propTypes = {
  landingText: string,
};

LandingPage.defaultProps = {
  landingText: "",
};

export default LandingPage;
