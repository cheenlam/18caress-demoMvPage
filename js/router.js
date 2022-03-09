function Router() {
    this.routes = {};
    this.currentUrl = '';
}

Router.prototype.route = function(path, callback) {
    this.routes[path] = callback || function() {};
    //给不同的hash设置不同的回调函数
};

let themeRouteList = [
    {router:'amateur',sort:'sort_01',title:'素人影片'},
    {router:'western',sort:'sort_02',title:'西洋歐美'},
    {router:'anime',sort:'sort_03',title:'裏番動漫'},
    {router:'uniform',sort:'sort_04',title:'制服誘惑'},
    {router:'milf',sort:'sort_05',title:'熟女人妻'},
]

let actorRouteList = [
    {router:'Hatano-Yui',sort:'actor_01',title:'波多野結衣'},
    {router:'Mikami-Yua',sort:'actor_02',title:'三上悠亜'},
    {router:'Arina-Hashimoto',sort:'actor_03',title:'橋本ありな'},
    {router:'Fukada-Eimi',sort:'actor_04',title:'深田えいみ'},
    {router:'Nanatsumori-Riri',sort:'actor_05',title:'七ツ森りり'},
    {router:'Shiomi-Mai',sort:'actor_06',title:'潮美舞'},
    {router:'Miwako-Ikeda',sort:'actor_07',title:'篠田あゆみ'},
    {router:'Matsushita-Saeko',sort:'actor_08',title:'松下紗栄子'},
]


Router.prototype.refresh = function() {
    // 路由清單
    let routerList = ['', 'home'];

    for (let i of themeRouteList) {
        routerList.push(`theme/${i.router}`);
    }
    for (let i of actorRouteList) {
        routerList.push(`actor/${i.router}`);
    }

    // console.log(location.hash.slice(1)); 
    //获取到相应的hash值
    let index = routerList.indexOf(location.hash.slice(2))
    if (index == -1) {
        this.currentUrl = '/home'
        location.href = "#/home"
    } else {
        this.currentUrl = location.hash.slice(1) || '/home';
    }
    // this.currentUrl = location.hash.slice(1) || '/home'; 
    //如果存在hash值则获取到，否则设置hash值为/
    // console.log(this.currentUrl);
    if (this.currentUrl && this.currentUrl != '/') {
        this.routes[this.currentUrl](); //根据当前的hash值来调用相对应的回调函数
    }

};
Router.prototype.init = function() {
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
}

//给window对象挂载属性
window.Router = new Router();
window.Router.init();

// 路由呼叫路徑
Router.route('/home', function() {
    mainInclude('page/home.html');
    indexVue.nowStatus = { title:'熱門影片',page:'home'};
});

for (let i of themeRouteList) {
    Router.route(`/theme/${i.router}`, function() {
        mainInclude('page/theme.html');
        indexVue.nowStatus = { title: i.title,page: i.sort};
        indexVue.carousel.nowShow = i.sort;
    });
}
for (let i of actorRouteList) {
    Router.route(`/actor/${i.router}`, function() {
        mainInclude('page/theme.html');
        indexVue.nowStatus = { title: i.title,page: i.sort};
        indexVue.carousel.nowShow = i.sort;
    });
}

function mainInclude(src) {
    $.ajax({
        url: src,
        success: function(html) {
            $("#content").html(html);
        },
        // 發送前
        beforeSend: function() {},
        // 完成
        complete: function() {},
        error: function(error) {
            location.href = "#/home"
        }
    });
}

