import { Link } from 'react-router-dom';
import {
  SparklesIcon,
  PaintBrushIcon,
  ShareIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface ProFeature {
  id: string;
  text: string;
  icon: typeof PaintBrushIcon;
}

const PRO_FEATURES: ProFeature[] = [
  {
    id: 'theme',
    text: 'Custom bucket themes',
    icon: PaintBrushIcon
  },
  {
    id: 'sharing',
    text: 'Branded sharing pages',
    icon: ShareIcon
  },
  {
    id: 'analytics',
    text: 'Advanced analytics',
    icon: ChartBarIcon
  }
];

export function UpgradeProCard() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-6">
      <h3 className="text-lg font-medium text-white mb-4 flex items-center">
        <SparklesIcon className="h-5 w-5 mr-2" />
        Upgrade to Pro
      </h3>
      <ul className="space-y-3 mb-6">
        {PRO_FEATURES.map(feature => (
          <li key={feature.id} className="flex items-center text-white">
            <feature.icon className="h-4 w-4 mr-2" />
            {feature.text}
          </li>
        ))}
      </ul>
      <Link
        to="/pricing"
        className="block w-full bg-white text-blue-600 text-center py-2 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors"
      >
        Upgrade Now
      </Link>
    </section>
  );
}