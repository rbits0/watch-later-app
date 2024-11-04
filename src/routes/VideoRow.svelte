<script lang="ts">
	import type { Thumbnail, VideoData } from "$lib/VideoData";

  interface Props {
    video: VideoData,
    thumbnailUrls?: { [key: string]: Thumbnail } | null;
  }
  
  const { video, thumbnailUrls }: Props = $props();
  const { title, channelName, videoUrl, channelUrl } = video;
</script>


<div role='row' class='row'>
  <a role='cell' class='cell thumbnail-cell' href={videoUrl}>
    <img
      alt='Thumbnail'
      src={thumbnailUrls ? thumbnailUrls['medium'].url : ''}/>
  </a>
  <a role='cell' class='cell' href={videoUrl}>
    {title}
  </a>
  <a role='cell' class='cell' href={channelUrl}>
    {channelName}
  </a>
</div>