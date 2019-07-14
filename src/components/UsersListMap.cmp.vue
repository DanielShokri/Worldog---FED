<template>
  <section class="usersMapList">
<br>
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
    
  </section>
</template>

<script>
export default {
  name: "about",
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
      posIsrael: {lat:32.088007, lng:34.8031678},
    };
  },
  methods: {
    setCenter(pos, zoom = 10) {
      this.$refs.mapRef.$mapPromise.then(map => {
        map.panTo(pos);
        this.zoomIn = zoom;
      });
    }
  },
  components: {}
};
</script>

