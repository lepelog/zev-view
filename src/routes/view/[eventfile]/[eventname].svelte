<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/stores';
  import ZevGraphviz from '$lib/ZevGraphviz.svelte';

  $: eventfile = $page.params.eventfile;
  $: eventname = $page.params.eventname;
</script>

<h1>{eventfile}/{eventname}</h1>

<a href={base}>To index</a>

<ZevGraphviz zevname={eventfile} {eventname} />
