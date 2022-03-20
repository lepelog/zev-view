<!-- <script context="module">
    export const prerender = false;
</script> -->
<script lang="ts">
  import { browser } from '$app/env';

  import { base } from '$app/paths';
  import { page } from '$app/stores';
  import ZevGraphviz from '$lib/ZevGraphviz.svelte';

  $: eventfile = browser && $page.url.searchParams.get('eventfile');
  $: eventname = browser && $page.url.searchParams.get('eventname');
</script>

{#if eventfile && eventname}
  <h1>{eventfile}/{eventname}</h1>

  <a href={base}>To index</a>

  <ZevGraphviz zevname={eventfile} {eventname} />
{:else}
  loading...
{/if}
