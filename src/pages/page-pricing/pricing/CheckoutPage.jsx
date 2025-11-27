import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCreditCard, FaUser, FaEnvelope, FaPhone, FaMapMarker, FaCheck, FaGlobe } from 'react-icons/fa';
import styles from './checkout.module.css';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { planType, price, planName, currency = 'INR' } = location.state || {};

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
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('info');

  useEffect(() => {
    if (!planType || !price) {
      navigate('/pricing');
    }
  }, [planType, price, navigate]);

  // Show alert message
  const showAlertMessage = (message, type = 'info') => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  // Calculate prices
  const calculateGST = (basePrice) => {
    const gst = parseFloat(basePrice) * 0.18;
    return currency === 'INR' ? Math.round(gst) : parseFloat(gst.toFixed(2));
  };

  const calculateTotal = (basePrice) => {
    const total = parseFloat(basePrice) * 1.18;
    return currency === 'INR' ? Math.round(total) : parseFloat(total.toFixed(2));
  };

  const getCurrencySymbol = () => {
    return currency === 'INR' ? '₹' : '$';
  };

  const formatPrice = (amount) => {
    return currency === 'INR' 
      ? amount.toLocaleString('en-IN') 
      : amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

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
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (Indian numbers)
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (formData.phone && !phoneRegex.test(cleanPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
    }

    // Pincode validation
    const pincodeRegex = /^\d{6}$/;
    if (formData.pincode && !pincodeRegex.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Fetch API - Create Web Order
  const createWebOrder = async (orderData) => {
    try {
      const response = await fetch(`${API_URL}/api/web-payment/create-web-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create order');
      }

      return data;
    } catch (error) {
      throw new Error(error.message || 'Network error occurred');
    }
  };

  // ✅ Fetch API - Verify Payment
  const verifyPayment = async (orderId) => {
    try {
      const response = await fetch(`${API_URL}/api/web-payment/verify-web-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Payment verification failed');
      }

      return data;
    } catch (error) {
      throw new Error(error.message || 'Network error during verification');
    }
  };

  // ✅ Handle Payment
  const handlePayment = async (orderData) => {
    try {
      setPaymentProcessing(true);
      showAlertMessage('Creating your order...', 'info');
      
      const result = await createWebOrder(orderData);
      
      if (result.success) {
        setOrderId(result.orderId);
        showAlertMessage('Redirecting to payment gateway...', 'info');
        
        // Open payment in new tab
        const paymentWindow = window.open(result.paymentLink, '_blank');
        
        if (paymentWindow) {
          // Start polling for payment status
          startPaymentPolling(result.orderId);
        } else {
          throw new Error('Please allow popups for payment');
        }
      } else {
        throw new Error(result.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Payment Error:', error);
      showAlertMessage(error.message || 'Payment initialization failed. Please try again.', 'danger');
      setPaymentProcessing(false);
    }
  };

  // ✅ Payment Status Polling with Fetch
  const startPaymentPolling = (orderId) => {
    let pollCount = 0;
    const maxPolls = 60; // 5 minutes max (60 * 5 seconds)
    
    const interval = setInterval(async () => {
      pollCount++;
      
      try {
        const result = await verifyPayment(orderId);

        if (result.success) {
          clearInterval(interval);
          setPaymentProcessing(false);
          
          showAlertMessage('Payment successful! Redirecting...', 'success');
          
          setTimeout(() => {
            navigate('/order-success', { 
              state: { 
                orderId: orderId,
                planName: planName,
                amount: calculateTotal(price),
                currency: currency,
                customerDetails: formData
              }
            });
          }, 2000);
        }
      } catch (error) {
        console.log('Payment not confirmed yet...');
      }

      if (pollCount >= maxPolls) {
        clearInterval(interval);
        setPaymentProcessing(false);
        showAlertMessage(
          'Payment status check timeout. Please check your email for confirmation or contact support.',
          'warning'
        );
      }
    }, 5000); // Check every 5 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showAlertMessage('Please fix the errors in the form', 'danger');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const subtotal = parseFloat(price);
      const gstAmount = calculateGST(price);
      const totalAmount = calculateTotal(price);

      const orderData = {
        customerDetails: {
          ...formData,
          phone: formData.phone.replace(/\D/g, '') // Clean phone number
        },
        packageDetails: {
          planType,
          planName,
          basePrice: subtotal,
          gstAmount,
          totalAmount,
          currency
        }
      };

      // Initiate payment
      await handlePayment(orderData);

    } catch (error) {
      console.error('Order Error:', error);
      showAlertMessage('There was an error processing your order. Please try again.', 'danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPlanFeatures = () => {
    const features = {
      economy: [
        'One page website',
        '500 MB hosting',
        'Mobile responsive design',
        'Enquiry form',
        'Click to call option',
        '1 Content revision',
        '7 days delivery'
      ],
      professional: [
        '5 page web design',
        '1 GB hosting',
        '2 Business emails',
        'Professional SSL certificate',
        'Mobile responsive',
        'WhatsApp Chat options',
        '2 Content revisions',
        '10 days delivery'
      ],
      cms: [
        'CMS admin login',
        'Up to 10 pages',
        '1 GB hosting',
        '2 Business emails',
        'Professional SSL certificate',
        'WhatsApp Chat options',
        '3 Content revisions',
        '15 days delivery'
      ]
    };
    
    return features[planType] || features.economy;
  };

  if (!planType || !price) {
    return (
      <Container className="text-center my-5">
        <Alert variant="danger">
          <h4>Invalid Order</h4>
          <p>Please select a package from the pricing page.</p>
          <Button variant="primary" onClick={() => navigate('/pricing')}>
            View Pricing
          </Button>
        </Alert>
      </Container>
    );
  }

  const currencySymbol = getCurrencySymbol();
  const subtotal = parseFloat(price);
  const gstAmount = calculateGST(price);
  const totalAmount = calculateTotal(price);

  return (
    <section className={styles.checkoutSection}>
      <Container>
        {/* Back Button */}
        <Button 
          variant="outline-secondary" 
          className={styles.backButton}
          onClick={() => navigate('/pricing')}
          disabled={paymentProcessing}
        >
          <FaArrowLeft className={styles.backIcon} />
          Back to Pricing
        </Button>

        {/* Alert */}
        {showAlert && (
          <Row className="justify-content-center mb-4">
            <Col lg={8}>
              <Alert variant={alertType} dismissible onClose={() => setShowAlert(false)}>
                {alertMessage}
              </Alert>
            </Col>
          </Row>
        )}

        <Row className="justify-content-center">
          <Col lg={10}>
            <div className={styles.checkoutHeader}>
              <h1 className={styles.checkoutTitle}>Complete Your Order</h1>
              <p className={styles.checkoutSubtitle}>
                You're purchasing: <strong>{planName}</strong>
                {currency !== 'INR' && (
                  <span className={styles.currencyNote}>
                    (Payment will be processed in {currency})
                  </span>
                )}
              </p>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className={styles.checkoutCard}>
              <Card.Body>
                <Row>
                  {/* Order Summary */}
                  <Col md={5} className={styles.orderSummary}>
                    <div className={styles.summaryHeader}>
                      <h3>
                        <FaGlobe className={styles.summaryIcon} />
                        Order Summary
                      </h3>
                    </div>
                    
                    <div className={`${styles.planCard} ${styles[planType]}`}>
                      <div className={styles.planBadge}>
                        {planType.charAt(0).toUpperCase() + planType.slice(1)}
                      </div>
                      <h4 className={styles.planName}>{planName}</h4>
                      <div className={styles.planPrice}>
                        {currencySymbol}{formatPrice(subtotal)}
                      </div>
                      <p className={styles.priceNote}>One-time payment • {currency}</p>
                    </div>

                    <div className={styles.featuresList}>
                      <h5>What's Included:</h5>
                      <ul>
                        {getPlanFeatures().map((feature, index) => (
                          <li key={index}>
                            <FaCheck className={styles.featureCheck} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.totalSection}>
                      <div className={styles.totalRow}>
                        <span>Subtotal:</span>
                        <span>{currencySymbol}{formatPrice(subtotal)}</span>
                      </div>
                      <div className={styles.totalRow}>
                        <span>GST (18%):</span>
                        <span>{currencySymbol}{formatPrice(gstAmount)}</span>
                      </div>
                      <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                        <span>Total Amount:</span>
                        <span>{currencySymbol}{formatPrice(totalAmount)}</span>
                      </div>
                    </div>

                    {/* Payment Processing Info */}
                    {paymentProcessing && (
                      <div className={styles.paymentProcessing}>
                        <Spinner animation="border" size="sm" className="me-2" />
                        <span>Waiting for payment confirmation...</span>
                        {orderId && (
                          <div className={styles.orderId}>
                            Order ID: <strong>{orderId}</strong>
                          </div>
                        )}
                      </div>
                    )}
                  </Col>

                  {/* Checkout Form */}
                  <Col md={7} className={styles.checkoutForm}>
                    <Form onSubmit={handleSubmit}>
                      <div className={styles.formSection}>
                        <h4>
                          <FaUser className={styles.sectionIcon} />
                          Personal Information
                        </h4>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            isInvalid={!!errors.fullName}
                            placeholder="Enter your full name"
                            disabled={paymentProcessing}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.fullName}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Email Address *</Form.Label>
                              <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                isInvalid={!!errors.email}
                                placeholder="your@email.com"
                                disabled={paymentProcessing}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.email}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Phone Number *</Form.Label>
                              <Form.Control
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                isInvalid={!!errors.phone}
                                placeholder="9876543210"
                                disabled={paymentProcessing}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.phone}
                              </Form.Control.Feedback>
                              <Form.Text className="text-muted">
                                10-digit Indian mobile number
                              </Form.Text>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Form.Group className="mb-3">
                          <Form.Label>Company Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Your company name (optional)"
                            disabled={paymentProcessing}
                          />
                        </Form.Group>
                      </div>

                      <div className={styles.formSection}>
                        <h4>
                          <FaMapMarker className={styles.sectionIcon} />
                          Address Information
                        </h4>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Address *</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            isInvalid={!!errors.address}
                            placeholder="Enter your complete address"
                            disabled={paymentProcessing}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.address}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>City *</Form.Label>
                              <Form.Control
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                isInvalid={!!errors.city}
                                placeholder="Your city"
                                disabled={paymentProcessing}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.city}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Pincode *</Form.Label>
                              <Form.Control
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleInputChange}
                                isInvalid={!!errors.pincode}
                                placeholder="600001"
                                disabled={paymentProcessing}
                                maxLength={6}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.pincode}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>

                      <div className={styles.formSection}>
                        <h4>
                          <FaEnvelope className={styles.sectionIcon} />
                          Project Requirements
                        </h4>
                        
                        <Form.Group className="mb-4">
                          <Form.Label>Additional Requirements</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={4}
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleInputChange}
                            placeholder="Tell us about your project requirements, preferred colors, any specific features you need, etc."
                            disabled={paymentProcessing}
                          />
                          <Form.Text className="text-muted">
                            This helps us understand your needs better and deliver exactly what you want.
                          </Form.Text>
                        </Form.Group>
                      </div>

                      <div className={styles.termsSection}>
                        <Form.Check
                          type="checkbox"
                          id="terms-agreement"
                          label={
                            <span>
                              I agree to the <Link to="/terms" target="_blank">Terms of Service</Link> and <Link to="/privacy-policy" target="_blank">Privacy Policy</Link>
                            </span>
                          }
                          required
                          disabled={paymentProcessing}
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        className={styles.submitButton}
                        disabled={isSubmitting || paymentProcessing}
                        size="lg"
                      >
                        {paymentProcessing ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Processing Payment...
                          </>
                        ) : isSubmitting ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Creating Order...
                          </>
                        ) : (
                          <>
                            <FaCreditCard className={styles.buttonIcon} />
                            Pay {currencySymbol}{formatPrice(totalAmount)}
                          </>
                        )}
                      </Button>

                      <p className={styles.securityNote}>
                        🔒 Your information is secure and encrypted. We use Cashfree for secure payments.
                      </p>

                      {paymentProcessing && (
                        <div className={styles.paymentNote}>
                          <Alert variant="info" className="mb-0">
                            <small>
                              <strong>Note:</strong> Please complete the payment in the new window that opened. 
                              Keep this tab open until payment is confirmed.
                            </small>
                          </Alert>
                        </div>
                      )}
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CheckoutPage;