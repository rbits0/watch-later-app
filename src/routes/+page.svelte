<script lang="ts">
	import { browser } from '$app/environment';
	import type { VideoData } from '$lib/VideoData';
  import '../app.scss';
  
  const storedVideos = browser ? localStorage.getItem('videos') : null;
  let videos: VideoData[] = $state(storedVideos ? JSON.parse(storedVideos) : []);
  let search = $state('');

  $effect(() => {
    // Save videos
    if (!browser) {
      return;
    }

    localStorage.setItem('videos', JSON.stringify(videos));    
  })
  

  function importFile() {
    const fileInput = document.createElement('input');    
    fileInput.type = 'file';
    fileInput.click();

    fileInput.onchange = async () => {
      if (fileInput.files && fileInput.files.length > 0) {
        const fileText = await fileInput.files[0].text();
        addVideos(fileText);
      }
    };
  }
  
  function addVideos(newVideos: string | VideoData[]) {
    if (typeof newVideos === 'string') {
      newVideos = JSON.parse(newVideos) as VideoData[];
    }
    
    videos = videos.concat(newVideos);
  }
</script>


<div>
  <!-- <DeleteDialog/> -->
  
  <!-- <ApiKeyDialog/> -->

  <div class='main'>
    <div class='sidebar'>
      <button onclick={importFile}>Import File</button>
      <button>Set API Key</button>
      <button class='delete-button'>Delete Videos</button>
    </div>

    <div class='main-2'>

      <input
        type='search'
        placeholder='Search'
        class='search'
        bind:value={search}
      />

      <div class='overflow-auto'>

        <div role='table' class='table'>
          <div role='row' class='row'>
            <span role='columnheader' class='cell table-header'>Thumbnail</span>
            <span role='columnheader' class='cell table-header'>Title</span>
            <span role='columnheader' class='cell table-header'>Channel</span>
          </div>
          
          <!-- <VideoRow video={video}/> -->
        </div>

      </div>

    </div>
  </div>
</div>