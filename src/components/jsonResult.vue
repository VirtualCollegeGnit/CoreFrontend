<template>
  <div>
    <ul>
      <li v-for="(data1, key) in data" :key="key">{{ key }} - {{ data1 }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
};
</script>

<style></style>
