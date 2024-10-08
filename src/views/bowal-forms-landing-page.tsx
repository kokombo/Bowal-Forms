import LandingFooter from "@/components/containers/landing-footer";
import Hero from "@/components/containers/hero";
import LandingSection from "@/components/containers/landing-section";
import LandingPageNavbar from "@/components/containers/landing-page-navbar";
import images from "@/lib/constants";
import { Fragment } from "react";

const BowalFormsLandingPage = () => {
  return (
    <Fragment>
      <LandingPageNavbar />
      <Hero />
      <LandingSection
        image={images.hero}
        heading="Create an online form as easily as creating a document"
        paragraph="Select from multiple question types, drag-and-drop to reorder questions, and customize values as easily as pasting a list."
        className="md:flex-row-reverse"
      />
      <LandingSection
        image={images.hero}
        heading="Send polished surveys and forms"
        paragraph="Customize colors, images, and fonts to adjust the look and feel or reflect your organization’s branding. And add custom logic that shows questions based on answers, for a more seamless experience."
        className="md:flex-row"
      />
      <LandingSection
        image={images.hero}
        heading="Analyze responses with automatic summaries"
        paragraph="See charts with response data update in real-time. Or open the raw data with Google Sheets for deeper analysis or automation."
        className="md:flex-row-reverse"
      />
      <LandingSection
        image={images.hero}
        heading="Send polished surveys and forms"
        paragraph="Customize colors, images, and fonts to adjust the look and feel or reflect your organization’s branding. And add custom logic that shows questions based on answers, for a more seamless experience."
        className="md:flex-row"
      />
      <LandingFooter />
    </Fragment>
  );
};

export default BowalFormsLandingPage;
