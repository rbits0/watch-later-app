interface VideoData {
  title: string,
  channelName: string,
  videoUrl: string,
  videoId: string,
  channelUrl: string,
  thumbnailUrls?: {[key: string]: string},
}

export type { VideoData }