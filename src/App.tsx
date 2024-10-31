import { Suspense, useDeferredValue, useEffect, useState } from 'react';
import './App.scss';
import VideoData from './VideoData';
import VideoRow from './VideoRow';
import { filterVideos } from './search';

let storedVideos: VideoData[];

if (typeof window !== 'undefined') {
  // Initialise application
  storedVideos = getStoredVideos();
}


function App(): JSX.Element {
  // const testVideo: VideoData = {
  //   "videoId" : "bRIXgb4UgmY",
  //   "videoUrl": "https://www.youtube.com/watch?v=bRIXgb4UgmY&list=WL&index=1&pp=gAQBiAQB",
  //   "title": "The Endless Universe of \"Bean and Nothingness\"",
  //   "channelName": "Patricia Taxxon",
  //   "channelUrl": "https://www.youtube.com/@Patricia_Taxxon"
  // }

  const [videos, setVideos] = useState<VideoData[]>(storedVideos);
  const [search, setSearch] = useState('');

  const filteredVideos = filterVideos(videos, search);
  

  function addVideos(newVideos: string | VideoData[]) {
    if (typeof newVideos === 'string') {
      newVideos = JSON.parse(newVideos);
    }
    
    setVideos((videos) => {
      const videosCombined = (newVideos as VideoData[]).concat(videos);
      localStorage.setItem('videos', JSON.stringify(videosCombined));
      return videosCombined
    });
  }


  function onImportClick() {
    const fileInput = document.createElement('input');    
    fileInput.type = 'file';
    fileInput.click();

    fileInput.onchange = () => {
      if (fileInput.files && fileInput.files.length > 0) {
        fileInput.files[0].text().then((text) => {
          addVideos(text);
        })
      }
    };
  }
  

  return (
    <div className='main'>
      <div className='sidebar'>
        <button onClick={onImportClick}>Import file</button>
      </div>

      <div className='main-2'>

        <input
          type='search'
          placeholder='Search'
          className='search'
          onChange={(e) => {setSearch(e.target.value)}}
        />

        <div className='overflow-auto'>

          <div role='table' className='table'>
            <div role='row' className='row'>
              <span role='columnheader' className='cell table-header'>Thumbnail</span>
              <span role='columnheader' className='cell table-header'>Title</span>
              <span role='columnheader' className='cell table-header'>Channel</span>
            </div>
            
            {filteredVideos.map((video) => (
                <VideoRow video={video}/>
              )
            )}
          </div>

        </div>

      </div>
    </div>
  );
}


function getStoredVideos(): VideoData[] {
  const videosString = localStorage.getItem('videos');
  if (!videosString) {
    return [];
  } else {
    return JSON.parse(videosString);
  }
}


export default App;
