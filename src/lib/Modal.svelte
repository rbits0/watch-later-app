<script lang="ts">
	import { browser } from "$app/environment";
	import type { Snippet } from "svelte";

  interface Props {
    showModal: boolean,
    children: Snippet,
  }

  let { showModal = $bindable(), children }: Props = $props();
  

  function handleEscape(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      showModal = false;
    }
  }
  

  if (browser) {
    const htmlTag = document.querySelector('html')!;

    $effect(() => {
      // Open
      if (showModal) {
        // Disable scrolling
        htmlTag.classList.add('modal-is-open');

        window.addEventListener('keydown', handleEscape);
      }
      
      // Close
      return () => {
        htmlTag.classList.remove('modal-is-open');
        window.removeEventListener('keydown', handleEscape);
      }
    });    
  }
</script>


<dialog open={showModal}>
  {@render children()}
</dialog>