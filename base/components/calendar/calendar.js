Component({
    properties: {

    },
    data: {
        week: [
            "日",
            "一",
            "二",
            "三",
            "四",
            "五",
            "六",
        ],
        days: [],
        year: "",
        month: ""
    },
    methods: {
        init(timeStr) {
            const date = timeStr ? new Date(timeStr) : new Date() //根据  传入的时间 或者 当前时间  实例化日期对象
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            const thisMonthDays = new Date(year, month, 0).getDate() //当前月有多少天
            const lastMonthDays = new Date(year, month - 1 || 12, 0).getDate() //上一个月有多少天
            const monthStartDay = new Date(`${year}/${month}/01`).getDay() //当前月1号星期几
            const monthEndDay = new Date(`${year}/${month}/${thisMonthDays}`).getDay() //当前月最后一天星期几

            // 开始构造日期数组
            let daysArr = new Array()

            //先添加当前月的日期对象
            for (let i = 0; i < thisMonthDays; i++) {
                daysArr.push({
                    day: i + 1
                })
            }

            //再添加上个月的日期
            for (let i = 0; i < monthStartDay; i++) {
                daysArr.unshift({
                    day: lastMonthDays - i,
                    type: "lastMonth"
                })
            }

            //再添加下个月的日期
            for (let i = 0; i < 6 - monthEndDay; i++) {
                daysArr.push({
                    day: i + 1,
                    type: "nextMonth"
                })

            }
            this.setData({
                year,
                month: month > 9 ? month : "0" + String(month),
                days: daysArr
            })
        },
        //上一个月
        lastMonthFn() {
            let { year, month } = this.data
            year = month == '01' ? year - 1 : year
            month = month == "01" ? 12 : parseInt(month) - 1 > 9 ? parseInt(month) - 1 : `0${parseInt(month) - 1}`
            this.init(`${year}-${month}`)
        },
        //下一个月
        nextMonthFn() {
            let { year, month } = this.data
            year = month == '12' ? year + 1 : year
            month = month == "12" ? '01' : parseInt(month) + 1 > 9 ? parseInt(month) + 1 : `0${parseInt(month) + 1}`
            this.init(`${year}-${month}`)

        }
    },
    lifetimes: {
        attached: function() {
            this.init()
        },
        detached: function() {

        },
    },
});