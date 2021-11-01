<template>
  <nav :class="{ extended: extended }">
    <header class="bg-dark bg-blur">
      <div class="nav-toggle" @click="toggleExtended">
        <transition name=fade>
          <i v-if="!extended" class="bi-list"></i>
          <i v-else class="bi-x"></i>
        </transition>
      </div>
      <img src="@/assets/images/bf-2042-teal-nav-logo.svg" alt="logo">
    </header>
    <transition name="slide-full-toggle-up">
      <div v-show="extended" id="nav-extended" class="bg-dark bg-blur">
        <div id="link-group">
          <router-link v-for="route in routes" :key="route.name" @click="toggleExtended" :to="`/${route.route}`">{{route.name}}</router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  data () {
    return {
      routes: [
        { name: 'Countdowns', route: 'countdowns' },
        { name: 'System Requirements', route: 'requirements' },
        { name: 'Credits', route: 'credits' }
      ],
      extended: false
    }
  },
  methods: { toggleExtended () { this.extended = !this.extended } },
  watch: { $route () { this.extended = false } }
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
  left: 0; top: 0;
  height: 100%;
  text-align: center;
  width: 60px;
  line-height: 60px;
  font-size: 30px;
  cursor: pointer;
  overflow: hidden;
  transition: color .3s cubic-bezier(0.075, 0.82, 0.165, 1);
}
nav .nav-toggle:hover {
  color: var(--accent);
}

nav #nav-extended {
  position: absolute;
  height: calc(100vh);
  padding: 20px;
  width: 100%;
  z-index: -1;
  border-top: 2px solid var(--accent);
}

nav #nav-extended #link-group a {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: grey;
  padding: 8px 0;
  font-size: 30px;
  transition: color .2s;
}

nav #nav-extended #link-group a.router-link-exact-active,
nav #nav-extended #link-group a:hover {
  color: var(--accent);
  text-shadow: 0 0 5px var(--accent);
}
</style>
