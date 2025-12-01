import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaCreditCard,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarker,
  FaCheck,
  FaSpinner,
  FaExclamationTriangle,
} from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

// Use Vite-style env var; fallback to live URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { planType, planName, price } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    pincode: '',
    requirements: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);

  // refs for polling + guarding success popup
  const pollingIntervalRef = useRef(null);
  const paymentTimeoutRef = useRef(null);
  const hasShownSuccessRef = useRef(false);

  useEffect(() => {
    if (!planType || !price) {
      navigate('/pricing');
    }
  }, [planType, price, navigate]);

  useEffect(() => {
    // cleanup on unmount
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
      if (paymentTimeoutRef.current) {
        clearTimeout(paymentTimeoutRef.current);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateGST = () => {
    return Math.round(price * 0.18);
  };

  const calculateTotal = () => {
    const gst = calculateGST();
    return price + gst;
  };

  const createCashfreeOrder = async () => {
    try {
      setIsCreatingOrder(true);
      
      const gstAmount = calculateGST();
      const totalAmount = calculateTotal();
      
      const orderData = {
        customerDetails: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
          requirements: formData.requirements
        },
        packageDetails: {
          planType: planType,
          planName: planName,
          basePrice: price,
          gstAmount: gstAmount,
          totalAmount: totalAmount
        }
      };

      console.log('Creating order with data:', orderData);

      const response = await axios.post(
        `${API_BASE_URL}/api/web-payment/create-web-order`,
        orderData
      );
      
      if (response.data.success) {
        setOrderDetails(response.data);
        setShowPaymentModal(true);
        setPaymentStatus('redirecting');
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      Swal.fire({
        icon: 'error',
        title: 'Order Failed',
        text: error.response?.data?.message || error.message || 'Unable to create order. Please try again.'
      });
      throw error;
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const verifyPayment = async (orderId) => {
    try {
      setIsVerifyingPayment(true);
      const response = await axios.post(
        `${API_BASE_URL}/api/web-payment/verify-web-payment`,
        { orderId }
      );

      if (response.data.success) {
        // stop polling and timeout as soon as it's verified
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }
        if (paymentTimeoutRef.current) {
          clearTimeout(paymentTimeoutRef.current);
          paymentTimeoutRef.current = null;
        }

        setPaymentStatus('success');

        if (!hasShownSuccessRef.current) {
          hasShownSuccessRef.current = true;
          setShowPaymentModal(false);

          // SweetAlert success popup
          Swal.fire({
            icon: 'success',
            title: 'Payment successful!',
            text: 'You will receive a confirmation email shortly.',
            confirmButtonText: 'Go to Home',
            confirmButtonColor: '#003459',
            background: '#0d1933',
            color: '#ffffff'
          }).then(() => {
            navigate('/');
          });
        }
      } else {
        setPaymentStatus('pending');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      setPaymentStatus('failed');
      Swal.fire({
        icon: 'error',
        title: 'Payment failed',
        text: 'There was an issue verifying your payment. Please try again.'
      });
    } finally {
      setIsVerifyingPayment(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const order = await createCashfreeOrder();
      
      if (order && order.paymentLink) {
        // Open payment link in new tab
        window.open(order.paymentLink, '_blank');
        
        // Start polling for payment verification
        pollingIntervalRef.current = setInterval(() => {
          if (order.orderId) {
            verifyPayment(order.orderId);
          }
        }, 5000); // Check every 5 seconds

        // Stop polling after 5 minutes
        paymentTimeoutRef.current = setTimeout(() => {
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }
          if (paymentStatus !== 'success') {
            setPaymentStatus('timeout');
          }
        }, 300000); // 5 minutes
      }
    } catch (error) {
      console.error('Error processing order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentModalClose = () => {
    setShowPaymentModal(false);
    // if they close while pending, they can still restart payment from pricing
  };

  const getPlanFeatures = () => {
    const features = {
      economy: [
        'One page website',
        '500 MB hosting',
        'Mobile responsive design',
        'Enquiry form',
        'Click to call option',
        '1 Content revision'
      ],
      professional: [
        '5 page web design',
        '1 GB hosting',
        '2 Business emails',
        'Professional SSL certificate',
        'Mobile responsive',
        'WhatsApp Chat options',
        '2 Content revisions'
      ],
      cms: [
        'CMS admin login',
        'Up to 10 pages',
        '1 GB hosting',
        '2 Business emails',
        'Professional SSL certificate',
        'WhatsApp Chat options',
        '3 Content revisions'
      ]
    };
    
    return features[planType] || features.economy;
  };

  const getPlanBadgeColor = () => {
    switch(planType) {
      case 'economy': return 'bg-[#e3f2fd] text-[#0d1933]';
      case 'professional': return 'bg-[#fff3e0] text-[#f57c00]';
      case 'cms': return 'bg-[#e8f5e8] text-[#388e3c]';
      default: return 'bg-[#e3f2fd] text-[#0d1933]';
    }
  };

  if (!planType || !price) {
    return null;
  }

  const gstAmount = calculateGST();
  const totalAmount = calculateTotal();

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-[#0d1933] via-[#100232] to-[#0d1933] py-12 md:py-20">
        <Container>
          <Button 
            variant="outline-light" 
            className="mt-8 md:mt-12 mb-8 border-none bg-white/10 backdrop-blur-lg text-white px-6 py-3 rounded-full hover:bg-white/20 hover:-translate-x-1 transition-all duration-300 font-['Poppins']"
            onClick={() => navigate('/pricing')}
          >
            <FaArrowLeft className="mr-2" />
            Back to Pricing
          </Button>

          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Poppins']">
                  Complete Your Order
                </h1>
                <p className="text-xl text-gray-300 font-['Poppins']">
                  You're purchasing: <span className="font-semibold text-white">{planName}</span>
                </p>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="border-none rounded-2xl shadow-2xl bg-white/95 backdrop-blur-lg overflow-hidden">
                <Card.Body className="p-0">
                  <Row className="m-0">
                    {/* Order Summary */}
                    <Col md={5} className="p-6 md:p-8 bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] border-r border-gray-200">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-800 font-['Poppins']">
                          Order Summary
                        </h3>
                      </div>
                      
                      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 text-center relative">
                        <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full text-sm font-semibold uppercase ${getPlanBadgeColor()}`}>
                          {planType.charAt(0).toUpperCase() + planType.slice(1)}
                        </div>
                        <h4 className="text-xl font-semibold text-gray-800 mt-4 mb-2 font-['Poppins']">
                          {planName}
                        </h4>
                        <div className="text-3xl font-bold text-[#0d1933] my-3 font-['Poppins']">
                          ₹{price.toLocaleString('en-IN')}
                        </div>
                        <p className="text-gray-600 text-sm font-['Poppins']">
                          One-time payment
                        </p>
                      </div>

                      <div className="mb-8">
                        <h5 className="text-lg font-semibold text-gray-800 mb-4 font-['Poppins']">
                          What's Included:
                        </h5>
                        <ul className="space-y-3">
                          {getPlanFeatures().map((feature, index) => (
                            <li key={index} className="flex items-start text-gray-700 font-['Poppins']">
                              <FaCheck className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white p-5 rounded-xl shadow-md">
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <span className="text-gray-700 font-['Poppins']">Subtotal:</span>
                          <span className="font-medium font-['Poppins']">₹{price.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <span className="text-gray-700 font-['Poppins']">GST (18%):</span>
                          <span className="font-medium font-['Poppins']">₹{gstAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 pt-4 border-t-2 border-[#0d1933] mt-3">
                          <span className="text-lg font-bold text-gray-800 font-['Poppins']">Total Amount:</span>
                          <span className="text-xl font-bold text-gray-800 font-['Poppins']">
                            ₹{totalAmount.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </Col>

                    {/* Checkout Form */}
                    <Col md={7} className="p-6 md:p-8">
                      <Form onSubmit={handleSubmit}>
                        <div className="mb-8 pb-6 border-b border-gray-200">
                          <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center font-['Poppins']">
                            <FaUser className="mr-3 text-[#0d1933]" />
                            Personal Information
                          </h4>
                          
                          <Form.Group className="mb-4">
                            <Form.Label className="font-semibold text-gray-700 mb-2 font-['Poppins']">
                              Full Name *
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              isInvalid={!!errors.fullName}
                              placeholder="Enter your full name"
                              className="rounded-xl py-3 px-4 border-2 border-gray-200 focus:border-[#0d1933] focus:ring-2 focus:ring-[#0d1933]/25 transition-all duration-300 font-['Poppins']"
                            />
                            <Form.Control.Feedback type="invalid" className="font-['Poppins']">
                              {errors.fullName}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-4">
                                <Form.Label className="font-semibold text-gray-700 mb-2 font-['Poppins']">
                                  Email Address *
                                </Form.Label>
                                <Form.Control
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  isInvalid={!!errors.email}
                                  placeholder="your@email.com"
                                  className="rounded-xl py-3 px-4 border-2 border-gray-200 focus:border-[#0d1933] focus:ring-2 focus:ring-[#0d1933]/25 transition-all duration-300 font-['Poppins']"
                                />
                                <Form.Control.Feedback type="invalid" className="font-['Poppins']">
                                  {errors.email}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-4">
                                <Form.Label className="font-semibold text-gray-700 mb-2 font-['Poppins']">
                                  Phone Number *
                                </Form.Label>
                                <Form.Control
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  isInvalid={!!errors.phone}
                                  placeholder="+91 9876543210"
                                  className="rounded-xl py-3 px-4 border-2 border-gray-200 focus:border-[#0d1933] focus:ring-2 focus:ring-[#0d1933]/25 transition-all duration-300 font-['Poppins']"
                                />
                                <Form.Control.Feedback type="invalid" className="font-['Poppins']">
                                  {errors.phone}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </Row>

                          <Form.Group className="mb-4">
                            <Form.Label className="font-semibold text-gray-700 mb-2 font-['Poppins']">
                              Company Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              placeholder="Your company name (optional)"
                              className="rounded-xl py-3 px-4 border-2 border-gray-200 focus:border-[#0d1933] focus:ring-2 focus:ring-[#0d1933]/25 transition-all duration-300 font-['Poppins']"
                            />
                          </Form.Group>
                        </div>

                        <div className="mb-8 pb-6 border-b border-gray-200">
                          <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center font-['Poppins']">
                            <FaMapMarker className="mr-3 text-[#0d1933]" />
                            Address Information
                          </h4>
                          
                          <Form.Group className="mb-4">
                            <Form.Label className="font-semibold text-gray-700 mb-2 font-['Poppins']">
                              Address *
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              isInvalid={!!errors.address}
                              placeholder="Enter your complete address"
                              className="rounded-xl py-3 px-4 border-2 border-gray-200 focus:border-[#0d1933] focus:ring-2 focus:ring-[#0d1933]/25 transition-all duration-300 font-['Poppins']"
                            />
                            <Form.Control.Feedback type="invalid" className="font-['Poppins']">
                              {errors.address}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-4">
                                <Form.Label className="font-semibold text-gray-700 mb-2 font-['Poppins']">
                                  City *
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name="city"
                                  value={formData.city}
                                  onChange={handleInputChange}
                                  isInvalid={!!errors.city}
                                  placeholder="Your city"
                                  className="rounded-xl py-3 px-4 border-2 border-gray-200 focus:border-[#0d1933] focus:ring-2 focus:ring-[#0d1933]/25 transition-all duration-300 font-['Poppins']"
                                />
                                <Form.Control.Feedback type="invalid" className="font-['Poppins']">
                                  {errors.city}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-4">
                                <Form.Label className="font-semibold text-gray-700 mb-2 font-['Poppins']">
                                  Pincode *
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name="pincode"
                                  value={formData.pincode}
                                  onChange={handleInputChange}
                                  isInvalid={!!errors.pincode}
                                  placeholder="600001"
                                  className="rounded-xl py-3 px-4 border-2 border-gray-200 focus:border-[#0d1933] focus:ring-2 focus:ring-[#0d1933]/25 transition-all duration-300 font-['Poppins']"
                                />
                                <Form.Control.Feedback type="invalid" className="font-['Poppins']">
                                  {errors.pincode}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </Row>
                        </div>

                        <div className="mb-8">
                          <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center font-['Poppins']">
                            <FaEnvelope className="mr-3 text-[#0d1933]" />
                            Project Requirements
                          </h4>
                          
                          <Form.Group className="mb-4">
                            <Form.Label className="font-semibold text-gray-700 mb-2 font-['Poppins']">
                              Additional Requirements
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={4}
                              name="requirements"
                              value={formData.requirements}
                              onChange={handleInputChange}
                              placeholder="Tell us about your project requirements, preferred colors, any specific features you need, etc."
                              className="rounded-xl py-3 px-4 border-2 border-gray-200 focus:border-[#0d1933] focus:ring-2 focus:ring-[#0d1933]/25 transition-all duration-300 font-['Poppins']"
                            />
                          </Form.Group>
                        </div>

                        <div className="bg-gray-50 p-5 rounded-xl mb-6">
                          <Form.Check
                            type="checkbox"
                            id="terms-agreement"
                            label={
                              <span className="font-['Poppins']">
                                I agree to the <Link to="/terms-conditions" className="text-[#6666CC] hover:underline">Terms & Conditions</Link> and <Link to="/privacy-policy" className="text-[#6666CC] hover:underline">Privacy Policy</Link>
                              </span>
                            }
                            required
                            className="font-['Poppins']"
                          />
                        </div>

                        <Button
                          type="submit"
                          variant="primary"
                          className="w-full text-white py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-[#003459] to-[#0d1933] border-none hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0d1933]/30 transition-all duration-300 mb-4 font-['Poppins']"
                          disabled={isSubmitting || isCreatingOrder}
                          size="lg"
                        >
                          {(isSubmitting || isCreatingOrder) ? (
                            <>
                              <FaSpinner className="inline animate-spin mr-3" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <FaCreditCard className="inline mr-3" />
                              Proceed to Payment - ₹{totalAmount.toLocaleString('en-IN')}
                            </>
                          )}
                        </Button>

                        <p className="text-center text-gray-600 text-sm font-['Poppins']">
                          🔒 Your information is secure and encrypted
                        </p>
                      </Form>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Payment Status Modal */}
      <Modal 
        show={showPaymentModal} 
        onHide={handlePaymentModalClose}
        centered
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="border-b-0">
          <Modal.Title className="font-['Poppins']">
            {paymentStatus === 'failed'
              ? 'Payment Failed'
              : paymentStatus === 'timeout'
              ? 'Payment Timeout'
              : 'Processing Your Payment'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-5 bg-gradient-to-b from-[#f7f8ff] to-white">
          {paymentStatus === 'failed' ? (
            <>
              <FaExclamationTriangle className="text-red-500 text-5xl mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-3 font-['Poppins']">Payment Failed</h4>
              <p className="text-gray-600 mb-4 font-['Poppins']">
                There was an issue processing your payment. Please try again.
              </p>
              <Button 
                variant="primary"
                onClick={() => window.open(orderDetails?.paymentLink, '_blank')}
                className="font-['Poppins']"
              >
                Retry Payment
              </Button>
            </>
          ) : paymentStatus === 'timeout' ? (
            <>
              <FaExclamationTriangle className="text-yellow-500 text-5xl mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-3 font-['Poppins']">Payment Timeout</h4>
              <p className="text-gray-600 mb-4 font-['Poppins']">
                We couldn’t confirm your payment within the expected time. If the amount was debited, please contact support.
              </p>
              <Button 
                variant="primary"
                onClick={() => window.open(orderDetails?.paymentLink, '_blank')}
                className="font-['Poppins']"
              >
                Try Again
              </Button>
            </>
          ) : isVerifyingPayment ? (
            <>
              <FaSpinner className="text-[#0d1933] text-5xl mb-4 mx-auto animate-spin" />
              <h4 className="text-xl font-semibold mb-3 font-['Poppins']">Verifying Payment...</h4>
              <p className="text-gray-600 mb-1 font-['Poppins']">
                Please wait while we verify your payment with the bank.
              </p>
              <p className="text-xs text-gray-500 font-['Poppins']">
                Do not close this window until the process is complete.
              </p>
            </>
          ) : (
            <>
              <FaCreditCard className="text-[#0d1933] text-5xl mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-3 font-['Poppins']">Redirecting to Payment</h4>
              <p className="text-gray-600 mb-4 font-['Poppins']">
                You will be redirected to Cashfree&apos;s secure payment page to complete your transaction.
                Please don&apos;t close this window until payment is complete.
              </p>
              <Button 
                variant="primary"
                onClick={() => window.open(orderDetails?.paymentLink, '_blank')}
                className="font-['Poppins'] mb-3"
              >
                Open Payment Page
              </Button>
              <p className="text-sm text-gray-500 font-['Poppins']">
                If the page doesn&apos;t open automatically, click the button above.
              </p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CheckoutPage;
