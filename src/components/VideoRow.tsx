import VideoData from "../VideoData";

interface VideoRowProps {
  video: VideoData,
}

function VideoRow({ video }: VideoRowProps): JSX.Element {
  const { title, channelName, videoUrl, videoId, channelUrl, thumbnailUrl } = video;

  return (
    <div role='row' className='row'>
      <a role='cell' className='cell thumbnail-cell' href={videoUrl}>
        <img alt='Thumbnail' src={thumbnailUrl}/>
      </a>
      <a role='cell' className='cell' href={videoUrl}>
        {title}
      </a>
      <a role='cell' className='cell' href={channelUrl}>
        {channelName}
      </a>
    </div>
  )
}


export default VideoRow;