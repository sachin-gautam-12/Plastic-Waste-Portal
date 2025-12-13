const Campaign = require('../models/Campaign');

// @desc    Get all campaigns
// @route   GET /api/campaigns
// @access  Public
exports.getCampaigns = async (req, res) => {
  try {
    const {
      category,
      status,
      location,
      search,
      page = 1,
      limit = 10
    } = req.query;

    let query = { status: 'approved' };

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by status (for admins)
    if (req.user && req.user.role === 'admin' && status) {
      query.status = status;
    } else if (!req.user || req.user.role !== 'admin') {
      query.status = 'approved';
    }

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    // Location-based filtering
    if (location) {
      const [lng, lat, radius] = location.split(',').map(Number);
      if (!isNaN(lng) && !isNaN(lat) && !isNaN(radius)) {
        query.location = {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [lng, lat]
            },
            $maxDistance: radius * 1000 // Convert km to meters
          }
        };
      }
    }

    // Pagination
    const skip = (page - 1) * limit;

    const campaigns = await Campaign.find(query)
      .populate('organizer', 'name email profileImage')
      .skip(skip)
      .limit(parseInt(limit))
      .sort('-createdAt');

    const total = await Campaign.countDocuments(query);

    res.json({
      success: true,
      count: campaigns.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      campaigns
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new campaign
// @route   POST /api/campaigns
// @access  Private (Proposer/Admin)
exports.createCampaign = async (req, res) => {
  try {
    const campaignData = {
      ...req.body,
      organizer: req.user.id,
      organizerName: req.user.name,
      status: req.user.role === 'admin' ? 'approved' : 'pending'
    };

    const campaign = await Campaign.create(campaignData);

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      campaign
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Join campaign
// @route   POST /api/campaigns/:id/join
// @access  Private
exports.joinCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    // Check if campaign is active
    if (campaign.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Campaign is not active'
      });
    }

    // Check if user already joined
    // Note: You might want to create a separate Participant model
    campaign.currentParticipants += 1;
    await campaign.save();

    res.json({
      success: true,
      message: 'Successfully joined the campaign',
      participants: campaign.currentParticipants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};