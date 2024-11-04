<script lang="ts">
	import { browser } from "$app/environment";
	import { disableScrollHandling } from "$app/navigation";
	import type { Snippet } from "svelte";

  interface Props {
    showModal: boolean,
    children: Snippet,
  }
  let { showModal = $bindable(), children }: Props = $props();
  
  let dialog: HTMLDialogElement | undefined = $state();
  let showTestDiv = $state(false)
  let testDiv: HTMLElement = $state() as HTMLElement;
  

  function handleEscape(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      showModal = false;
    }
  }
  
  function handleAnimationEnd() {
    dialog?.close();
  }
  

  if (browser) {
    const htmlTag = document.querySelector('html')!;

    $effect(() => {
      if (showModal) {
        // Open

        dialog?.showModal();
        // Disable scrolling
        htmlTag.classList.add('modal-is-open');
        
        window.addEventListener('keydown', handleEscape);
        
      } else {
        // Close

        dialog?.close();
      }
      
      return () => {
        htmlTag.classList.remove('modal-is-open');
        window.removeEventListener('keydown', handleEscape);
      }
    });    
  }
</script>


<dialog
  bind:this={dialog}
  class='modal'
>
  {@render children()}
</dialog>



<style lang="scss">
  $modal-duration: 0.2s;

  dialog, dialog:not([open]) {
    display: flex;
    inset: 0;
    opacity: 0;
    visibility: hidden;
    transition: 
      opacity #{$modal-duration} ease-out 0s,
      visibility #{$modal-duration} ease-out 0s;
  }

  dialog[open] {
    visibility: visible;
    opacity: 1;
  }
  
  @keyframes fade {
    to {
      backdrop-filter: none;
      background-color: transparent;
    }
  }
  
  :global(dialog.modal > article) {
    transition: transform #{$modal-duration} ease-out 0s;
    
  }
  
  :global(dialog.modal:not([open]) > article) {
    transform: translateY(100%);
  }
  
</style>