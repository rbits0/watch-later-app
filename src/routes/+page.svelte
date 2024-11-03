<script lang="ts">
  import '../app.scss';
</script>


<div>
  <!-- <DeleteDialog/> -->
  
  <!-- <ApiKeyDialog/> -->

  <div class='main'>
    <div class='sidebar'>
      <button>Import File</button>
      <button>Set API Key</button>
      <button class='delete-button'>Delete Videos</button>
    </div>

    <div class='main-2'>

      <input
        type='search'
        placeholder='Search'
        class='search'
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