import React, { Fragment } from "react";
import Head from "next/head";

const View2 = ({ title, children }) => {
    return (
      <Fragment>
        <Head>
          <title key="title-tag">{title}</title>
          <meta
            key="title-meta"
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link href="../styles/Content.css" rel="stylesheet" />
        </Head>
        {children}
      </Fragment>
    );
  };
  
  export default View2;