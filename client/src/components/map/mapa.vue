<template>
  <l-map
    ref="mapa"
    style="height: 100%"
    :zoom="zoom"
    :center="center"
    @click="mapPointClick"
  >
    <l-tile-layer :url="baseUrl"></l-tile-layer>
  </l-map>
</template>

<script>
import L from "leaflet";
import { LMap, LTileLayer } from "vue2-leaflet";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});
export default {
  mounted() {
    if (this.markerLatLng != null) {
      this.marker = L.marker(this.markerLatLng);
      this.marker.addTo(this.$refs.mapa.mapObject);
    }
  },
  props: {
    markerLatLng: null
  },
  components: {
    LMap,
    LTileLayer
  },
  data() {
    return {
      baseUrl: "https://mapas.geocuba.cu/osm_tiles/{z}/{x}/{y}.png",
      zoom: 7,
      center: [22.04491330024569, -79.46411132812501],
      marker: null
    };
  },
  methods: {
    mapPointClick(event) {
      if (this.marker == null) {
        this.marker = L.marker(event.latlng);
        this.marker.addTo(this.$refs.mapa.mapObject);
      } else {
        this.$refs.mapa.mapObject.removeLayer(this.marker);
        this.marker = L.marker(event.latlng);
        this.marker.addTo(this.$refs.mapa.mapObject);
      }
      this.$emit("mapPointerClicked", event.latlng);
    }
  }
};
</script>

<style>
@import "~leaflet/dist/leaflet.css";
</style>
