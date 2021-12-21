<template>
  <article class="post">
    <header class="header">
      <img :src="pfp" alt="" />
      <div>
        <h1 class="author">John Doe</h1>
        <span class="date">
          {{ date }}
        </span>
      </div>
      <button class="delete" @click="deletePost">
        <i class="fas fa-trash-alt"></i>
      </button>
    </header>
    <p>{{ content }}</p>
  </article>
</template>

<script>
import Pfp from "../assets/pfp.png";

export default {
  name: "Post",
  props: {
    id: String,
    content: String,
    date: String,
    refresh: Function,
  },
  data() {
    return {
      pfp: Pfp,
    };
  },
  methods: {
    async deletePost() {
      await fetch(`http://localhost:3000/posts/${this.id}`, {
        method: "DELETE",
      });
      this.refresh();
    },
  },
};
</script>

<style scoped>
.post {
  margin: 1rem 0;
  padding: 1rem;
  background-color: #1a1a1a;
  border-radius: 5px;
  border: 1px solid #303030;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  position: relative;
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

.header .delete {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  color: #bb4c4c;
  border: none;
  font-size: 0.9rem;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.post:hover .header .delete {
  opacity: 1;
}
</style>
