import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faPlus } from '@fortawesome/free-solid-svg-icons'; // Import specific icon (faPlus)

const OnlineDonationForm = () => {
    const [isAddNewCardVisible, setIsAddNewCardVisible] = useState(false);

    // Function to handle button click and open the external bank URL
    const handleBankClick = (bankName) => {
        if (bankName === 'axis-bank') {
            // Redirect to Axis Bank donation page
            window.location.href = 'https://www.axisbank.com/donations'; // Replace with the actual Axis Bank donation link
        } else if (bankName === 'visa') {
            // Redirect to Visa donation page
            window.location.href = 'https://www.visa.com/donations'; // Replace with the actual Visa donation link
        }
    };

    const toggleAddNewCard = () => {
        setIsAddNewCardVisible(!isAddNewCardVisible);
    };

    return (
        <div className="py-16 px-6 sm:px-12">
           
            <div className="max-w-2xl mx-auto space-y-8">
                {/* Credit/Debit Card Section */}
                <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-left">
                     Credit & Debit Cards
                    </h3>

                    {/* Axis Bank Button */}
                    <button
                        onClick={() => handleBankClick('axis-bank')}
                        className="flex items-center space-x-4 border border-gray-300 rounded-2xl p-3 w-full hover:bg-blue-500 transition duration-300"
                    >
                        <img
                            src="/Assets/mastercard.png" // Replace with the actual Axis Bank icon path
                            alt="Axis Bank"
                            className="h-7 w-auto"
                        />
                        <span className="font-semibold text-lg text-gray-600">
                            Axis Bank **** **** ****8395
                        </span>
                    </button>

                    {/* Visa Button */}
                    <button
                        onClick={() => handleBankClick('visa')}
                        className="flex items-center space-x-4 border border-gray-300 rounded-2xl p-3 w-full hover:bg-blue-500 transition duration-300"
                    >
                        <img
                            src="/Assets/viza.png" // Replace with the actual Visa icon path
                            alt="Visa"
                            className="h-7 w-auto"
                        />
                        <span className="font-semibold text-lg text-gray-600">
                            HDFC Bank **** **** ****6246
                        </span>
                    </button>

                    {/* Add New Card Section */}
                    <div className="flex items-center mt-4">
                        {/* Button with icon on the left and text on the right */}
                        <button
                            type="button"
                            onClick={toggleAddNewCard}
                            className="flex items-center bg-blue-300 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300"
                        >
                            <FontAwesomeIcon icon={faPlus} className="h-5 w-5 mr-2" />
                            Add New Card
                        </button>
                    </div>

                    {isAddNewCardVisible && (
                        <div className="mt-4 space-y-4 bg-gray-50 p-6 rounded-lg">
                            <h4 className="text-xl font-semibold text-center mb-4">Enter New Card Details</h4>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="card-number" className="block text-sm font-semibold text-gray-600">Card Number</label>
                                    <input
                                        type="text"
                                        id="card-number"
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        placeholder="Enter card number"
                                    />
                                </div>

                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <label htmlFor="expiry-date" className="block text-sm font-semibold text-gray-600">Expiry Date</label>
                                        <input
                                            type="text"
                                            id="expiry-date"
                                            className="w-full p-3 border border-gray-300 rounded-lg"
                                            placeholder="MM/YY"
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label htmlFor="cvv" className="block text-sm font-semibold text-gray-600">CVV</label>
                                        <input
                                            type="text"
                                            id="cvv"
                                            className="w-full p-3 border border-gray-300 rounded-lg"
                                            placeholder="CVV"
                                        />
                                    </div>
                                    
                                    
                                </div>
                                <div>
                                    <label htmlFor="card-holder-name" className="block text-sm font-semibold text-gray-600">
                                        Card Holder's Name
                                    </label>
                                    <input
                                        type="text"
                                        id="card-holder-name"
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        placeholder="Enter card holder's name"
                                    />
                                </div>
                                <div className="flex justify-center items-center w-full">
                                    <button className='flex items-center bg-[#FCA311] py-3 px-10 rounded-lg'>
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* UPI Payment Section */}
                <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-left">
                        UPI
                    </h3>
                    <div className="flex flex-col space-y-4 items-start w-full">
                        {/* Google Pay Button */}
                        <button
                            onClick={() => window.location.href = 'https://pay.google.com/'}
                            className="flex items-center space-x-2  bg-white text-gray-500  py-3 px-4 rounded-lg border border-black hover:bg-blue-600 transition duration-300 w-full"
                        >
                            <img
                                src="/Assets/googlepay.avif"
                                alt="Google Pay"
                                className="h-8 w-auto"
                            />
                            <span className="font-semibold">Google Pay</span>
                        </button>

                        {/* PhonePe Button */}
                        <button
                            onClick={() => window.location.href = 'https://www.phonepe.com/'}
                            className="flex items-center space-x-2 bg-white text-gray-500 py-3 border border-black px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
                        >
                            <img
                                src="/Assets/phonepe-icon.webp"
                                alt="PhonePe"
                                className="h-8 w-auto"
                            />
                            <span className="font-semibold">PhonePe</span>
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default OnlineDonationForm;