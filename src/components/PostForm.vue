<template>
  <form class="post-form" @submit.prevent="onSubmit">
    <input
      type="text"
      placeholder="Something to share?"
      v-model="post"
      @change="onChange"
    />
  </form>
</template>

<script>
import { v4 as uuid } from "uuid";

export default {
  name: "PostForm",
  props: {
    refresh: Function,
    user: Object,
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
        content: this.post,
        author: this.user.info.name,
        date: new Date().toISOString(),
      };

      const newPosts = [post, ...this.user.posts];

      await fetch("http://localhost:3000/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...this.user,
          posts: newPosts,
        }),
      });

      this.post = "";
      this.refresh();
    },
  },
};
</script>

<style scoped>
.post-form {
  margin: 1rem 0;
}

.post-form input {
  background-color: #1a1a1a;
  border: 1px solid #303030;
  border-radius: 5px;
  padding: 0.75rem;
  width: 100%;
  font-size: 1rem;
  color: #fff;
}
</style>
