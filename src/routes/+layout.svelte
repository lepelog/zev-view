<script lang="ts">
  import '../app.css';
</script>

<main>
  <slot />
</main>

<footer>
  <p><a href="https://lepelog.github.io/zev-view">Source code</a></p>
</footer>

<style>
  /* main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
  }

  @media (min-width: 480px) {
    footer {
      padding: 40px 0;
    }
  } */
</style>
