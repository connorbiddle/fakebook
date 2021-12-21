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

    <div class="container" v-if="posts">
      <PostForm :afterSubmit="fetchPosts" :refresh="fetchPosts" />
      <transition
        v-for="post in getOrderedPosts()"
        :key="post.id"
        name="fade"
        appear
      >
        <Post
          :id="post.id"
          :content="post.content"
          :date="formatDate(post.date)"
          :refresh="fetchPosts"
        />
      </transition>
    </div>
  </section>
</template>

<script>
import Cover from "../assets/cover.jpg";
import Pfp from "../assets/pfp.png";
import Post from "./Post.vue";
import PostForm from "./PostForm.vue";
import formatDate from "../formatDate";

export default {
  components: { Post, PostForm },
  name: "Profile",
  data() {
    return {
      cover: Cover,
      pfp: Pfp,
      posts: [],
      formatDate,
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      const res = await fetch("http://localhost:3000/posts");
      const data = await res.json();

      this.posts = data;
    },
    getOrderedPosts() {
      return this.posts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    },
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

.fade-enter-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(0.5rem);
}
</style>
