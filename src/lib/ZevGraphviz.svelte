<script lang="ts">
  import { graphviz } from 'd3-graphviz';
  import { onMount } from 'svelte';
  import { wasmFolder } from '@hpcc-js/wasm';
  import { getDotSrcForEvent } from './zev-src';
  import { browser } from '$app/env';
  import { base } from '$app/paths';

  export let zevname: string;
  export let eventname: string;

  let graphcontainer: HTMLElement;
  let error: any;

  onMount(async () => {
    if (browser) {
      wasmFolder(base);
      let graph = graphviz(graphcontainer);
      graph.renderDot(await getDotSrcForEvent(zevname, eventname).catch((e) => (error = e)));
    }
  });
</script>

{#if error}
  <span>Error: {error}</span>
{/if}

<div bind:this={graphcontainer} />
