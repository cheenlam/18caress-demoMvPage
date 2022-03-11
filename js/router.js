function Router() {
    this.routes = {};
    this.currentUrl = '';
}

Router.prototype.route = function(path, callback) {
    this.routes[path] = callback || function() {};
    //给不同的hash设置不同的回调函数
};


Router.prototype.refresh = function() {
    // 路由清單
    let routerList = ['', 'home'];

    for (let i of routeList.theme) {
        routerList.push(`theme/${i.router}`);
    }
    for (let i of routeList.actor) {
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
    indexVue.nowStatus = {
        title: routeList.home.title,
        page: routeList.home.page,
        desc: routeList.home.desc
    };

    $('meta[property="og:description"]').attr('content',routeList.home.desc);
});

for (let i of routeList.theme) {
    Router.route(`/theme/${i.router}`, function() {
        mainInclude('page/theme.html');
        indexVue.nowStatus = {
            title: i.title,
            page: i.sort,
            desc:i.desc
        };
        indexVue.carousel.nowShow = i.sort;
       
    });
}
for (let i of routeList.actor) {
    Router.route(`/actor/${i.router}`, function() {
        mainInclude('page/theme.html');
        indexVue.nowStatus = {
            title: i.title,
            page: i.sort,
            desc:i.desc
        };
        indexVue.carousel.nowShow = i.sort;

        let nowTitle = i.title
        $('meta[property="og:title"]').attr('content',`成人影視平台 | 18Caress | ${i.title}`);
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

