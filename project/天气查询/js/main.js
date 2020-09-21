/*
addr: http://wthrcdn.etouch.cn/weather_mini
method: get
*/

var app = new Vue({
    el: "#app",
    data: {
        city:'武汉',
        weatherList: []
    },
    methods: {
        searchWeather: function(){
            //console.log("xxoo");
            //console.log(this.city)
            // 保存this
            var that = this
            axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' 
            + this.city)
            .then (function(response){
                //console.log(response)
                //console.log(response.data.data.forecast)
                that.weatherList = response.data.data.forecast
            })
            .catch(function(err){

            })
        },
        changeCity: function(city){
            this.city = city;
            // 调用方法
            this.searchWeather();
        }
    }
})