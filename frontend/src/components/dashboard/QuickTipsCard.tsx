import { useEffect, useState } from 'react';
import { LightBulbIcon } from '@heroicons/react/24/outline';
import { catMemeService, CatMeme } from '../../services/catMeme.service';

interface Tip {
  id: string;
  text: string;
}

const QUICK_TIPS: Tip[] = [
  {
    id: '1',
    text: 'Use descriptive names for your buckets'
  },
  {
    id: '2',
    text: 'Add tags to your links for better organization'
  },
  {
    id: '3',
    text: 'Share buckets with your team'
  },
  {
    id: '4',
    text: 'Use keyboard shortcuts for faster navigation'
  },
  {
    id: '5',
    text: 'Create separate buckets for different projects'
  }
];

export function QuickTipsCard() {
  const [currentMeme, setCurrentMeme] = useState<CatMeme | null>(null);
  const [displayedTips, setDisplayedTips] = useState<Tip[]>([]);

  useEffect(() => {
    // Get random meme
    const meme = catMemeService.getRandomMeme();
    setCurrentMeme(meme);

    // Get random tips (show 3 random tips)
    const shuffledTips = [...QUICK_TIPS].sort(() => Math.random() - 0.5);
    setDisplayedTips(shuffledTips.slice(0, 3));
  }, []);

  return (
    <section className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-medium text-white mb-4 flex items-center">
        <LightBulbIcon className="h-5 w-5 mr-2 text-yellow-400" />
        Quick Tips
      </h3>
      <ul className="space-y-2 text-gray-400">
        {displayedTips.map(tip => (
          <li key={tip.id} className="flex items-center">
            <span className="mr-2">•</span>
            {tip.text}
          </li>
        ))}
      </ul>
      {currentMeme && (
        <div className="mt-4">
          <img 
            src={currentMeme.url}
            alt={currentMeme.alt}
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
      )}
    </section>
  );
}