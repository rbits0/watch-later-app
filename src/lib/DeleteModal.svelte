<script lang="ts">
  import Modal from "./Modal.svelte";
  
  interface Props {
    showModal: boolean,
    confirmCallback: () => void,
  }
  
  let { showModal = $bindable(), confirmCallback }: Props = $props();

</script>


<Modal bind:showModal>
  <article class='confirm-dialog'>
    <b>Delete Videos?</b>
    <div role='group'>
      <button onclick={() => showModal = false} class='secondary'>Cancel</button>
      <button
        onclick={() => {
          showModal = false;
          confirmCallback();
        }}
        class='delete-button'
      >Delete</button>
    </div>
  </article>
</Modal>