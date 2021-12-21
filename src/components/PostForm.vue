<template>
  <form class="post-form" @submit.prevent="onSubmit">
    <input
      type="text"
      placeholder="Something to share?"
      v-model="post"
      @change="onChange"
    />
    <button type="submit">
      <i class="fas fa-arrow-circle-right"></i>
    </button>
  </form>
</template>

<script>
import { v4 as uuid } from "uuid";

export default {
  name: "PostForm",
  props: {
    refresh: Function,
  },
  data() {
    return {
      post: "",
    };
  },
  methods: {
    async onSubmit() {
      const post = {
        id: uuid(),
        content: this.post.trim(),
        author: "John Doe",
        date: new Date().toISOString(),
      };

      if (!post.content) return;

      await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });

      this.post = "";
      this.refresh();
    },
  },
};
</script>

<style scoped>
.post-form {
  margin: 1.5rem 0;
  border-bottom: 1px solid #303030;
  display: flex;
  align-items: center;
}

.post-form input {
  width: 100%;
  font-size: 1rem;
  color: #fff;
  background-color: transparent;
  border: none;
  padding: 0.75rem 0;
}

.post-form button {
  cursor: pointer;
  opacity: 0.6;
  font-size: 1.2rem;
  background-color: transparent;
  border: none;
  color: #fff;
  transition: opacity 0.2s ease;
}

.post-form button:hover {
  opacity: 1;
}
</style>
