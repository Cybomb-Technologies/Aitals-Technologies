// controllers/newsletterController.js
import Newsletter from '../models/Newsletter.js';
import ExcelJS from 'exceljs';

// Subscribe to newsletter
export const subscribeToNewsletter = async (req, res) => {
  try {
    const { email, name, source = 'blog' } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Check if already subscribed
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return res.status(400).json({
          success: false,
          message: 'Email is already subscribed'
        });
      } else {
        // Reactivate subscription
        existingSubscriber.isActive = true;
        existingSubscriber.unsubscribedAt = null;
        existingSubscriber.name = name || existingSubscriber.name;
        await existingSubscriber.save();
        
        return res.json({
          success: true,
          message: 'Successfully resubscribed to newsletter',
          data: existingSubscriber
        });
      }
    }

    // Create new subscription
    const subscriber = new Newsletter({
      email,
      name,
      source
    });

    await subscriber.save();

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: subscriber
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email is already subscribed'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all subscribers (Admin only)
export const getSubscribers = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '',
      status = 'active',
      sortBy = 'subscribedAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    let query = {};
    
    // Filter by status
    if (status === 'active') {
      query.isActive = true;
    } else if (status === 'inactive') {
      query.isActive = false;
    }

    // Search filter
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } }
      ];
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const subscribers = await Newsletter.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Newsletter.countDocuments(query);

    res.json({
      success: true,
      data: subscribers,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Unsubscribe from newsletter
export const unsubscribeFromNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const subscriber = await Newsletter.findOne({ email });
    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }

    subscriber.isActive = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    res.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get newsletter statistics (Admin only)
export const getNewsletterStats = async (req, res) => {
  try {
    const totalSubscribers = await Newsletter.countDocuments();
    const activeSubscribers = await Newsletter.countDocuments({ isActive: true });
    const newSubscribersThisMonth = await Newsletter.countDocuments({
      subscribedAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    });

    // Subscribers by source
    const subscribersBySource = await Newsletter.aggregate([
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 }
        }
      }
    ]);

    // Monthly subscription growth (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyGrowth = await Newsletter.aggregate([
      {
        $match: {
          subscribedAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$subscribedAt' },
            month: { $month: '$subscribedAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    res.json({
      success: true,
      data: {
        totalSubscribers,
        activeSubscribers,
        inactiveSubscribers: totalSubscribers - activeSubscribers,
        newSubscribersThisMonth,
        subscribersBySource,
        monthlyGrowth
      }
    });
  } catch (error) {
    console.error('Get newsletter stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Export subscribers to Excel (Admin only)
export const exportSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find()
      .sort({ subscribedAt: -1 })
      .select('email name source isActive subscribedAt');

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Subscribers');

    // Add headers
    worksheet.columns = [
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Name', key: 'name', width: 25 },
      { header: 'Source', key: 'source', width: 15 },
      { header: 'Status', key: 'status', width: 12 },
      { header: 'Subscribed Date', key: 'subscribedAt', width: 20 }
    ];

    // Add data
    subscribers.forEach(subscriber => {
      worksheet.addRow({
        email: subscriber.email,
        name: subscriber.name || 'N/A',
        source: subscriber.source,
        status: subscriber.isActive ? 'Active' : 'Inactive',
        subscribedAt: subscriber.subscribedAt.toLocaleDateString()
      });
    });

    // Style headers
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE6E6FA' }
    };

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=newsletter-subscribers.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Export subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Export failed',
      error: error.message
    });
  }
};