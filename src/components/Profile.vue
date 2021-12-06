<template>
  <section class="profile">
    <figure class="cover">
      <img :src="cover" alt="" class="cover" />
    </figure>

    <header class="header">
      <img class="pfp" :src="pfp" alt="" />
      <template v-if="user.info">
        <h1 class="name">{{ user.info.name }}</h1>
        <h3 class="friend-count">{{ user.info.friends }} friends</h3>
      </template>
      <p v-else>Loading...</p>
    </header>

    <h1 style="text-align: center; margin: 4rem 0">Post form here!</h1>

    <template v-if="user.posts">
      <Post
        v-for="post in user.posts"
        :key="post.id"
        :author="post.author"
        :content="post.content"
        :date="new Date(post.date).toDateString()"
      />
    </template>
  </section>
</template>

<script>
import Cover from "../assets/cover.jpg";
import Pfp from "../assets/pfp.png";
import Post from "./Post.vue";

export default {
  components: { Post },
  name: "Profile",
  data() {
    return {
      cover: Cover,
      pfp: Pfp,
      user: {},
    };
  },
  async mounted() {
    const res = await fetch("http://localhost:3000/user");
    const data = await res.json();
    this.user = data;
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
  border: 1px solid #303030;
  border-top: none;
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
