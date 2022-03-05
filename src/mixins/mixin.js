export const datetimes = {
    data() {
        return {
            todaydate: "",
            sevendate: "",
            yeardate: "",
            oldsevendate: ""
        }
    },
    created() {
        var data = new Date();
        var month =
            data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
        var date = data.getDate() <= 9 ? "0" + data.getDate() : data.getDate();
        var sdate =
            data.getDate() <= 1 ? "0" + (data.getDate() + 8) : data.getDate() + 8;
        // 今天日期
        this.todaydate = data.getFullYear() + "-" + month + "-" + date;
        // 未来七天的日期
        this.sevendate = data.getFullYear() + "-" + month + "-" + sdate;
        // 今年的年份
        this.yeardate = data.getFullYear();
        // 前七天
        let time = data.getTime() - 7 * 24 * 60 * 60 * 1000
        let tragetTime = new Date(time)
        this.oldsevendate = tragetTime.getFullYear() +'-' + (tragetTime.getMonth() > 9?tragetTime.getMonth() + 1 :'0'+ (tragetTime.getMonth() + 1)) +'-' + (tragetTime.getDate() > 9 ? tragetTime.getDate() : '0' + tragetTime.getDate())
        
    },
    methods: {}
}