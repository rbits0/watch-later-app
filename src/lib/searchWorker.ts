import { filterVideos } from "./search";
import type { VideoData } from "./VideoData";
import type { VideoDetails } from "./youtube/VideoDetails";


self.onmessage = (event: MessageEvent) => {
  console.log('searchWorker.ts');

  const videos: VideoData[] = event.data[0];
  const videoDetails: { [key: string]: VideoDetails} = event.data[1];
  const search: string = event.data[2];
  
  const result = filterVideos(videos, videoDetails, search);
  console.log(`search: ${event.data[2]}`);
  postMessage(result);
}
