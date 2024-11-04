<script lang="ts">
	import { browser } from '$app/environment';
	import DeleteModal from '$lib/DeleteModal.svelte';
	import { filterVideos } from '$lib/search';
	import type { VideoData } from '$lib/VideoData';
  import '../app.scss';
	import ApiKeyModal from './ApiKeyModal.svelte';
	import VideoRow from './VideoRow.svelte';
  
  let videos = $state(browser ? loadStoredVideos() : []);
  let search = $state('');
  let showDeleteModal = $state(false);
  let showApiKeyModal = $state(false);

  let filteredVideos = $derived(filterVideos(videos, search));


  $effect(() => {
    // Save videos
    if (!browser) {
      return;
    }

    localStorage.setItem('videos', JSON.stringify(videos));    
  })
  
  
  function loadStoredVideos(): VideoData[] {
    const storedVideos = browser ? localStorage.getItem('videos') : null;
    let videos: VideoData[] = storedVideos ? JSON.parse(storedVideos) : [];
    deDuplicateVideos(videos);
    return videos;
  }
  
  function deDuplicateVideos(videos: VideoData[]) {
    const seen = new Set();
    let i = 0;
    while (i < videos.length) {
      if (seen.has(videos[i].videoId)) {
        console.log(`Video ${videos[i].videoId} already exists`);
        videos.splice(i, 1);
      } else {
        seen.add(videos[i].videoId);
        i++;
      }
    }
  }


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
    deDuplicateVideos(videos);
  }
  

  function deleteVideos() {
    videos = [];
  }

</script>



<div>
  <DeleteModal
    bind:showModal={showDeleteModal}
    confirmCallback={deleteVideos}
  />
  
  <!-- <ApiKeyDialog/> -->
  <ApiKeyModal bind:showModal={showApiKeyModal} />

  <div class='main'>
    <div class='sidebar'>
      <button onclick={importFile}>Import File</button>
      <button onclick={() => showApiKeyModal = true}>Set API Key</button>
      <button onclick={() => showDeleteModal = true} class='delete-button'>Delete Videos</button>
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
          
          {#each filteredVideos as video (video.videoId)}
            <VideoRow {video}/>
          {/each}
        </div>

      </div>

    </div>
  </div>
</div>