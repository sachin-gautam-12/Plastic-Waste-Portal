const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  createCampaign,
  getCampaigns,
  getCampaign,
  updateCampaign,
  deleteCampaign,
  getNearbyCampaigns,
  joinCampaign,
  getUserCampaigns
} = require('../controllers/campaignController');

// Public routes
router.get('/', getCampaigns);
router.get('/:id', getCampaign);
router.get('/location/nearby', getNearbyCampaigns);

// Protected routes
router.use(protect);

router.post('/', authorize('proposer', 'admin'), createCampaign);
router.get('/user/mycampaigns', getUserCampaigns);
router.put('/:id', authorize('proposer', 'admin'), updateCampaign);
router.delete('/:id', authorize('proposer', 'admin'), deleteCampaign);
router.post('/:id/join', joinCampaign);

module.exports = router;
