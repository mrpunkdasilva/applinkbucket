import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { storageService, StoredBucket } from '../../services/storage.service'
import { PlusIcon } from '@heroicons/react/24/outline'
import BucketCard from '../../components/bucket/BucketCard'
import CreateBucketModal from '../../components/bucket/CreateBucketModal'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const [buckets, setBuckets] = useState<StoredBucket[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('Dashboard Effect:', { user, isAuthenticated }) // Debug log

    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to login') // Debug log
      navigate('/login')
      return
    }

    if (!user) {
      console.log('No user found') // Debug log
      return
    }

    try {
      console.log('Loading buckets for user:', user.id) // Debug log
      storageService.initializeDefaultBuckets(user.id)
      const userBuckets = storageService.getUserBuckets(user.id)
      console.log('Loaded buckets:', userBuckets) // Debug log
      setBuckets(userBuckets)
    } catch (error) {
      console.error('Error loading buckets:', error) // Debug log
    } finally {
      setIsLoading(false)
    }
  }, [user, isAuthenticated, navigate])

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  // Not authenticated state
  if (!isAuthenticated || !user) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-white">Please log in to access the dashboard</div>
      </div>
    )
  }

  const handleCreateBucket = (data: { name: string; description?: string }) => {
    if (!user) return
    
    try {
      const newBucket = storageService.createBucket(user.id, data)
      console.log('Created new bucket:', newBucket) // Debug log
      setBuckets(prev => [...prev, newBucket])
      setIsCreateModalOpen(false)
    } catch (error) {
      console.error('Error creating bucket:', error) // Debug log
    }
  }

  const handleDeleteBucket = (bucketId: string) => {
    try {
      storageService.deleteBucket(bucketId)
      setBuckets(prev => prev.filter(bucket => bucket.id !== bucketId))
    } catch (error) {
      console.error('Error deleting bucket:', error) // Debug log
    }
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">My Buckets</h1>
          <p className="text-gray-400">Organize and manage your link collections</p>
        </div>
        
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Bucket
        </button>
      </div>

      {buckets.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="mt-2 text-sm font-medium text-white">No buckets</h3>
          <p className="mt-1 text-sm text-gray-400">Get started by creating a new bucket.</p>
          <div className="mt-6">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              New Bucket
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {buckets.map(bucket => (
            <BucketCard
              key={bucket.id}
              bucket={bucket}
              onDelete={() => handleDeleteBucket(bucket.id)}
            />
          ))}
        </div>
      )}

      <CreateBucketModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateBucket}
      />
    </div>
  )
}