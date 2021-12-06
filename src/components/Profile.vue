<template>
  <section class="profile">
    <figure class="cover">
      <img :src="cover" alt="" class="cover" />
    </figure>
    <header class="header">
      <img class="pfp" :src="pfp" alt="" />
      <h1 class="name">John Doe</h1>
      <h3 class="friend-count">567 friends</h3>
    </header>
  </section>
</template>

<script>
import Cover from "../assets/cover.jpg";
import Pfp from "../assets/pfp.png";

export default {
  name: "Profile",
  data() {
    return {
      cover: Cover,
      pfp: Pfp,
    };
  },
};
</script>

<style scoped>
.profile {
  max-width: 950px;
  margin: 0 auto;
}

.cover {
  position: relative;
}

.cover::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.3) 20%,
    rgba(0, 0, 0, 0) 100%
  );
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1a1a1a;
  padding-bottom: 2rem;
  border-bottom: 1px solid #303030;
}

.pfp {
  position: relative;
  z-index: 1;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  margin-top: -90px;
  margin-bottom: 1rem;
}

.name {
  font-size: 2rem;
  font-weight: 700;
}

.friend-count {
  color: #808080;
  font-weight: 600;
}
</style>
