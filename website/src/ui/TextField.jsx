import React from 'react'

function TextField(props) {
    return (
        <input {...props} style={styles.input} />
    )
}

const styles = {
    input: {
        backgroundColor: 'white',
        borderRadius: 3,
        border: '1px solid #ddd',
        padding: '4px 10px',
        width: '100%',
        ':focus': {
            backgroundColor: 'red'
        }
    },
}

export default TextField;
