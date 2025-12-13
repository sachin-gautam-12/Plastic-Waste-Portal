import api from './api'

export const campaignService = {
  // Get all campaigns with filters
  getCampaigns: async (params = {}) => {
    const response = await api.get('/campaigns', { params })
    return response.data
  },

  // Get single campaign
  getCampaign: async (id) => {
    const response = await api.get(`/campaigns/${id}`)
    return response.data
  },

  // Create campaign
  createCampaign: async (campaignData) => {
    const response = await api.post('/campaigns', campaignData)
    return response.data
  },

  // Update campaign
  updateCampaign: async (id, campaignData) => {
    const response = await api.put(`/campaigns/${id}`, campaignData)
    return response.data
  },

  // Delete campaign
  deleteCampaign: async (id) => {
    const response = await api.delete(`/campaigns/${id}`)
    return response.data
  },

  // Join campaign
  joinCampaign: async (id) => {
    const response = await api.post(`/campaigns/${id}/join`)
    return response.data
  },

  // Get nearby campaigns
  getNearbyCampaigns: async (lng, lat, radius = 10) => {
    const response = await api.get('/campaigns/location/nearby', {
      params: { location: `${lng},${lat},${radius}` }
    })
    return response.data
  }
}