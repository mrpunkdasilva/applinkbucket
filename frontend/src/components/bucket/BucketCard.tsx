import { TrashIcon, ShareIcon } from '@heroicons/react/24/outline';
import { StoredBucket } from '../../services/storage.service';

interface BucketCardProps {
  bucket: StoredBucket & { userName?: string };
  onDelete?: () => void;
  isPublic?: boolean;
  showOwner?: boolean;
}

export default function BucketCard({ 
  bucket, 
  onDelete, 
  isPublic, 
  showOwner 
}: BucketCardProps) {
  return (
    <div className="bg-gray-800 shadow rounded-lg p-6 border border-gray-700">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-white">{bucket.name}</h3>
          {bucket.description && (
            <p className="mt-1 text-sm text-gray-400">{bucket.description}</p>
          )}
          {showOwner && bucket.userName && (
            <p className="mt-1 text-sm text-gray-500">
              by {bucket.userName}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {isPublic && (
            <ShareIcon className="h-5 w-5 text-blue-500" />
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-gray-400 hover:text-red-500"
              aria-label="Delete bucket"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          )}
        </div>
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
  );
}