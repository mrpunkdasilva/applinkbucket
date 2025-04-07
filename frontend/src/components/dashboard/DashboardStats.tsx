import { ChartBarIcon, ClockIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { StoredBucket } from '../../services/storage.service';

interface DashboardStatsProps {
  buckets: StoredBucket[];
}

// Mudando para export default para garantir que o módulo seja encontrado
export default function DashboardStats({ buckets }: DashboardStatsProps) {
  const totalLinks = buckets.reduce((sum, bucket) => sum + (bucket.pills?.length || 0), 0);

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-blue-500 bg-opacity-10 rounded-lg">
            <ChartBarIcon className="h-6 w-6 text-blue-500" />
          </div>
          <div className="ml-4">
            <p className="text-gray-400 text-sm">Total Buckets</p>
            <p className="text-2xl font-bold text-white">{buckets.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-green-500 bg-opacity-10 rounded-lg">
            <ClockIcon className="h-6 w-6 text-green-500" />
          </div>
          <div className="ml-4">
            <p className="text-gray-400 text-sm">Total Links</p>
            <p className="text-2xl font-bold text-white">{totalLinks}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-purple-500 bg-opacity-10 rounded-lg">
            <LightBulbIcon className="h-6 w-6 text-purple-500" />
          </div>
          <div className="ml-4">
            <p className="text-gray-400 text-sm">Pro Tips</p>
            <p className="text-sm text-white">Use tags to organize better</p>
          </div>
        </div>
      </div>
    </section>
  );
}