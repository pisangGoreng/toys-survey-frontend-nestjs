export default {
  // GET INITIAL LOCATION
  SET_USER_LOCATION({ maps }, { latitude, longitude, address }) {
    maps.address = address
    maps.userLocation = {
      latitude,
      longitude,
    }
  },

  // GET ACTIVE LOCATION
  SET_ACTIVE_LOCATION({ maps }, { latitude, longitude }) {
    maps.activeLocation = {
      latitude,
      longitude,
    }
  },
}
