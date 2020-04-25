<template>
  <div id="message" :class="{selfsend: payload.selfsend}">
    <div class="avatar">

      <img v-if="payload.selfsend" :src="selfAvatar" alt />
      <img v-else :src="targetAvatarUrl" alt />
    </div>

    <div class="body">
      <span>{{payload.body}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    payload: Object,
    targetAvatarUrl: String
  },
  data() {
    return {
      selfAvatar: this.current_user.avatar
    }
  }
};
</script>

<style lang="scss" scoped>
$avatar_size: 40px;
$bubble_color: #ffc78e;
$bubble_selfsend_color: rgba(100, 124, 237, 0.5);

#message.selfsend {
  flex-direction: row-reverse;
}

#message.selfsend > .body > span {
  background-color: $bubble_selfsend_color;
  margin: 10px 10px 5px 0px;

  padding: 5px 8px;
  display: inline-block;
  border-radius: 4px;
  position: relative;
}

#message.selfsend > .body > span::before {
  content: "";
  border: 8px solid transparent;

  border-left: 8px solid $bubble_selfsend_color;


  position: absolute;
  top: 6px;
  right: -16px;
}

#message.selfsend > .body > span::after {
  content: none;
}


#message {
  padding-top: 5px;
  display: flex;

  flex-wrap: nowrap;
  > .avatar > img {
    display: block;
    width: $avatar_size;
    height: $avatar_size;
  }
  > .body {
    max-width: calc(100% - 60px);
  }
  > .body > span {
      
    background-color: $bubble_color;
    padding: 5px 8px;
    display: inline-block;
    border-radius: 4px;
    margin: 10px 0 5px 10px;
    position: relative;
  }
  > .body > span::after {
    content: "";
    border: 8px solid transparent;
    border-right: 8px solid $bubble_color;
    position: absolute;
    top: 6px;
    left: -16px;
  }
}
</style>