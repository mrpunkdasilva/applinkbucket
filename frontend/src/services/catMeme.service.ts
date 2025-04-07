export interface CatMeme {
  id: string;
  url: string;
  alt: string;
  mood: 'happy' | 'amazing' | 'coding' | 'organized' | 'excited';
}

class CatMemeService {
  private readonly memes: CatMeme[] = [
    {
      id: 'typing-cat',
      url: 'https://media1.tenor.com/m/8S0iBM4IxIYAAAAC/busycat-typing.gif',
      alt: 'Cat typing frantically on a keyboard',
      mood: 'coding'
    },
    {
      id: 'organized-cat',
      url: 'https://media1.tenor.com/m/R1bq-gKmqswAAAAC/cat-cats.gif',
      alt: 'Cat organizing items perfectly',
      mood: 'organized'
    },
    {
      id: 'happy-cat',
      url: 'https://media1.tenor.com/m/28OFYc173o0AAAAd/cat-happy.gif',
      alt: 'Super happy cat celebrating',
      mood: 'happy'
    },
    {
      id: 'coding-cat',
      url: 'https://media1.tenor.com/m/rEd35Rfq3m4AAAAd/cat-work-in-progress.gif',
      alt: 'Cat coding like a pro',
      mood: 'coding'
    },
    {
      id: 'amazing-cat',
      url: 'https://media1.tenor.com/m/GSj_MVsua58AAAAd/cat-mind-blown.gif',
      alt: 'Cat mind blown by organization',
      mood: 'amazing'
    },
    {
      id: 'excited-cat',
      url: 'https://media.tenor.com/O7VXvlDQWbEAAAAi/excited-cat.gif',
      alt: 'Cat excited about productivity',
      mood: 'excited'
    }
  ];

  getRandomMeme(): CatMeme {
    const randomIndex = Math.floor(Math.random() * this.memes.length);
    return this.memes[randomIndex];
  }

  getMemesByMood(mood: CatMeme['mood']): CatMeme[] {
    return this.memes.filter(meme => meme.mood === mood);
  }

  getRandomMemeByMood(mood: CatMeme['mood']): CatMeme | null {
    const moodMemes = this.getMemesByMood(mood);
    if (moodMemes.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * moodMemes.length);
    return moodMemes[randomIndex];
  }
}

export const catMemeService = new CatMemeService();
