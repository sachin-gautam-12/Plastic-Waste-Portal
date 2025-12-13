import { useState } from 'react'
import { useQuery } from 'react-query'
import {
  CheckCircle,
  XCircle,
  Clock,
  Users,
  FileText,
  BarChart3
} from 'lucide-react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatCard from '../../components/dashboard/StatCard'
import PendingCampaigns from '../../components/admin/PendingCampaigns'
import PendingResources from '../../components/admin/PendingResources'
import UserManagement from '../../components/admin/UserManagement'
import AnalyticsChart from '../../components/admin/AnalyticsChart'
import { fetchAdminStats } from '../../services/adminService'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard')

  const { data: stats, isLoading } = useQuery('adminStats', fetchAdminStats)

  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: BarChart3 },
    { id: 'campaigns', label: 'Campaigns', icon: CheckCircle },
    { id: 'resources', label: 'Resources', icon: FileText },
    { id: 'users', label: 'Users', icon: Users },
  ]

  if (isLoading) {
    return (
      <DashboardLayout role="admin">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="admin">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Pending Approvals"
          value={stats?.pendingApprovals || 0}
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Active Campaigns"
          value={stats?.activeCampaigns || 0}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Total Resources"
          value={stats?.totalResources || 0}
          icon={FileText}
          color="purple"
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <AnalyticsChart />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PendingCampaigns limit={5} />
              <PendingResources limit={5} />
            </div>
          </div>
        )}
        
        {activeTab === 'campaigns' && <PendingCampaigns />}
        {activeTab === 'resources' && <PendingResources />}
        {activeTab === 'users' && <UserManagement />}
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard