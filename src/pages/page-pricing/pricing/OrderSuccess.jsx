import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Badge } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FaCheckCircle, 
  FaEnvelope, 
  FaHome, 
  FaDownload, 
  FaClock, 
  FaUser, 
  FaPhone, 
  FaMapMarker,
  FaFileInvoice,
  FaHeadset,
  FaExclamationCircle,
  FaPrint,
  FaArrowRight
} from 'react-icons/fa';
import styles from './OrderSuccess.module.css';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, planName, amount, currency = 'INR', customerDetails } = location.state || {};
  
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/api/web-payment/order/${orderId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setOrderDetails(data.order);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrencySymbol = () => {
    return currency === 'INR' ? '₹' : '$';
  };

  const formatPrice = (amount) => {
    return currency === 'INR' 
      ? amount.toLocaleString('en-IN') 
      : amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getDeliveryTimeline = (planType) => {
    const timelines = {
      economy: '7-10 working days',
      professional: '10-14 working days',
      cms: '14-21 working days'
    };
    return timelines[planType] || '7-10 working days';
  };

  const getNextSteps = () => {
    return [
      'Project manager contact within 24 hours',
      'Discovery call & requirements gathering',
      'Design mockups & approval',
      'Development phase begins',
      'Regular progress updates',
      'Final delivery & training'
    ];
  };

  const handlePrint = () => {
    window.print();
  };

  // Print header component
  const PrintHeader = () => (
    <div className={`${styles.printOnly} print-header`}>
      <h2>ORDER CONFIRMATION RECEIPT</h2>
      <p>Cybomb Technologies - Professional Web Development</p>
      <p style={{ fontSize: '0.7rem', color: '#999' }}>
        Issued on {new Date().toLocaleDateString('en-IN')} | Transaction Ref: {orderId}
      </p>
    </div>
  );

  // Print footer component
  const PrintFooter = () => (
    <div className={`${styles.printOnly} print-footer`}>
      <p>Thank you for your business! • support@cybomb.com • +91 9876543210</p>
      <p>This is an automated receipt. No signature required.</p>
    </div>
  );

  if (!orderId) {
    return (
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Alert variant="danger" className="text-center">
              <h4>Order Not Found</h4>
              <p>We couldn't find your order details. Please contact support.</p>
              <Button variant="primary" onClick={() => navigate('/')}>
                Go to Homepage
              </Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  const currencySymbol = getCurrencySymbol();
  const deliveryTime = orderDetails ? getDeliveryTimeline(orderDetails.packageDetails.planType) : getDeliveryTimeline('economy');
  const subtotal = orderDetails ? orderDetails.packageDetails.basePrice : Math.round(amount / 1.18);
  const gstAmount = orderDetails ? orderDetails.packageDetails.gstAmount : (amount - subtotal);

  return (
    <div className={styles.successContainer}>
      <Container>
        <PrintHeader />
        <Row className="justify-content-center">
          <Col lg={10}>
            {/* Modern Success Header */}
            <Card className={styles.successCard}>
              <Card.Body className="p-0">
                <div className={styles.modernHeader}>
                  <FaCheckCircle className={styles.successIcon} />
                  <h1 className={styles.successTitle}>Order Confirmed!</h1>
                  <p className={styles.successSubtitle}>
                    Your web development project is now in progress
                  </p>
                  <Badge className={styles.confirmedBadge}>
                    Payment Successful ✓
                  </Badge>
                </div>

                <div className="p-0">
                  {/* Order Details */}
                  <div className={styles.orderDetails}>
                    <h5>
                      <FaFileInvoice />
                      Order Summary
                    </h5>
                    <div className={styles.orderGrid}>
                      <div className={styles.orderItem}>
                        <span className={styles.orderLabel}>Order ID:</span>
                        <span className={styles.orderValue}>{orderId}</span>
                      </div>
                      <div className={styles.orderItem}>
                        <span className={styles.orderLabel}>Package:</span>
                        <span className={styles.orderValue}>{planName}</span>
                      </div>
                      <div className={styles.orderItem}>
                        <span className={styles.orderLabel}>Order Date:</span>
                        <span className={styles.orderValue}>{new Date().toLocaleDateString('en-IN')}</span>
                      </div>
                      <div className={styles.orderItem}>
                        <span className={styles.orderLabel}>Delivery Timeline:</span>
                        <span className={styles.orderValue}>{deliveryTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Invoice Section */}
                  <div className={styles.invoiceSection}>
                    <div className={styles.invoiceHeader}>
                      <h5 className={styles.invoiceTitle}>PAYMENT INVOICE</h5>
                      <div className={styles.invoiceId}>INV-{orderId}</div>
                    </div>
                    
                    <table className={styles.invoiceTable}>
                      <thead>
                        <tr>
                          <th>Description</th>
                          <th className={styles.amountCell}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{planName} Web Development Package</td>
                          <td className={styles.amountCell}>{currencySymbol}{formatPrice(subtotal)}</td>
                        </tr>
                        <tr>
                          <td>GST (18%)</td>
                          <td className={styles.amountCell}>{currencySymbol}{formatPrice(gstAmount)}</td>
                        </tr>
                        <tr className={styles.invoiceTotal}>
                          <td><strong>Total Amount Paid</strong></td>
                          <td className={`${styles.amountCell} ${styles.totalAmount}`}>
                            <strong>{currencySymbol}{formatPrice(amount)}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <div className="text-center mt-3">
                      <Badge bg="success" className="fs-6">
                        Payment Completed • {new Date().toLocaleDateString('en-IN')}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-3">
                    <Row className="g-3">
                      {/* Customer Information */}
                      <Col md={6}>
                        <Card className={styles.modernCard}>
                          <Card.Header className={styles.cardHeader}>
                            <h5>
                              <FaUser />
                              Customer Details
                            </h5>
                          </Card.Header>
                          <Card.Body className={styles.cardBody}>
                            {customerDetails ? (
                              <>
                                <div className={styles.infoItem}>
                                  <span className={styles.infoLabel}>Full Name:</span>
                                  <span className={styles.infoValue}>{customerDetails.fullName}</span>
                                </div>
                                <div className={styles.infoItem}>
                                  <span className={styles.infoLabel}>Email:</span>
                                  <span className={styles.infoValue}>{customerDetails.email}</span>
                                </div>
                                <div className={styles.infoItem}>
                                  <span className={styles.infoLabel}>Phone:</span>
                                  <span className={styles.infoValue}>+91 {customerDetails.phone}</span>
                                </div>
                                {customerDetails.company && (
                                  <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Company:</span>
                                    <span className={styles.infoValue}>{customerDetails.company}</span>
                                  </div>
                                )}
                                <div className={styles.infoItem}>
                                  <span className={styles.infoLabel}>Delivery Address:</span>
                                  <span className={styles.infoValue}>
                                    {customerDetails.address}, {customerDetails.city} - {customerDetails.pincode}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <div className="text-center py-2">
                                <div className="spinner-border text-primary" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                              </div>
                            )}
                          </Card.Body>
                        </Card>
                      </Col>

                      {/* Next Steps */}
                      <Col md={6}>
                        <Card className={`${styles.modernCard} ${styles.nextStepsCard}`}>
                          <Card.Header className={styles.cardHeader}>
                            <h5>
                              <FaClock />
                              Project Timeline
                            </h5>
                          </Card.Header>
                          <Card.Body>
                            <ol className={styles.nextStepsList}>
                              {getNextSteps().map((step, index) => (
                                <li key={index}>
                                  <small>{step}</small>
                                </li>
                              ))}
                            </ol>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    {/* Support Information */}
                    <Card className={`${styles.modernCard} ${styles.supportCard} mt-3`}>
                      <Card.Header className={styles.cardHeader}>
                        <h5>
                          <FaHeadset />
                          Support Center
                        </h5>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col md={6}>
                            <h6 className="mb-2">Get Immediate Help</h6>
                            <div className={styles.supportContact}>
                              <div className={styles.contactItem}>
                                <FaEnvelope className={styles.contactIcon} />
                                <div>
                                  <strong>Email Support</strong>
                                  <div>support@cybomb.com</div>
                                </div>
                              </div>
                              <div className={styles.contactItem}>
                                <FaPhone className={styles.contactIcon} />
                                <div>
                                  <strong>Phone Support</strong>
                                  <div>+91 9876543210</div>
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md={6}>
                            <h6 className="mb-2">Project Communication</h6>
                            <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                              Your dedicated project manager will provide regular updates via email and WhatsApp. 
                              You'll have a single point of contact throughout the entire development process.
                            </p>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>

                    {/* Action Buttons */}
                    <div className={`${styles.actionButtons} no-print`}>
                      <Button 
                        className={`${styles.actionBtn} ${styles.primaryBtn}`}
                        onClick={() => navigate('/')}
                        size="lg"
                      >
                        <FaHome />
                        Back to Home
                      </Button>
                      <Button 
                        className={`${styles.actionBtn} ${styles.outlineBtn}`}
                        onClick={() => navigate('/contact-us')}
                        size="lg"
                      >
                        <FaHeadset />
                        Contact Support
                      </Button>
                      <Button 
                        className={`${styles.actionBtn} ${styles.successBtn}`}
                        onClick={handlePrint}
                        size="lg"
                      >
                        <FaPrint />
                        Print Receipt
                      </Button>
                    </div>

                    {/* Important Notes */}
                    <Alert className={styles.importantNotes}>
                      <h6>
                        <FaExclamationCircle />
                        Important Information
                      </h6>
                      <ul>
                        <li>Save your Order ID: <strong>{orderId}</strong> for all future communications</li>
                        <li>Check your email (including spam folder) for order confirmation</li>
                        <li>Our team will contact you within 24 hours to begin your project</li>
                        <li>All project communications will be conducted via email and phone</li>
                      </ul>
                    </Alert>

                    <PrintFooter />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderSuccess;