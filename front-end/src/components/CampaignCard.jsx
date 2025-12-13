import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users, Target } from 'lucide-react'
import { format } from 'date-fns'

const CampaignCard = ({ campaign }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Campaign Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={campaign.images?.[0]?.url || 'https://via.placeholder.com/400x200'}
          alt={campaign.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Campaign Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            campaign.category === 'recycling' ? 'bg-blue-100 text-blue-800' :
            campaign.category === 'cleanup' ? 'bg-green-100 text-green-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {campaign.category.charAt(0).toUpperCase() + campaign.category.slice(1)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {campaign.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2">
          {campaign.shortDescription || campaign.description}
        </p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {format(new Date(campaign.startDate), 'MMM dd, yyyy')} - 
              {format(new Date(campaign.endDate), 'MMM dd, yyyy')}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{campaign.location.city}, {campaign.location.state}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {campaign.currentParticipants} / {campaign.targetParticipants} participants
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        {campaign.targetParticipants && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{Math.round((campaign.currentParticipants / campaign.targetParticipants) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{
                  width: `${Math.min((campaign.currentParticipants / campaign.targetParticipants) * 100, 100)}%`
                }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-between items-center">
          <Link
            to={`/campaigns/${campaign._id}`}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            View Details
          </Link>
          <span className={`text-sm font-semibold ${
            campaign.status === 'active' ? 'text-green-600' :
            campaign.status === 'pending' ? 'text-yellow-600' :
            'text-gray-600'
          }`}>
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CampaignCard