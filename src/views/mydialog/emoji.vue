<template>
    <div id="emoji">
        <div v-for="(emoji, index) in emojis" :key="index" @click="addEmoji(emoji)">{{emoji}}</div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            emojis: [
                '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉',
                '😊', '😋', '😎', '😍', '😘', '🥰', '😗', '😙', '😴',
                '😚', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶',
                '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫',
                '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕',
                '🙃', '🤑', '😲', '😖', '😞', '😟', '😤', '🙁', '😻',
                '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱',
                '🥵', '🥶', '😳', '🤪', '😵', '😡', '😠', '😢', '💩',
                '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🤠',
                '🤡', '🥳', '🥴', '🥺', '🤥', '🤫', '🤭', '🧐', '🤓',
            ],
        }
    },

    methods: {
        addEmoji(emoji) {
            this.$emit("addEmoji", emoji)
        }

    }

}
</script>

<style lang="scss" scoped>
    #emoji {
        width: 100%;
        background-color: rgba(255, 250, 250, 0.75);
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        > div {
            margin: 5px;
        }
        > div:hover {
            cursor: pointer;
        }
    }
</style>