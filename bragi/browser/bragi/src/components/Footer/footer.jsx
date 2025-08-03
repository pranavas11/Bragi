import React from 'react';
import { NavLink } from 'react-router-dom';
import './footer.css';

const Footer = () => {
    return (
        <div className='footer-container'>
            <h3 className='footer-title'><u>Meet the Team</u></h3>
            <div className='contributors'>
                <div className='contributor'>
                    <img src='/pranav.jpg' alt='Contributor 1' className='contributor-image' />
                    <p style={{color: 'lightgreen', fontWeight: 'bold'}}>Pranav Prabhu</p>
                    <p className='role'>Frontend Developer</p>
                    <a href="mailto:ppranavas01@gmail.com">ppranavas01@gmail.com</a>
                </div>

                <div className='contributor'>
                    <img src='/contributor2.png' alt='Contributor 2' className='contributor-image' />
                    <p style={{color: 'orange', fontWeight: 'bold'}}>Preetam D'Souza</p>
                    <p className='role'>Backend Developer</p>
                    <a href="mailto:preetamjdsouza@gmail.com">preetamjdsouza@gmail.com</a>
                </div>
                
                <div className='contributor'>
                    <img src='/contributor3.png' alt='Contributor 3' className='contributor-image' />
                    <p style={{color: 'chocolate', fontWeight: 'bold'}}>Sylesh Suresh</p>
                    <p className='role'>Machine Learning Developer</p>
                    <a href="mailto:syleshkyle@gmail.com">syleshkyle@gmail.com</a>
                </div>
            </div>

            <div className='contact-us'>
                <NavLink to='/contact' className='contact-link'>Contact Us</NavLink>
            </div>
        </div>
    )
}

export default Footer;