<template>
  <div id="tabbar_icon" @click="selected">
    <div>
      <div class="icon">
        <slot name="activated" v-if="activated"></slot>
        <slot name="deactivated" v-else></slot>
      </div>
      <div class="category" :style="computed_color">{{category}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabbar-item",
  props: {
    category: {
        type: String,
    },
    link: {
        type: String
    },
    activated_color: {
        type: String,
        default: 'cornflowerblue'
    }

  },
  data() {
    return {

    };
  },
  computed: {
    activated() {
        
        return this.$route.path.indexOf(this.link) == 0
    },
    computed_color() {
        return this.activated ? { color: this.activated_color } : {}
    }

  },
  methods: {
      selected() {
        this.$router.replace(this.link).catch(a => 0)
      }
  }
};
</script>

<style scoped>

#tabbar_icon {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;

}

.category {
    font-size: 12px;
}

.icon {
    display: flex;
    justify-content: center;
    padding: 4px 0;
}

.icon > img {
    display: block;
    width: 24px;
    height: 24px;
}



</style>
