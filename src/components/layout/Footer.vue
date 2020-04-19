<template>
    <el-footer>
        <div> Made with 💖</div>
        <div>
        By
            <a :href="sina_url">Sina</a>, 
            <a :href="ali_url">Ali</a>, 
            <a :href="logan_url">Logan</a>, 
            <a :href="michael_url">Michael</a>, 
        and <a :href="nick_url">Nick</a>
        </div>
    </el-footer>
</template>

<script>
    export default {
        name: 'footer-beer',
        data() {
            return {
                sina_url: 'http://sinakhalili.com',
                ali_url: '',
                logan_url: '',
                michael_url: '',
                nick_url: 'http://nchubb.com'
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>