import React from 'react'
import PropTypes from 'prop-types'

function Container(props) {
    const { element, children } = props;

    switch (element) {
        case 'footer':
            return <footer {...props}>{children}</footer>
        case 'main':
            return <main {...props}>{children}</main>
        default:
            return <div  {...props}>{children}</div>
    }
}

Container.propTypes = {
    element: PropTypes.string,
    children: PropTypes.node
}

Container.defaultProps = {
    element: 'div'
}

export default Container;

