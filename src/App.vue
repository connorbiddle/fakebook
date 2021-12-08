<template>
  <Navbar />
  <Profile />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Profile from "./components/Profile.vue";

export default {
  name: "App",
  components: { Navbar, Profile },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #111;
  color: #fff;
}

img {
  max-width: 100%;
  margin-bottom: -4px;
}

input {
  font-family: inherit;
}

.container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
