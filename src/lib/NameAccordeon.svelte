<script lang="ts">
  import { slide } from 'svelte/transition';

  export let names: Record<string, string[]>;
  export let linkFunc: (zev: string, event: string) => string;

  let expanded: number | null = null;

  function handleExpand(index: number) {
    if (index === expanded) {
      expanded = null;
    } else {
      expanded = index;
    }
  }
</script>

{#each Object.entries(names) as [zevFile, events], index}
  <div>
    <button on:click={() => handleExpand(index)}
      >{zevFile} {index === expanded ? 'close' : 'open'}</button
    >
    {#if index === expanded}
      <div transition:slide>
        {#each events as event}
          <div><a href={linkFunc(zevFile, event)}>{event}</a></div>
        {/each}
      </div>
    {/if}
  </div>
{/each}
