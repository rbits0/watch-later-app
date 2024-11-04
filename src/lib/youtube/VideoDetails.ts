import type { Thumbnail } from "../VideoData";
import type { YoutubeVideoResponse } from "./ResponseTypes";

interface VideoDetails {
  id: string,
  publishedAt: Date,
  channelId: string,
  title: string,
  description: string,
  channelTitle: string,
  thumbnails: { [key: string]: Thumbnail },
  tags: string[],
  duration: string,
  lastFetched?: Date,
}


async function getVideoDetails(videoIds: string[], apiKey: string): Promise<VideoDetails[]> {
  // apiKey = localStorage.getItem('apiKey')!;

  const url = 'https://youtube.googleapis.com/youtube/v3/videos';
  const idString = videoIds.join(',');
  const params = new URLSearchParams({
    id: idString,
    part: 'snippet,contentDetails',
    fields: 'items(id,snippet(' +
        'publishedAt,channelId,title,description,channelTitle,thumbnails,tags' +
      '),contentDetails(duration))',
    key: apiKey,
  });
  
  const response = await fetch(`${url}?${params.toString()}`);
  const json = await response.json();
  console.dir(json);
  
  return json.items.map((video: YoutubeVideoResponse) => ({
    id: video.id,
    publishedAt: new Date(video.snippet.publishedAt),
    channelId: video.snippet.channelId,
    title: video.snippet.title,
    description: video.snippet.description,
    channelTitle: video.snippet.channelTitle,
    thumbnails: video.snippet.thumbnails,
    tags: video.snippet.tags,
    duration: video.contentDetails.duration,
  }));
}


export { getVideoDetails };
export type { VideoDetails };