import { Suspense, useDeferredValue, useEffect, useState } from 'react';
import './App.scss';
import VideoData from './VideoData';
import VideoRow from './VideoRow';
import { filterVideos } from './search';
import { useModal } from './hooks/UseModal';

let storedVideos: VideoData[];

if (typeof window !== 'undefined') {
  // Initialise application
  storedVideos = getStoredVideos();
  deDuplicateVideos(storedVideos);
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
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  const [isDeleteOpen, handleDeleteOpen, handleDeleteClose] = useModal();
  

  const filteredVideos = filterVideos(videos, search);
  

  useEffect(() => {
    saveVideos(videos);
  }, [videos]);
  

  function addVideos(newVideos: string | VideoData[]) {
    if (typeof newVideos === 'string') {
      newVideos = JSON.parse(newVideos);
    }
    
    setVideos((videos) => (
      (newVideos as VideoData[]).concat(videos)
    ));
  }
  
  
  function saveVideos(videos: VideoData[]) {
    localStorage.setItem('videos', JSON.stringify(videos))
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
    <div>
      <dialog open={isDeleteDialogVisible}>
        <article className='confirm-dialog'>
          <b>Delete Videos?</b>
          <div role='group'>
            <button className='secondary'>Cancel</button>
            <button className='delete-button'>Delete</button>
          </div>
        </article>
      </dialog>

      <div className='main'>
        <div className='sidebar'>
          <button onClick={onImportClick}>Import file</button>
          <button onClick={() => setIsDeleteDialogVisible(true)}>Delete videos</button>
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
                  <VideoRow video={video} key={video.videoId}/>
              ))}
            </div>

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


function deDuplicateVideos(videos: VideoData[]) {
  const seen = new Set();
  for (const [i, video] of videos.entries()) {
    if (seen.has(video.videoId)) {
      videos.splice(i, 1);
    } else {
      seen.add(video.videoId);
    }
  }
}


export default App;
