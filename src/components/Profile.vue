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

    <div class="container" v-if="status === 'success'">
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

    <div class="container loading" v-else-if="status === 'loading'">
      <img :src="loading" alt="" />
    </div>

    <div class="container error" v-else-if="status === 'error'">
      <p>Couldn't fetch posts! Use <code>npm run db</code> then refresh.</p>
    </div>
  </section>
</template>

<script>
import Cover from "../assets/cover.jpg";
import Pfp from "../assets/pfp.png";
import Loading from "../assets/loading.svg";
import Post from "./Post.vue";
import PostForm from "./PostForm.vue";
import formatDate from "../formatDate";

export default {
  components: { Post, PostForm },
  name: "Profile",
  data() {
    return {
      status: "loading",
      cover: Cover,
      pfp: Pfp,
      loading: Loading,
      posts: [],
      formatDate,
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const res = await fetch("http://localhost:3000/posts");
        const data = await res.json();
        this.posts = data;
        this.status = "success";
      } catch (e) {
        this.status = "error";
        console.log(e);
      }
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

.loading,
.error {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}
.loading img {
  animation: loading linear 0.8s infinite;
  width: 32px;
}
.error code {
  background: #2c2c2c;
  padding: 0.2em;
  border-radius: 5px;
}

@keyframes loading {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
