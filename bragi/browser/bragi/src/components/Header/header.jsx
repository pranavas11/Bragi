import React from 'react';
import './header.css';

const header = () => {
    return (
        <div className='header'>
            <img src='/bragi_logo.png' alt="Bragi" className='logo' />
            <h1 className='title'>BRAGi</h1>
        </div>
    )
}

export default header;
