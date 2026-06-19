
$(function () {
      //history.pushState(null, null, document.URL);
      //  window.addEventListener('popstate', function () {
      //      history.pushState(null, null, document.URL);
      //  }); 
    $("#is-close").on("click", function () {
        $("#close").css("display", "none")
        $("#open").css("display", "block")
    }),
        $("#is-open").on("click", function () {
            $("#open").css("display", "none")
            $("#close").css("display", "block")
        })
    $("dd").on("click", function () {
        $(this).find(".tip-content").css("display", "block")
        $(this).siblings().find(".tip-content").css("display", "none")
    })
    $(".img-close").on("click", function (event) {
        event.stopPropagation()
        $(this).parent().parent().css("display", "none")
    })
    // 返回顶部
    $(".goTopBtn").click(function () {
        var sc = $(window).scrollTop();
        $('body,html').animate({ scrollTop: 0 }, 500);
    })
})

       // 选中样式
       var listUrl;
       $('.list>li').on("click",function(){
        $(this).addClass('list-check').siblings().removeClass('list-check')
        $('.nav>span').removeClass('nav-check')
           var dataUrl = $(this).attr('data-url')
           if(dataUrl){
            if(dataUrl.indexOf("?")==-1){
               var  url = dataUrl
               }else{
                var index = dataUrl.indexOf("?")
                var url = dataUrl.substr(0,index);
               }
           }
          listUrl = url
    })
    $('.nav>span').on("click",function(){
       $(this).addClass('nav-check').siblings().removeClass('nav-check')
       $('.list>li').removeClass('list-check')
      
    })
 // 切换页面



//  ---------------
var listBox = true
$(".page-url").on("click", function () {
    event.preventDefault();
    window.localStorage.removeItem("id")
    let iframeUrl = $(this).attr("data-url");
    let isOpen = $(this).attr("data-blank");
    if (isOpen == null) {
        window.location.href = iframeUrl;
    } else {
        window.open(iframeUrl,'target','');
    }
    
    return;
    if(iframeUrl.indexOf('?')==-1){
        listBox = true
        if( listBox = "true"){
            $("#changePage").attr("src", iframeUrl)
            $("#changePage").on("load", function () {
                showBox()
            })
        }
        

    }else{
        listBox = false
        var index1 = iframeUrl.indexOf("=")
        var index2 = iframeUrl.indexOf("?")
        var url = iframeUrl.substr(0,index2);
        if( listBox = "false"){
            $("#changePage").attr("src", url)
            $("#changePage").on("load", function () {
                hideBox()
            })
        }
        if(iframeUrl.indexOf('-')==-1){
            var id = iframeUrl.substr(index1+1);
            $("#changePage").on("load",function(){
                $("#changePage")[0].contentWindow.postMessage({id:id},"*")
            })
        }else{
            var index3 = iframeUrl.indexOf("-")
            var id = iframeUrl.substr(index1+1,index3-index1-1);
            var page = iframeUrl.substr(index3+1);
            $("#changePage").on("load",function(){
                $("#changePage")[0].contentWindow.postMessage({id:id,page:page},"*")
            })
        }
    }
})

//监听子页面的传递数据
window.addEventListener('message', function (event) {
    const op = event.data
   
    if(op.page){
        var src = getIframeSrc()
        if(op.page.indexOf(listUrl)==-1){
           $(".list li[data-url='"+ src +"']").addClass('list-check').siblings().removeClass('list-check')
        //    $('.nav>span').removeClass('nav-check')
        }
    }
   //信息蒙层
    if(op.Shade){Shade(op.Shade.str,op.Shade.width)}
    if(op.mask=="true"){
       $(".mask").css("display","block")
    }else{
        $(".mask").css("display","none")
    }
    // 加载蒙层
    if(op.loading){loadLayer(op.loading)}
   //左边栏显示隐藏
   //if(op.isShow && op.isShow=='true'){showBox()}
   //if(op.isShow && op.isShow=='false'){ hideBox()}
    // 动态获取iframe页面高度
    if (op.height) {
        $("#changePage").css("height", op.height + "px")
    }
    //获取iframe子页面传递的iframeurl
    if (op.iframeUrl) {
        //console.log(op.iframeUrl)

        if(op.iframeUrl.indexOf('?')==-1){
            $("#changePage").attr("src", op.iframeUrl)
            $("#changePage").on("load", function () {
                showBox()
            })
        }else{
            var index1 = op.iframeUrl.indexOf("=")
            var index2 = op.iframeUrl.indexOf("?")
            var url = op.iframeUrl.substr(0,index2);
            $("#changePage").attr("src", url)
            $("#changePage").on("load", function () {
                hideBox()
            })
            if(op.iframeUrl.indexOf('-')==-1){
                var id = op.iframeUrl.substr(index1+1);
                $("#changePage").on("load",function(){
                    $("#changePage")[0].contentWindow.postMessage({id:id},"*")
                })
            }else{
                var index3 = op.iframeUrl.indexOf("-")
                var id = op.iframeUrl.substr(index1+1,index3-index1-1);
                var page = op.iframeUrl.substr(index3+1);
                $("#changePage").on("load",function(){
                    $("#changePage")[0].contentWindow.postMessage({id:id,page:page},"*")
                })
            }
        }
       
    }
})
//信息layer
function Shade(str, width) {
    if (!width) {
        width = 300;
    }
    layer.open({
        content: str,
        area :width +'px',
        btn: ['确定', '取消'],
      
        yes: function(index, layero){
          //按钮【按钮一】的回调
        }
        ,btn2: function(index, layero){
          //按钮【按钮二】的回调
          
          //return false 开启该代码可禁止点击该按钮关闭
        }
        ,cancel: function(){ 
          //右上角关闭回调
          
          //return false 开启该代码可禁止点击该按钮关闭
        },
      });
}

//加载layer
function loadLayer(text){
    layer.msg(text, {
        icon: 16
        ,shade: 0.3
      });
}


//退出
$(".drop-out").on("click", function () {
    window.location.replace("/Home/LoginOut")
})
// 获取 iframeSrc
function getIframeSrc(){
    var src = $('#changePage').attr('src')
    var i = src.indexOf('.')
    return src.substr(0,i)
}

function hideBox(){
    $(".list-box").addClass('hidden')
    $(".content").addClass('bg-White')
    $(".middle").addClass('bor-gray')
}
function showBox(){
    $(".list-box").removeClass('hidden')
    $(".content").removeClass('bg-White')
    $(".middle").removeClass('bor-gray')
}


