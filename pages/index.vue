<template>
  <div>
    <div
      :key="home.objectID"
      v-for="home in homes"
      style="float: left; margin: 10px"
    >
      <nuxt-link :to="`/home/${home.objectID}`">
        <HomeCard :home="home"
      /></nuxt-link>
    </div>
  </div>
</template>

<script>
import homes from '~/data/homes'

export default {
  head() {
    return {
      title: 'Homepage',
      meta: [
        {
          name: 'description',
          content: 'This is a homepage',
          hid: 'description',
        },
      ],
    }
  },
  data() {
    return {
      homes: homes.slice(0, 3),
    }
  },
}
</script>
