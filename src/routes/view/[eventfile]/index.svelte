<script lang="ts">
  import { page } from '$app/stores';
  import { base } from '$app/paths';

  $: eventfile = $page.params.eventfile;
</script>

<h1>{eventfile}</h1>

<a href={base}>View all</a>
