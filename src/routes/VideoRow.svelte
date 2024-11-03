<script lang="ts">
	import type { VideoData } from "$lib/VideoData";

  interface Props {
    video: VideoData,
  }
  
  const { video }: Props = $props();
  const { title, channelName, videoUrl, channelUrl, thumbnailUrls } = video;
</script>


<div role='row' class='row'>
  <a role='cell' class='cell thumbnail-cell' href={videoUrl}>
    <img
      alt='Thumbnail'
      src={thumbnailUrls ? thumbnailUrls["default"].url : ""}/>
  </a>
  <a role='cell' class='cell' href={videoUrl}>
    {title}
  </a>
  <a role='cell' class='cell' href={channelUrl}>
    {channelName}
  </a>
</div>