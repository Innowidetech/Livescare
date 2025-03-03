import React, { useState } from "react";
import axios from "axios";
import Food1 from "../Assets/food.png";
import Clothes from "../Assets/6.png";
import Books from "../Assets/11.png";
import MedicalLeave from "../Assets/chil5.jpg";
import Toys from "../Assets/toys.png";
import Finacial from "../Assets/finance.png";
import GamesKit from "../Assets/Gamekits.png";
import Other from "../Assets/other.png";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Update ITEM_NAMES to match backend expectations
const ITEM_NAMES = {
  FOOD: "Food",
  CLOTHES: "Clothes",
  EDUCATION: "Education",
  MEDICAL: "Medical",
  TOYS: "Toys",
  MONEY: "Money",
  SKILL: "Games Kit",
  OTHER: "Other",
};

// Display names for UI
const DISPLAY_NAMES = {
  [ITEM_NAMES.FOOD]: "Food",
  [ITEM_NAMES.CLOTHES]: "Clothing",
  [ITEM_NAMES.EDUCATION]: "Education",
  [ITEM_NAMES.MEDICAL]: "Medical Aid",
  [ITEM_NAMES.TOYS]: "Toys & Games",
  [ITEM_NAMES.MONEY]: "Financial Support",
  [ITEM_NAMES.SKILL]: "Games Kit",
  [ITEM_NAMES.OTHER]: "Other Essentials",
};

const DonateNowForm = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [count, setCount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const [donorName, setDonorName] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleFormVisibility = (item) => {
    setSelectedItem(item);
    setIsFormVisible(true);
  };

  const resetForm = () => {
    setDonorName("");
    setCount("");
    setAmount("");
    setMobileNumber("");
    setEmail("");
    setState("");
    setCity("");
    setAddress("");
    setPincode("");
    setDescription("");
    setPaymentMethod("Online");
    setSelectedItem(null);
    setIsFormVisible(false);
  };

  const handleOnlinePayment = async (payload) => {
    try {
      const paymentResponse = await axios.post(
        "https://livescare.onrender.com/api/user/donor",
        payload
      );

      if (!paymentResponse.data.orderId) {
        toast.error("Failed to create Razorpay order");
        return;
      }

      const options = {
        key: "rzp_test_N2JZTugUiv8bEs",
        amount: paymentResponse.data.amount * 100,
        currency: "INR",
        name: "Donation",
        description: `Donation for ${DISPLAY_NAMES[selectedItem]}`,
        order_id: paymentResponse.data.orderId,
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post(
              "https://livescare.onrender.com/api/user/verifyPayment",
              {
                paymentOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }
            );

            if (verifyResponse.data.success) {
              toast.success("Payment successful! Thank you for your donation.");
              resetForm();
            } else {
              toast.error(
                verifyResponse.data.message || "Payment verification failed."
              );
            }
          } catch (error) {
            console.error("Verification Error:", error);
            toast.error(
              error.response?.data?.message ||
                "Payment verification failed. Please try again."
            );
          }
        },
        prefill: {
          name: donorName,
          email,
          contact: mobileNumber,
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: donorName,
        itemName: selectedItem, // This will now use the correct enum value
        mobileNumber,
        email,
        state,
        city,
        address,
        pincode,
        description,
        count: selectedItem === ITEM_NAMES.MONEY ? 1 : parseInt(count, 10), // Always include count
        ...(selectedItem === ITEM_NAMES.MONEY && {
          amount: parseFloat(amount),
          paymentMethod,
        }),
      };

      if (selectedItem === ITEM_NAMES.MONEY && paymentMethod === "Online") {
        await handleOnlinePayment(payload);
      } else {
        const response = await axios.post(
          "https://livescare.onrender.com/api/user/donor",
          payload
        );

        if (response.data) {
          toast.success(
            response.data.message || "Donation request submitted successfully!"
          );
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
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
    <div>
      {/* Background Image and Text Section */}
      <section
        className="relative h-screen bg-fill bg-center bg-cover"
        style={{ backgroundImage: "url(/donation.png)" }}
      >
        <div className="relative z-10 flex items-center justify-center h-full px-6 text-black  ml-9">
          <div className="max-w-lg">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-center zoomIn delay-1s">
              Donate Now!
            </h1>
            <p className="text-xl text-center font-semibold bounce delay-2s">
              Your generosity can change lives. By donating today, you provide
              much-needed support to individuals and communities facing
              hardship. Every contribution counts!
            </p>
          </div>
        </div>
      </section>

      {/* Section for Choosing Items */}
      <section className="bg-[#F7F7F7] py-16 relative">
        <div className="container mx-auto text-start md:text-center px-4 md:px-0 max-w-screen-xl">
          <h2 className="text-4xl font-semibold mt-4 text-center">
            Choose the Items For Donate
          </h2>

          {/* First Row of Donation Options */}
          <div className="flex flex-wrap justify-between items-center mt-12 space-y-8 md:space-y-0 md:flex-nowrap">
            {/* Food */}
            <div className="flex flex-col items-center w-full md:w-1/4 pb-6 md:pb-0 relative mx-2">
              <img
                src={Food1}
                alt="Food"
                className="w-60 h-32 object-cover rounded-full mb-4"
              />
              <p className="text-lg font-semibold text-center">
                {DISPLAY_NAMES[ITEM_NAMES.FOOD]}
              </p>
              <p className="text-center text-sm">
                Delivering nutritious meals to combat hunger and promote health.
              </p>
              <button
                className="text-white bg-[#FCA311]  hover:bg-orange-600  px-10 py-2 mt-6 md:mt-10 lg:mt-20 rounded-md shadow-gray-600 shadow-lg"
                onClick={() => toggleFormVisibility(ITEM_NAMES.FOOD)}
              >
                Donate
              </button>
            </div>

            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Clothing */}
            <div className="flex flex-col items-center w-full md:w-1/4 pb-6 md:pb-0 relative mx-2">
              <img
                src={Clothes}
                alt="Clothing"
                className="w-60 h-32 object-cover rounded-full mb-4"
              />
              <p className="text-lg font-semibold text-center">
                {DISPLAY_NAMES[ITEM_NAMES.CLOTHES]}
              </p>
              <p className="text-center text-sm">
                Offering comfort and dignity with essential apparel.
              </p>
              <button
                className="text-white bg-[#FCA311]  hover:bg-orange-600  px-10 py-2 mt-6 md:mt-10 lg:mt-20 rounded-md shadow-gray-600 shadow-lg"
                onClick={() => toggleFormVisibility(ITEM_NAMES.CLOTHES)}
              >
                Donate
              </button>
            </div>

            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Education */}
            <div className="flex flex-col items-center w-full md:w-1/4 pb-6 md:pb-0 relative mx-2">
              <img
                src={Books}
                alt="Education"
                className="w-60 h-32 object-cover rounded-full mb-4"
              />
              <p className="text-lg font-semibold text-center">
                {DISPLAY_NAMES[ITEM_NAMES.EDUCATION]}
              </p>
              <p className="text-center text-sm">
                Enriching minds with education for a brighter future.
              </p>
              <button
                className="text-white bg-[#FCA311]  hover:bg-orange-600   px-10 py-2 mt-6 md:mt-10 lg:mt-20 rounded-md shadow-gray-600 shadow-lg"
                onClick={() => toggleFormVisibility(ITEM_NAMES.EDUCATION)}
              >
                Donate
              </button>
            </div>

            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Medical Aid */}
            <div className="flex flex-col items-center w-full md:w-1/4 pb-6 md:pb-0 mx-2">
              <img
                src={MedicalLeave}
                alt="Medical Aid"
                className="w-60 h-32 object-cover rounded-full mb-4"
              />
              <p className="text-lg font-semibold text-center">
                {DISPLAY_NAMES[ITEM_NAMES.MEDICAL]}
              </p>
              <p className="text-center text-sm">
                Providing crucial healthcare for those in need.
              </p>
              <button
                className="text-white bg-[#FCA311]  hover:bg-orange-600   px-10 py-2 mt-6 md:mt-10 lg:mt-20 rounded-md shadow-gray-600 shadow-lg"
                onClick={() => toggleFormVisibility(ITEM_NAMES.MEDICAL)}
              >
                Donate
              </button>
            </div>
          </div>

          {/* Second Row of Donation Options */}
          <div className="flex flex-wrap justify-between items-center mt-12 space-y-8 md:space-y-0 md:flex-nowrap">
            {/* Toys & Games */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 relative mx-2">
              <img
                src={Toys}
                alt="Toys & Games"
                className="w-60 h-32 object-cover rounded-full mb-4"
              />
              <p className="text-lg font-semibold">
                {DISPLAY_NAMES[ITEM_NAMES.TOYS]}
              </p>
              <p className="text-sm text-center">
                Bringing happiness to children through meaningful play.
              </p>
              <button
                className="text-white bg-[#FCA311]  hover:bg-orange-600  px-10 py-2 mt-10 md:mt-10 lg:mt-20 rounded-md shadow-gray-600 shadow-lg"
                onClick={() => toggleFormVisibility(ITEM_NAMES.TOYS)}
              >
                Donate
              </button>
            </div>

            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Financial Support */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 relative mx-2">
              <img
                src={Finacial}
                alt="Financial Support"
                className="w-60 h-32 object-cover rounded-full mb-4"
              />
              <p className="text-lg font-semibold">
                {DISPLAY_NAMES[ITEM_NAMES.MONEY]}
              </p>
              <p className="text-sm text-center">
                MFunding initiatives to uplift communities.
              </p>
              <button
                className="text-white bg-[#FCA311]  hover:bg-orange-600   px-10 py-2 mt-10 md:mt-10 lg:mt-20 rounded-md shadow-gray-600 shadow-lg"
                onClick={() => toggleFormVisibility(ITEM_NAMES.MONEY)}
              >
                Donate
              </button>
            </div>

            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Skill Development */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 relative mx-2">
              <img
                src={GamesKit}
                alt="Games Kit"
                className="w-60 h-32 object-cover rounded-full mb-4"
              />
              <p className="text-lg font-semibold">
                {DISPLAY_NAMES[ITEM_NAMES.SKILL]}
              </p>
              <p className="text-sm text-center">
                Fostering creativity and development through fun.
              </p>
              <button
                className="text-white bg-[#FCA311]  hover:bg-orange-600   px-10 py-2 mt-10 md:mt-10 lg:mt-20 rounded-md shadow-gray-600 shadow-lg"
                onClick={() => toggleFormVisibility(ITEM_NAMES.SKILL)}
              >
                Donate
              </button>
            </div>

            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Other Essentials */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 mx-2">
              <img
                src={Other}
                alt="Other Essentials"
                className="w-60 h-32 object-cover rounded-full mb-4"
              />
              <p className="text-lg font-semibold">
                {DISPLAY_NAMES[ITEM_NAMES.OTHER]}
              </p>
              <p className="text-sm text-center">
                Supplying vital hygiene and emergency relief items.
              </p>
              <button
                className="text-white bg-[#FCA311]  hover:bg-orange-600  px-10 py-2 mt-10 md:mt-10 lg:mt-20 rounded-md shadow-gray-600 shadow-lg"
                onClick={() => toggleFormVisibility(ITEM_NAMES.OTHER)}
              >
                Donate
              </button>
            </div>
          </div>

          {/* Donation Form Overlay */}
          {isFormVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20 overflow-hidden">
              <div className="bg-white rounded-lg shadow-lg w-3/4 sm:w-1/2 lg:w-2/5 relative max-h-[85vh] flex flex-col mt-20">
                <h2 className="text-2xl font-semibold p-6 border-b">
                  Donate for {DISPLAY_NAMES[selectedItem]}
                </h2>

                {/* Form content with scroll */}
                <div className="overflow-y-auto p-6 flex-grow">
                  <form
                    className="flex flex-col space-y-4"
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="donor-name"
                        className="block text-lg text-left"
                      >
                        Donor Name
                      </label>
                      <input
                        type="text"
                        id="donor-name"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        required
                      />
                    </div>

                    {selectedItem === ITEM_NAMES.MONEY ? (
                      <>
                        <div className="mb-4">
                          <label
                            htmlFor="amount"
                            className="block text-lg text-left"
                          >
                            Amount
                          </label>
                          <input
                            type="number"
                            id="amount"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="payment-method"
                            className="block text-lg text-left"
                          >
                            Payment Method
                          </label>
                          <select
                            id="payment-method"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            required
                          >
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                          </select>
                        </div>
                      </>
                    ) : (
                      <div className="mb-4">
                        <label
                          htmlFor="num-items"
                          className="block text-lg text-left"
                        >
                          Number of Items
                        </label>
                        <input
                          type="number"
                          id="num-items"
                          className="w-full p-2 border border-gray-300 rounded"
                          value={count}
                          onChange={(e) => setCount(e.target.value)}
                          required
                        />
                      </div>
                    )}

                    <div className="mb-4">
                      <label
                        htmlFor="phone-number"
                        className="block text-lg text-left"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone-number"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        pattern="^\+?[1-9]\d{1,14}$"
                        required
                      />
                      <small className="text-gray-500">
                        Please enter a valid phone number (e.g., +1234567890)
                      </small>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-lg text-left"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="state"
                        className="block text-lg text-left"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="city" className="block text-lg text-left">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="address"
                        className="block text-lg text-left"
                      >
                        Address
                      </label>
                      <textarea
                        id="address"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="pincode"
                        className="block text-lg text-left"
                      >
                        Pincode
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        pattern="[0-9]{6}"
                        required
                      />
                      <small className="text-gray-500">
                        Please enter a valid 6-digit pincode
                      </small>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="description"
                        className="block text-lg text-left"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add any additional details about your donation..."
                      />
                    </div>
                  </form>
                </div>

                {/* Fixed footer for buttons */}
                <div className="border-t p-4 bg-white">
                  <div className="text-center">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={loading}
                      className={`text-white bg-[#FCA311] px-10 py-2 rounded-md shadow-gray-600 shadow-lg ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? (
                        <span>Processing...</span>
                      ) : selectedItem === ITEM_NAMES.MONEY ? (
                        "Proceed to Payment"
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </div>

                {/* Close button */}
                <button
                  className="absolute top-2 right-2 text-3xl font-bold text-gray-600 hover:text-gray-900 bg-white p-2 rounded-full"
                  onClick={() => setIsFormVisible(false)}
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
    </>
  );
};

export default DonateNowForm;
