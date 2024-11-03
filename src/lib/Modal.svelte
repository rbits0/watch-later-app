<script lang="ts">
	import { browser } from "$app/environment";
	import type { Snippet } from "svelte";

  interface Props {
    showModal: boolean,
    children: Snippet,
  }

  let { showModal = $bindable(), children }: Props = $props();
  

  if (browser) {
    const htmlTag = document.querySelector("html")!;

    $effect(() => {
      if (showModal) {
        htmlTag.classList.add('modal-is-open');
      }
      
      return () => {
        htmlTag.classList.remove('modal-is-open');
      }
    });    
  }
</script>


<dialog open={showModal}>
  {@render children()}
</dialog>