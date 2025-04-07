import { TrashIcon } from '@heroicons/react/24/outline'
import { StoredBucket } from '../../services/storage.service'

interface BucketCardProps {
  bucket: StoredBucket
  onDelete: () => void
}

export default function BucketCard({ bucket, onDelete }: BucketCardProps) {
  return (
    <div className="bg-gray-800 shadow rounded-lg p-6 border border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-white">{bucket.name}</h3>
          {bucket.description && (
            <p className="mt-1 text-sm text-gray-400">{bucket.description}</p>
          )}
        </div>
        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
      
      <div className="mt-4">
        <div className="text-sm text-gray-400">
          {bucket.pills?.length || 0} links saved
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Created {new Date(bucket.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}