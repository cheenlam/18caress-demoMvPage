let indexVue = Vue.createApp({
    data() {
        return {
            // 輪播meun
            carousel: {
                imgList: carouselImg,
                nowShow: '',
                menu: carouselMenu,
            },
            
            // 漢堡選單開關
            sortMenu: false,
            // 連結&下載位置
            dlBtn: dlBtn,

            // 現在的頁面顯示
            nowStatus: {
                title:'熱門影片',
                page:'home'
            },
        }
    },
    methods: {
        // 返回背景style
        getbgi(data) {
            return `background-image: url(${data.img});--bgpos:${data.pos}`;
        },

        // 隨機初始資料
        ranStart() {
            // 隨機播放圖
            let array = [];
            for (var key in mvData ) {array.push(key)}
            this.carousel.nowShow = array[parseInt(Math.random() * array.length)];
        },

        // 視窗大小變更
        winResize() {
            this.sortMenu = false;
        },
    },
    mounted() {
        this.ranStart();
        window.addEventListener('resize', this.winResize);
    }
}).mount("#indexBox");