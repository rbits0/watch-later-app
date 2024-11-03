interface VideoData {
  title: string,
  channelName: string,
  videoUrl: string,
  videoId: string,
  channelUrl: string,
  thumbnailUrls?: { [key: string]: Thumbnail },
}

interface Thumbnail {
  url: string,
  width: string,
  height: string,
}

export type { VideoData, Thumbnail }