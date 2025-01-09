<script>
/* global google */
/* eslint no-case-declarations: "off" */

export default {
  methods: {
    CurrentLocation() {
      return new Promise(((resolve, reject) => {
        if (navigator.geolocation) {
          const options = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 15000,
          };

          navigator.geolocation.getCurrentPosition((position) => {
            const bound100Meter = 100;
            resolve(
              this.$gmaps
                .load()
                .then(this.getAddressWithLatLng(position, bound100Meter))
                .catch((err) => reject(err)),
            );
          }, (err) => reject(err), options);
        } else {
          reject(new Error('Geolocation is not supported by this device.'));
        }
      }));
    },

    GetLocationDistance(location1, location2) {
      const toRadius = (val) => (val * Math.PI) / 180;
      const earthEquatorialRadiusToMeter = 6378160;

      const distanceLatitude = toRadius(location2.latitude - location1.latitude);
      const distanceLongitude = toRadius(location2.longitude - location1.longitude);
      const latitude1 = toRadius(location1.latitude);
      const latitude2 = toRadius(location2.latitude);

      const squareSinDistanceLatitude = Math.sin(distanceLatitude / 2) ** 2;
      const squareSinDistanceLongitude = Math.sin(distanceLongitude / 2) ** 2;
      const cosLatitude = Math.cos(latitude1) * Math.cos(latitude2);

      const haversine = squareSinDistanceLatitude + squareSinDistanceLongitude * cosLatitude;
      const archaversine = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));

      const distance = earthEquatorialRadiusToMeter * archaversine;
      return distance;
    },

    getAddressWithLatLng(position, bound) {
      return () => {
        const {
          latitude,
          longitude,
          boundPosition,
        } = this.getLatLngWithBound(position, bound);

        const geocoder = new google.maps.Geocoder();
        const latLng = new google.maps.LatLng(latitude, longitude);
        const latLngSW = new google.maps.LatLng(boundPosition.south, boundPosition.west);
        const latLngNE = new google.maps.LatLng(boundPosition.north, boundPosition.east);
        const LatLngBounds = new google.maps.LatLngBounds(latLngSW, latLngNE);

        return new Promise(((resolve, reject) => {
          geocoder.geocode({ latLng, bounds: LatLngBounds }, (results, status) => {
            switch (status) {
              case google.maps.GeocoderStatus.OK:
                const address = results[0].formatted_address;
                const timezoneArea = results[0].address_components.find((component) => component.types.includes('administrative_area_level_1'))?.short_name;
                resolve({ 
                  address, 
                  latitude, 
                  longitude, 
                  timezoneArea,
                });
                break;
              default:
                reject(new Error(`Geolocation failed due to: ${status}`));
            }
          });
        }));
      };
    },

    getLatLngWithBound(position, bound) {
      const latitude = parseFloat(position.coords.latitude);
      const longitude = parseFloat(position.coords.longitude);

      const degree = 180;
      const radiusEarth = 6371000;

      const range = bound / radiusEarth;
      const radian = degree / Math.PI;
      const theta = Math.cos(latitude * (Math.PI / degree));

      const boundLatitude = range * radian;
      const boundLongitude = (range * radian) / theta;

      return {
        latitude,
        longitude,
        boundPosition: {
          north: latitude + boundLatitude,
          south: latitude - boundLatitude,
          east: longitude + boundLongitude,
          west: longitude - boundLongitude,
        },
      };
    },
  },
};
</script>
