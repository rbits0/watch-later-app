import './App.scss';
import VideoData from './VideoData';
import VideoRow from './VideoRow';

function App(): JSX.Element {
  const testVideo: VideoData = {
    "videoId" : "bRIXgb4UgmY",
    "videoUrl": "https://www.youtube.com/watch?v=bRIXgb4UgmY&list=WL&index=1&pp=gAQBiAQB",
    "title": "The Endless Universe of \"Bean and Nothingness\"",
    "channelName": "Patricia Taxxon",
    "channelUrl": "https://www.youtube.com/@Patricia_Taxxon"
  }

  return (
    <div className='container main'>

      <input type='search' placeholder='Search' className='search'/>

      <div className='overflow-auto'>

        <div role='table' className='table'>
          <div role='row' className='row'>
            <span role='columnheader' className='cell table-header'>Thumbnail</span>
            <span role='columnheader' className='cell table-header'>Title</span>
            <span role='columnheader' className='cell table-header'>Channel</span>
          </div>
          <VideoRow video={testVideo}/>
        </div>

      </div>

    </div>
  );
}


export default App;
