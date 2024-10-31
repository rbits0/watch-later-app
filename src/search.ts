import Fuse from 'fuse.js';
import VideoData from './VideoData';


export function filterVideos(videos: readonly VideoData[], search: string): readonly VideoData[] {
  if (search === '') {
    return videos;
  }
  
  const fuse = new Fuse(videos, {
    keys: [
      'title',
      { name: 'channelName', weight: 0.8 },
    ],
    threshold: 0.2,
    ignoreLocation: true,
    findAllMatches: true,
    includeScore: true,
    includeMatches: true,
    // Don't prioritise exact matches over matches with text surrounding it
    getFn: (obj, path) => ` ${obj[path as keyof VideoData] as string} `,
  });

  const searchResult = fuse.search(search);
  return searchResult.map(entry => entry.item);
}