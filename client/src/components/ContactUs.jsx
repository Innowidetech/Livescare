import React, { useState } from 'react';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        message: '',
    });

    const [formStatus, setFormStatus] = useState('');
    const [errors, setErrors] = useState({});

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Validate form data
    const validateForm = () => {
        const newErrors = {};
        const mobilePattern = /^[0-9]{10}$/; // Assuming a 10-digit mobile number

        // First Name validation
        if (!formData.firstName) {
            newErrors.firstName = 'First name is required';
        }

        // Last Name validation
        if (!formData.lastName) {
            newErrors.lastName = 'Last name is required';
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Mobile Number validation
        if (!formData.mobileNumber) {
            newErrors.mobileNumber = 'Mobile number is required';
        } else if (!mobilePattern.test(formData.mobileNumber)) {
            newErrors.mobileNumber = 'Mobile number must be 10 digits';
        }

        // Message validation
        if (!formData.message) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // If there are no errors, return true
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        if (!validateForm()) {
            setFormStatus('Please fix the errors above.');
            return;
        }

        try {
            // Send form data to the backend
            const response = await fetch('https://livescare.onrender.com/api/user/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),  // Send form data as JSON
            });

            const data = await response.json();
            toast.success('Thank you for your message!')
            if (response.ok) {
                setFormStatus('Thank you for your message!');
                setFormData({ firstName: '', lastName: '', email: '', mobileNumber: '', message: '' }); // Clear the form
            } else {
                setFormStatus(data.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setFormStatus('Error submitting form. Please try again.');
            toast.error(error);
        }
    };

    return (
        <>
         <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
        <div className="flex flex-col items-center py-14">
            <div className="text-start max-w-4xl mx-auto px-4 py-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#14213D] mb-4">Contact Us</h1>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#FFBA48] mb-4">Your Connection Matters to Us
                </h1>
                <p className="text-lg sm:text-lg text-gray-600">
                At LivesCare, we value every opportunity to engage with our community. Whether you're interested in learning more about our mission, joining hands with us, or offering your support, we’re here to listen and assist. Contact us using the form or the information provided below.

                </p>
            </div>

            <div className="bg-[#F7F7F7] w-full py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <form className="p-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* First Name Field */}
                            <div className="flex flex-col gap-4">
                                <label htmlFor="first-name" className="font-semibold text-lg sm:text-lg">First Name</label>
                                <input
                                    type="text"
                                    id="first-name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="border-spacing-1 border-b-2 border-black bg-[#F7F7F7] text-lg sm:text-xl focus:outline-none focus:border-b-2 focus:border-black"

                                    required
                                />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                            </div>

                            {/* Last Name Field */}
                            <div className="flex flex-col gap-4">
                                <label htmlFor="last-name" className="font-semibold text-lg sm:text-lg">Last Name</label>
                                <input
                                    type="text"
                                    id="last-name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                               className="border-spacing-1 border-b-2 border-black bg-[#F7F7F7] text-lg sm:text-xl focus:outline-none focus:border-b-2 focus:border-black"
                                    required
                                />
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Email Field */}
                            <div className="flex flex-col gap-4">
                                <label htmlFor="email" className="font-semibold text-lg sm:text-lg">Email Id</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                   className="border-spacing-1 border-b-2 border-black bg-[#F7F7F7] text-lg sm:text-xl focus:outline-none focus:border-b-2 focus:border-black"
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            {/* Mobile Number Field */}
                            <div className="flex flex-col gap-4">
                                <label htmlFor="mobileNumber" className="font-semibold text-lg sm:text-lg">Mobile Number</label>
                                <input
                                    type="text"
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleInputChange}
                                   className="border-spacing-1 border-b-2 border-black bg-[#F7F7F7] text-lg sm:text-xl focus:outline-none focus:border-b-2 focus:border-black"
                                    required
                                    pattern="^[0-9]{10}$"  // Ensures it matches a 10-digit number
                                />
                                {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber}</p>}
                            </div>
                        </div>

                        {/* Message Field */}
                        <div className="flex flex-col gap-4">
                            <label htmlFor="message" className="font-semibold text-lg sm:text-lg">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                className="p-3 border-2  bg-[#F7F7F7] border-black text-lg sm:text-xl"
                                required
                                rows="4"
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="bg-[#FFBA48] text-white py-3 rounded-md text-lg sm:text-lg px-4 hover:bg-orange-600 mx-auto block"
                        >
                            Send Message
                        </button>
                    </form>
                    {/* {formStatus && <div className="mt-4 text-center text-lg">{formStatus}</div>} */}
                </div>
            </div>
        </div>
        </>
    );
};

export default ContactUs;