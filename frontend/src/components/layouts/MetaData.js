import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = (props) => {
    return (
        <Helmet>
            <title>{props.title}-shopit</title>
        </Helmet>
    )
}

export default MetaData
