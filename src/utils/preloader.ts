// Utility for preloading images and GIFs
import { rankGifs } from '../data/gifs';

const preloadedGifs: { [key: string]: HTMLImageElement } = {};

export const preloadGif = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (preloadedGifs[url]) {
      resolve();
      return;
    }

    const img = new Image();
    img.onload = () => {
      preloadedGifs[url] = img;
      resolve();
    };
    img.onerror = reject;
    img.src = url;
  });
};

export const preloadGifsForRank = async (rank: number): Promise<void[]> => {
  const gifs = rankGifs[rank] || rankGifs[1];
  return Promise.all(gifs.map(preloadGif));
};

export const preloadAllGifs = async (): Promise<void> => {
  const allRanks = Object.keys(rankGifs).map(Number);
  await Promise.all(allRanks.map(preloadGifsForRank));
};

export const getPreloadedGif = (url: string): HTMLImageElement | undefined => {
  return preloadedGifs[url];
}; 