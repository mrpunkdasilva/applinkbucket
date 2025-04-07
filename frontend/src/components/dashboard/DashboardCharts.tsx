import { StoredBucket } from '../../services/storage.service';
import {
  AreaChart, Area, PieChart, Pie, Cell,
  ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';

interface DashboardChartsProps {
  buckets: StoredBucket[];
}

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];


export function DashboardCharts({ buckets }: DashboardChartsProps) {
  // Agrupa os buckets por mês e conta o número de pills
  const activityData = buckets.reduce((acc: { date: string; links: number }[], bucket) => {
    const date = new Date(bucket.createdAt).toISOString().slice(0, 7); // Format: YYYY-MM
    const existingEntry = acc.find(item => item.date === date);
    
    if (existingEntry) {
      existingEntry.links += bucket.pills?.length || 0;
    } else {
      acc.push({ date, links: bucket.pills?.length || 0 });
    }
    
    return acc;
  }, []).sort((a, b) => a.date.localeCompare(b.date));

  // Agrupa os buckets por categoria (usando o nome como categoria temporária)
  const categoryData = buckets.reduce((acc: { name: string; value: number }[], bucket) => {
    const existingCategory = acc.find(item => item.name === bucket.name);
    
    if (existingCategory) {
      existingCategory.value += bucket.pills?.length || 0;
    } else {
      acc.push({ 
        name: bucket.name || 'Uncategorized', 
        value: bucket.pills?.length || 0 
      });
    }
    
    return acc;
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Activity Chart */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h3 className="text-lg font-medium text-white mb-4">Activity Overview</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData}>
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6'
                }}
              />
              <Area
                type="monotone"
                dataKey="links"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h3 className="text-lg font-medium text-white mb-4">Category Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}