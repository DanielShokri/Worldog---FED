<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">MeetHav</h1>
        <h2 class="subtitle">
          Meet new and intrensting dog's nearby
          <!-- <strong>sections</strong>, like the one you're currently reading -->
        </h2>
      </div>
    </section>

    <section class="hero is-primary">
      <div class="hero-body">
        <h1>Nearby Parks</h1>
        <div class="container">
          <GmapMap
            class="map"
            ref="mapRef"
            :center="{lat:32.088007, lng:34.8031678}"
            :zoom="zoomIn"
            map-type-id="terrain"
            style="max-width: 500px; height: 300px"
          >
            <GmapMarker
              v-for="(m, index) in markers"
              :key="index"
              :position="m.position"
              :clickable="true"
              :draggable="true"
              @click="setCenter(m.position)"
            />
          </GmapMap>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      langs: ["he", "en"],
      times: [1552552892953, 1552552891953, 1552522892953],
      markers: [
        { position: { lat: 31.771959, lng: 35.217018 } },
        { position: { lat: 31.08807, lng: 34.8031678 } },
        { position: { lat: 32.08803, lng: 34.8031678 } }
      ],
      zoomIn: 7,
      posIsrael: { lat: 32.088007, lng: 34.8031678 }
    };
  },
  components: {}
};
</script>
<style scoped>
.hero-body {
  display: flex;
  padding: 0;
  height: 300px;
}
</style>