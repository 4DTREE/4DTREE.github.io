var imgDataPath = '/photos/photoslist.json'; //图片名称高宽信息json文件路径
var imgPath = '/photos/images';  //图片访问路径
var imgMaxNum = 50; //图片显示数量

var windowWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
if (windowWidth < 768) {
    var imageWidth = 145; //图片显示宽度(手机端)
} else {
    var imageWidth = 215; //图片显示宽度
}

photo = {
    page: 1,
    offset: imgMaxNum,
    init: function () {
        var that = this;
        $.getJSON(imgDataPath, function (data) {
            that.render(that.page, data);
            //that.scroll(data);
        });
    },
    render: function (page, data) {
        var begin = (page - 1) * this.offset;
        var end = page * this.offset;
        if (begin >= data.length) return;
        var html, imgNameWithPattern, imgName, imageSize, imageX, imageY, imgNameWithoutDot,li = "";
        for (var i = begin; i < end && i < data.length; i++) {
            imgNameWithPattern = data[i].split(' ')[1];
            imgNameWithoutDot = imgNameWithPattern.split('.')[0];
            imgName = imgNameWithoutDot.split('/').pop()
            imageSize = data[i].split(' ')[0];
            imageX = imageSize.split('.')[0];
            imageY = imageSize.split('.')[1];
           
        //    li += '<div class="card" style="width:' + imageWidth + 'px" >' +
                    // '<div class="ImageInCard" style="height:'+ imageWidth * imageY / imageX + 'px">' +
                    //   '<a data-fancybox="gallery" href="' + imgPath + imgNameWithPattern + '" data-caption="' + imgName + '" title="' +  imgName + '">' +
                        // '<img data-src="' + imgPath + imgNameWithPattern + ' " src="' + imgPath + imgNameWithPattern + ' " data-loaded="true">' +
                    //   '</a>' +
                    // '</div>' +
                //   '</div>'

            
            //这里 250 指的是图片的宽度，可以根据自己的需要调整相册中照片的大小
            li += '<div class="card" style="width:250px">' +
                '<div class="ImageInCard" style="height:' + 250 * imageY / imageX + 'px">' +
                //href 和 src 的链接地址是相册照片外部链接，也可以放博客目录里
                '<a data-fancybox="gallery" href="' + imgNameWithPattern + '?raw=true" data-caption="' + imgName + '">' +
                '<img src="' + imgNameWithPattern + '?raw=true"/>' +
                '</a>' +
                '</div>' +
                // 
                '' 
                + imgName + '' +  //图片下显示文件名作为说明的功能
                '</div>'
        }
        $(".ImageGrid").append(li);
        this.minigrid();
    },
    minigrid: function () {
        var grid = new Minigrid({
            container: '.ImageGrid',
            item: '.card',
            gutter: 12
        });
        grid.mount();
        $(window).resize(function () {
            grid.mount();
        });
    }
}
photo.init();