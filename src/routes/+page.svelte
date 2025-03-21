<script lang="ts">
	import { browser } from '$app/environment';
  import lodash from "lodash";
	import DeleteModal from '$lib/components/DeleteModal.svelte';
	import type { VideoData } from '$lib/VideoData';
	import { getVideoDetails, type VideoDetails } from '$lib/youtube/VideoDetails';
	import { onMount } from 'svelte';
  import '../app.scss';
	import ApiKeyModal from './ApiKeyModal.svelte';
	import VideoRow from './VideoRow.svelte';
	import { filterVideos } from '$lib/search';
	import { shuffleArray } from '$lib/shuffle';
  
  const storedVideos = browser ? loadStoredVideos() : [] 
  let videos = $state(storedVideos);
  let filteredVideos: VideoData[] = $state(storedVideos);
  let videoDetails = $state(browser ? loadStoredVideoDetails() : {});
  let search = $state('');
  let showDeleteModal = $state(false);
  let showApiKeyModal = $state(false);


  if (browser) {
    $effect(() => {
      // Save videos
      localStorage.setItem('videos', JSON.stringify(videos));
    })
    
    $effect(() => {
      localStorage.setItem('videoDetails', JSON.stringify(videoDetails));
    })
  }
  

  onMount(() => {
    if (browser && window.Worker) {
      initSearchWorker();
    }
  })

  async function initSearchWorker() {
    const searchWorker = new Worker(new URL('$lib/searchWorker.ts', import.meta.url), {
      type: 'module'
    });

    searchWorker.onmessage = (event: MessageEvent) => {
      filteredVideos = event.data;
    };
    
    const searchDebounced = lodash.debounce((
      videos: VideoData[],
      videoDetails: { [key: string]: VideoDetails },
      search: string,
    ) => {
      searchWorker.postMessage([
        $state.snapshot(videos),
        $state.snapshot(videoDetails),
        $state.snapshot(search),
      ]);
    }, 300);

    $effect(() => {
      searchDebounced(videos, videoDetails, search);
    })
  }
  

  function loadStoredVideos(): VideoData[] {
    const storedVideos = localStorage.getItem('videos');
    if (storedVideos) {
      let videos: VideoData[] = JSON.parse(storedVideos);
      deDuplicateVideos(videos);
      return videos;
    } else {
      return [];
    }
  }
  
  function loadStoredVideoDetails(): { [key: string]: VideoDetails } {
    const storedVideoDetails = localStorage.getItem('videoDetails');
    if (storedVideoDetails) {
      return JSON.parse(storedVideoDetails, (key, value) => {
        return key === 'lastFetched' ? new Date(value) : value;
      });
    } else {
      return {};
    }
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
    
    videos = newVideos.concat(videos);
    deDuplicateVideos(videos);
  }
  

  function deleteVideos() {
    videos = [];
  }
  

  // Gets details for all new videos (videos that haven't been fetched before)
  async function getNewVideoDetails() {
    if (!browser) {
      return;
    }

    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
      console.log('API key not set. Unable to fetch video details');
      return;
    }

    const unfetchedVideos = videos.filter(
        video => !(Object.keys(videoDetails).includes(video.videoId))
      ).map(video => video.videoId);
    const newVideoDetails = await getVideoDetails(unfetchedVideos, apiKey);

    // Add new video details to existing video details
    for (const video of newVideoDetails) {
      video.lastFetched = new Date();
      videoDetails[video.id] = video;
    }
  }


  function shuffleVideos() {
    shuffleArray(filteredVideos);
  }
  

  // async function onSearchInput(event: { currentTarget: HTMLInputElement }) {
  //   const x = await filterVideos(videos, event.currentTarget.value, videoDetails);
  //   filteredVideos = x;
  // }

</script>



<div>
  <DeleteModal
    bind:showModal={showDeleteModal}
    confirmCallback={deleteVideos}
  />
  
  <ApiKeyModal bind:showModal={showApiKeyModal} />

  <div class='main'>
    <div class='sidebar'>
      <button onclick={importFile}>Import File</button>
      <button onclick={() => showApiKeyModal = true}>Set API Key</button>
      <button onclick={() => showDeleteModal = true} class='delete-button'>Delete Videos</button>
      <button onclick={getNewVideoDetails}>Get Video Details</button>
      <button onclick={shuffleVideos}>Shuffle Videos</button>
      <!-- <button onclick={test}>Test</button> -->
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
          
          {#await filteredVideos then filteredVideos}
            {#each filteredVideos as video (video.videoId)}
              <VideoRow
                {video}
                thumbnailUrls={
                  Object.keys(videoDetails).includes(video.videoId)
                  ? videoDetails[video.videoId].thumbnails
                  : null
                }/>
            {/each}
          {/await}
        </div>

      </div>

    </div>
  </div>
</div>

<footer>
  <p>Made by <a href="https://github.com/rbits0">rbits0</a></p>
  <a href="https://github.com/rbits0/watch-later-app">Source code</a>
</footer>