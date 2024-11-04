import type { Thumbnail } from "$lib/VideoData";

export interface YoutubeVideoResponse {
  snippet: YoutubeVideoSnippet,
  contentDetails: YoutubeVideoContentDetails,
}

export interface YoutubeVideoSnippet {
  publishedAt: string,
  channelId: string,
  title: string,
  description: string,
  channelTitle: string,
  thumbnails: { [key: string]: Thumbnail },
  tags: string[],
  duration: string,
}

export interface YoutubeVideoContentDetails {
    duration: string,
}
