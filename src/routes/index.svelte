<script lang="ts">
  import NameAccordeon from '$lib/NameAccordeon.svelte';
  import { getAllNames } from '$lib/zev-src';
  import { base } from "$app/paths";

  let searchValue = '';
  let searchResults: [string, string][] = [];

  function linkFunc(zev: string, event: string): string {
    return `${base}/view/${zev}/${event}`;
  }

  function doSearch(names: Record<string, string[]>) {
    const lowerSearch = searchValue.toLowerCase();
    let newResults = [];
    for (const [zev, events] of Object.entries(names)) {
      for (const event of events) {
        if (event.toLowerCase().includes(lowerSearch)) {
          newResults.push([zev, event]);
        }
      }
    }
    searchResults = newResults;
  }
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<h1>Hi</h1>

{#await getAllNames()}
  Fetching all names...
{:then names}
  Search: <input bind:value={searchValue} on:input={() => doSearch(names)} />
  {#if searchValue === ''}
    <NameAccordeon {names} {linkFunc} />
  {:else}
    <ul>
      {#each searchResults as [zev, event]}
        <li><a href={`${base}/view/${zev}/${event}`}>{event}</a></li>
      {/each}
    </ul>
  {/if}
{/await}
