<template>
  <div>
    <div style="display: flex">
      <img
        v-for="image in home.images"
        :key="image"
        :src="image"
        width="200"
        height="150"
      />
    </div>
    {{ home.title }} <br />
    ${{ home.pricePerNight }} / night <br />
    <img src="/images/marker.svg" alt="marker" width="20" height="20" />
    {{ home.location.address }} {{ home.location.city }}
    {{ home.location.state }} {{ home.location.country }} <br />
    <img src="/images/star.svg" alt="star" width="20" height="20" />{{
      home.reviewValue
    }}
    <br />
    {{ home.guests }} guests, {{ home.bedroom }} rooms, {{ home.beds }} beds,
    {{ home.bathrooms }} bath <br />
    {{ home.description }}
    <div style="height: 800px; width: 800px" ref="map"></div>
    <div v-for="review in reviews" :key="review.objectID">
      <img :src="review.reviewer.image" /> <br />
      {{ review.reviewer.name }} <br />
      {{ formatDate(review.date) }} <br />
      <!-- {{ review.comment }} <br /> -->
      <short-text :text="review.comment" :target="150" /> <br />
      <img :src="user.image" /> <br />
      {{ user.name }} <br />
      {{ formatDate(user.joined) }} <br />
      {{ user.reviewCount }} <br />
      {{ user.description }} <br />
    </div>
  </div>
</template>

<script>
// import homes from '~/data/homes'
// if (process.client) {
//   window.initMap = function () {
//     console.log('test')
//   }
// }

import ShortText from '../../components/ShortText.vue'

// console.log(process.client)
export default {
  // components: {
  //   homes,
  // },
  head() {
    return {
      title: this.home.title,
      // script: [
      //   {
      //     src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCLXZSSD1S9aK864l_k4ekcz3AHoCIwTZU&libraries=places&callback=initMap',
      //     hid: 'map',
      //     async: true,
      //     skip: process.client && window.mapLoaded,
      //   },
      //   {
      //     innerHTML: 'window.initMap = function() { window.mapLoaded = true }',
      //     hid: 'map-init',
      //   },
      // ],
      // __dangerouslyDisableSanitizersByTagID: {
      //   'map-init': ['innerHTML'],
      // },
    }
  },
  // data() {
  //   return {
  //     home: [],
  //   }
  // },
  // methods: {
  //   showMap() {
  //     const mapOptions = {
  //       zoom: 18,
  //       center: new window.google.maps.LatLng(
  //         this.home._geoloc.lat,
  //         this.home._geoloc.lng
  //       ),
  //       disableDefaultUI: true,
  //       zoomControl: true,
  //     }
  //     const map = new window.google.maps.Map(this.$refs.map, mapOptions)
  //     const position = new window.google.maps.LatLng(
  //       this.home._geoloc.lat,
  //       this.home._geoloc.lng
  //     )
  //     const marker = new window.google.maps.Marker({ position })
  //     marker.setMap(map)
  //   },
  // },
  mounted() {
    // const timer = setInterval(() => {
    //   if (window.mapLoaded) {
    //     clearInterval(timer)
    //     this.showMap()
    //   }
    // })
    this.$maps.showMap(
      this.$refs.map,
      this.home._geoloc.lat,
      this.home._geoloc.lng
    )
  },
  async asyncData({ params, $dataApi, error }) {
    // Coming from local json data
    // const home = homes.find((home) => home.objectID === this.$route.params.id)
    // this.home = home

    // const homeRes = await $dataApi.getHome(params.id)
    // if (!homeRes.ok)
    //   return error({ statusCode: homeRes.status, message: homeRes.statusText })

    // const reviewRes = await $dataApi.getReviewsByHomeId(params.id)
    // if (!reviewRes.ok)
    //   return error({
    //     statusCode: reviewRes.status,
    //     message: reviewRes.statusText,
    //   })

    // const userRes = await $dataApi.getUsersByHomeId(params.id)
    // if (!userRes.ok)
    //   return error({
    //     statusCode: userRes.status,
    //     message: userRes.statusText,
    //   })

    const responses = await Promise.all([
      $dataApi.getHome(params.id),
      $dataApi.getReviewsByHomeId(params.id),
      $dataApi.getUsersByHomeId(params.id),
    ])

    const badResponse = responses.find((response) => !response.ok)
    if (badResponse)
      return error({
        statusCode: userRes.status,
        message: userRes.statusText,
      })

    return {
      // home: homeRes.json,
      // reviews: reviewRes.json.hits,
      // user: userRes.json.hits[0],

      home: responses[0].json,
      reviews: responses[1].json.hits,
      user: responses[2].json.hits[0],
    }
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric',
      })
    },
  },
}
</script>
