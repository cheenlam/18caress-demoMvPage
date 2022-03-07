var indexVue = Vue.createApp({
    data() {
        return {
            // 輪播meun
            carousel: {
                imgList: carouselImg,
                nowShow: '',
                menu: carouselMenu,
            },
            sortMenu: false,

            // 連結&下載位置
            dlBtn: dlBtn,

            // 影片列表
            mvList: {
                list: mvData,
                sort: ''
            },
        }
    },
    methods: {
        // 返回背景style
        getbgi(data) {
            return `background-image: url(${data.img});--bgpos:${data.pos}`;
        },
        rebgi(data) {
            let showImg = this.isMobile() ? '' : `background-image: url(${data.img})`;
            return `background-image: url(${data.img})`;
        },

        // 判斷移動端
        isMobile() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
            var flag = false;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = true;
                    break;
                }
            }
            return flag;
        },
        // 隨機初始資料
        ranStart() {
            let array = [];
            for (var key in mvData ) {array.push(key)}
            this.carousel.nowShow = this.mvList.sort = array[parseInt(Math.random() * array.length)];
        }
    },
    mounted() {
        this.ranStart();
    }
}).mount("#indexBox");