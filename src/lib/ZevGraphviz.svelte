<script lang="ts">
  import { graphviz } from 'd3-graphviz';
  import { onDestroy, onMount } from 'svelte';
  import { wasmFolder } from '@hpcc-js/wasm';
  import { getEventViewerForEvent } from './zev-src';
  import { browser } from '$app/env';
  import { base } from '$app/paths';
  import type { EventViewer } from './zevlib';
  import { select, selectAll } from 'd3-selection';

  export let zevname: string;
  export let eventname: string;

  let graphcontainer: HTMLElement;
  let error: any;

  let detailsTitle: string | undefined;
  let detailsDesc: string | undefined;

  let selectedActor: number = 0;
  let selectedStep: number = 0;

  let eventView: EventViewer | undefined;

  $: {
    updateTitleDetails(selectedActor, selectedStep);
  }

  onMount(async () => {
    if (browser) {
      wasmFolder(base);
      eventView = await getEventViewerForEvent(zevname, eventname);
      doRender();
    }
  });

  function updateTitleDetails(selectedActor: number, selectedStep: number) {
    eventView?.set_select_step(selectedActor, selectedStep);
    const id = `a_${selectedActor}_${selectedStep}`;
    detailsTitle = eventView?.get_details_title();
    detailsDesc = eventView?.get_details();
    // update selected color
    selectAll('.node').each(function () {
      const node = select(this);
      console.log(
        node.selectChildren('ellipse').attr('stroke'),
        node.attr('id'),
        node.attr('color')
      );
      if (node.attr('id') == id) {
        node.selectChildren('ellipse').attr('stroke', 'red');
      } else {
        node.selectChildren('ellipse').attr('stroke', 'black');
      }
    });
  }

  function doRender() {
    if (eventView !== undefined) {
      eventView.set_select_step(selectedActor, selectedStep);
      graphviz(graphcontainer)
        .renderDot(eventView.to_dot_string())
        .on('end', function () {
          selectAll('.node').on('click', function () {
            const selected = select(this);
            const id = selected.attr('id');
            const [actoridx, stepidx] = id
              .slice(2)
              .split('_', 2)
              .map((a) => parseInt(a));
            selectedActor = actoridx;
            selectedStep = stepidx;
          });
        });
      detailsTitle = eventView.get_details_title();
      detailsDesc = eventView.get_details();
    }
  }

  onDestroy(() => {
    eventView?.free();
  });

  function processDetails(details: string): string {
    const detailsParsed = JSON.parse(details);

    const data = detailsParsed.data;
    detailsParsed.data = Object.fromEntries(
      data.map((datum) => {
        return [
          datum.name,
          Object.fromEntries([
            ['unk1', datum.unk1],
            [datum.values.t, datum.values.c]
          ])
        ];
      })
    );

    return JSON.stringify(detailsParsed, null, 2);
  }
</script>

{#if error}
  <span>Error: {error}</span>
{/if}

<div class="grapharea">
  {#if detailsDesc}
    <div class="graphdetails">
      <h2>{detailsTitle}</h2>
      <pre>{processDetails(detailsDesc)}</pre>
    </div>
  {/if}

  <div bind:this={graphcontainer} />
</div>

<style>
  .grapharea {
    display: flex;
  }

  .graphdetails {
    width: 300px;
  }
</style>
