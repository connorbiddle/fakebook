<template>
  <article class="post">
    <header class="header">
      <img :src="pfp" alt="" />
      <div>
        <h1 class="author">{{ author }}</h1>
        <span class="date">
          {{ date }}
        </span>
      </div>
    </header>
    <p>{{ content }}</p>
  </article>
</template>

<script>
import Pfp from "../assets/pfp.png";

export default {
  name: "Post",
  props: {
    author: String,
    content: String,
    date: String,
  },
  data() {
    return {
      pfp: Pfp,
    };
  },
};
</script>

<style scoped>
.post {
  max-width: 500px;
  margin: 1rem auto;
  padding: 1rem;
  background-color: #1a1a1a;
  border-radius: 5px;
  border: 1px solid #303030;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.header img {
  width: 2.5rem;
  margin-right: 0.5rem;
  border-radius: 50%;
}

.header .author {
  font-size: 1rem;
}

.header .date {
  font-size: 0.85rem;
  color: #a8a8a8;
}
</style>
