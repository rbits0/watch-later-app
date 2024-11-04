import Fuse from 'fuse.js';
import type { VideoData } from './VideoData';
import type { VideoDetails } from './youtube/VideoDetails';


export async function filterVideos(
  videos: readonly VideoData[],
  search: string,
  videoDetails: { [key: string]: VideoDetails }
): Promise<readonly VideoData[]> {
  if (search === '') {
    return videos;
  }
  

  function getFn(obj: VideoData, path: string | string[]): string {
    // console.log(`id: ${obj.videoId}\n path: "${path}"`);

    if (path[0] === 'description') {
      if (Object.keys(videoDetails).includes(obj.videoId)) {
        return ` ${videoDetails[obj.videoId].description} `;
      } else {
        return '';
      }
    }

    return ` ${obj[path as keyof VideoData] as string} `;
  }
    

  const fuse = new Fuse(videos, {
    keys: [
      { name: 'title', weight: 1.2 },
      { name: 'channelName', weight: 1.0 },
      { name: 'description', weight: 1.0 },
    ],
    threshold: 0.2,
    ignoreLocation: true,
    findAllMatches: true,
    includeScore: true,
    includeMatches: true,
    // Don't prioritise exact matches over matches with text surrounding it
    getFn,
  });

  const searchResult = fuse.search(search);
  return searchResult.map(entry => entry.item);
}

