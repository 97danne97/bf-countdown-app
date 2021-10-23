<template>
  <nav :class="{ extended: extended }">
    <header class="bg-dark bg-blur">
      <img src="@/assets/images/bf-2042-teal-nav-logo.svg">
      <div class="nav-toggle" @click="extended = !extended">
        <transition name=fade>
          <i v-if="!extended" class="bi-list"></i>
          <i v-else class="bi-x"></i>
        </transition>
      </div>
    </header>
    <div id="nav-extended" class="bg-dark bg-blur">
      <div id="link-group">
      <router-link v-for="route in routes" :key="route.name" @click="toggleExtended" :to="`/${route.route}`">{{route.name}}</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  data () {
    return {
      routes: [
        { name: 'Countdowns', route: 'countdowns' },
        { name: 'Requirements', route: 'requirements' },
        { name: 'Credits', route: 'credits' }
      ],
      extended: false
    }
  },
  methods: {
    toggleExtended () {
      this.extended = !this.extended
    }
  },
  watch: {
    $route () {
      this.extended = false
    }
  }
}
</script>

<style scoped>
nav {
  position: fixed;
  width: 100vw;
  top: 0;
  z-index: 2;
  user-select: none;
}

nav header {
  height: 60px;
  padding: 12px;
  display: flex;
  justify-content: center;
}

nav .nav-toggle {
  position: absolute;
  left: 0;
  top: 0;
  height: 60px;
  text-align: center;
  width: 60px;
  line-height: 60px;
  font-size: 30px;
  cursor: pointer;
  overflow: hidden;
  transition: color .3s cubic-bezier(0.075, 0.82, 0.165, 1);
}
nav .nav-toggle:hover {
  color: #26FFD6;
}

nav #nav-extended {
  position: absolute;
  visibility: hidden;
  transform: translateY(100%);
  transform-origin: top;
  transition: .3s cubic-bezier(0.89, 0.375, 0.365, 1);
  width: 100%;
  z-index: -1;
  border-top: 2px solid transparent;
}

nav.extended #nav-extended{
  transition: .3s cubic-bezier(0.1, .5, 0.12, 1);
  visibility: visible;
  transform: none;
  border-color: #26FFD6;
}

nav #nav-extended #link-group{
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  padding: 0 20px;
  margin-top: 20px;
  height: calc(100vh);
}

nav a {
  font-weight: bold;
  text-decoration: none;
  color: #bbbbbb;
  padding: 10px 7px;
  font-size: 30px;
  line-height: 30px;
  transition: color .2s;
}

nav a.router-link-exact-active, nav a:hover {
  color: #26FFD6;
}
</style>
