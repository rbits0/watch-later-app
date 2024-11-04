<script lang="ts">
	import { browser } from "$app/environment";
  import Modal from "$lib/Modal.svelte";
  
  interface Props {
    showModal: boolean,
  }
  let { showModal = $bindable() }: Props = $props();
  
  let apiKey = $state('');


  if (browser) {
    $effect(() => {
      if (showModal) {
        apiKey = localStorage.getItem('apiKey') || '';
      }
    })
  }
  

  function handleSubmit() {
    localStorage.setItem('apiKey', apiKey);
    showModal = false;
  }

</script>



<Modal bind:showModal>
  <article class='confirm-dialog'>
  
        <form onsubmit={handleSubmit}>
          <input
            type="text"
            bind:value={apiKey}
            placeholder="API Key"
          />
          <div role="group">
            <button
              type="button"
              onclick={() => showModal = false}
              class="secondary"
            >
              Cancel
            </button>
            <button type="submit">Confirm</button>
          </div>
        </form>

  </article>
</Modal>