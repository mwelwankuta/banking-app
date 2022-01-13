import React from 'react'
import { Helmet } from "react-helmet";

function Head({ title, description }) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
    )
}

Head.defaultProps = {
    title: "Shout",
    description: "Money Made Easy"
}

export default Head;
