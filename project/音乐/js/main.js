/*
1. 歌曲的搜索接口
 url: https://autumnfish.cn/search
 method: get

 2. 歌曲url获取接口
 url: https://autumnfish.cn/song/url
 method: get

 3. 歌曲详情获取
 url: https://autumnfish.cn/song/detail
 method: get
 para: ids

 4. 歌曲
 url: https://autumnfish.cn/comment/hot?type=0
 method: get
 para: id(歌曲的id)

 5. mv
 url: https://autumnfish.cn/mv/url
 method: get
 para: id(0表示没有mv)
 */

var app = new Vue({
  el: "#player",
  data: {
    query: "一起走过的日子",
    // 歌曲列表
    musicList: [],
    // 歌曲的url
    musicUrl: "",
    // 歌曲的封面
    musicCover: "",
    // 歌曲评论
    hotComments:[],
    // 动画播放的状态
    isPlaying:false,
    // 遮罩层的显示状态
    isShow: false,
    // mv地址
    mvUrl: ""
  },
  methods: {
    // 歌曲搜索
    searchMusic: function () {
      var that = this;
      axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(
        function (response) {
          console.log(response);
          that.musicList = response.data.result.songs;
        },
        function (err) {}
      );
    },
    playMusic: function(musicId){
        var that = this;
        //console.log(musicId)
        axios.get("https://autumnfish.cn/song/url?id=" + musicId)
        .then(function(response){
            //console.log(response.data);
            //console.log(response.data.data[0].url);
            that.musicUrl = response.data.data[0].url
        }, function(err){ })

        // 歌曲详情获取
        axios.get("https://autumnfish.cn/song/detail?ids="+ musicId)
        .then(function(response){
            //console.log(response.data.songs[0].al.picUrl);
            that.musicCover = response.data.songs[0].al.picUrl

        }, function(err){})

        // 歌曲的评论
        axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
        .then(function(response){
            console.log(response.data.hotComments);
            that.hotComments = response.data.hotComments;
        }, function(err){})
    },
    //歌曲播放状态
    play: function(){
        //console.log("paly")
        this.isPlaying = true
    },
    pause: function(){
        //console.log("pause")
        this.isPlaying = false
    },
    playMv: function(mvid){
        var that = this
        axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
        .then(function(response){
           //console.log(response)
           console.log(response.data.data.url)
           that.isShow = true;
           that.mvUrl = response.data.data.url
        },function(err){})
    },
    // 隐藏
    hide: function(){
        this.isShow = false;
    }
  }
})
