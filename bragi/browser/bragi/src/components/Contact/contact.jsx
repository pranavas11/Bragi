import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    
    // Form validation regex patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const namePattern = /^[a-zA-Z\s]+$/;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        let errors = {};
        if (!namePattern.test(formData.name)) {
            errors.name = "Please enter a valid name (letters and spaces only)";
        }
        if (!emailPattern.test(formData.email)) {
            errors.email = "Please enter a valid email address";
        }
        if (formData.message.trim() === "") {
            errors.message = "Please enter your message";
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        try {
            const response = await fetch('http://localhost:5000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setFormSubmitted(true);
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (formSubmitted) {
        return (
            <div className='thank-you-message'>
                <h2>Thank you for your message, {formData.name}!</h2>
                <p style={{ color: 'blue' }}>We will get back to you soon!</p>
                <div className='return-home'>
                    <button className='home-button'>
                        <p><a href="/" className='home-link'>Return Home</a></p>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='contact-container'>
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit} className='contact-form'>
                <div className='form-group'>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        required
                    />
                    {errors.name && <span className='error'>{errors.name}</span>}
                </div>

                <div className='form-group'>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your Email"
                        required
                    />
                    {errors.email && <span className='error'>{errors.email}</span>}
                </div>

                <div className='form-group'>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Your Message"
                        required
                    ></textarea>
                    {errors.message && <span className='error'>{errors.message}</span>}
                </div>

                <button type="submit" className='submit-button'>Submit</button>
            </form>
        </div>
    );
}

export default Contact;