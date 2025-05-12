
/**
 * 작성자 : 유종태
 * 작성일 :2021.07.16
 * 내용 :
 * 파일처리관련 유틸
 * **/


module.exports = {
    /**
     *
     *
     * 시간 문자열 가져오기
     * 갭은 날짜 갭
     * _dateUtil.GET_DATE("YYYYMMDDHHMMSS", "NONE",0);
     * _dateUtil.GET_DATE("SEMI", "NONE",0);
     * _dateUtil.GET_DATE("YYMMDD", "NONE",0);
     * _dateUtil.GET_DATE("HHMMSS", "NONE",0);
     *
     * _dateUtil.GET_DATE("YYYYMMDDHHMMSS", "YEAR",1);
     * _dateUtil.GET_DATE("YYYYMMDDHHMMSS", "YEAR",-1);
     *
     */
    GET_DATE: function(FORMAT,TYPE, GAB){
        var RETURNVAL = "";
        let DAT = new Date();
        //safari & IE 예외처리
        if(!DAT.getFullYear()){
            var date = date.replace(/([+\-]\d\d)(\d\d)$/, "$1:$2");
            DAT = new Date(date);
        }

        switch (TYPE) {
            case "YEAR": DAT.setFullYear(DAT.getFullYear()+GAB); break;
            case "MONTH": DAT.setMonth(DAT.getMonth()+GAB); break;
            case "DAY":  DAT.setDate(DAT.getDate()+GAB); break;
            case "HOUR": DAT.setHours(DAT.getHours()+GAB); break;
            case "MIN": DAT.setMinutes(DAT.getMinutes()+GAB); break;
            case "SEC": DAT.setSeconds(DAT.getSeconds()+GAB); break;
            case "NONE":  break;
        }


        let year = DAT.getFullYear();
        let month = this.zero_plus(DAT.getMonth() + 1);
        let day = this.zero_plus(DAT.getDate());
        let hours = this.zero_plus(DAT.getHours());
        let minutes = this.zero_plus(DAT.getMinutes());
        let seconds = this.zero_plus(DAT.getSeconds());

        switch (FORMAT) {
            case "YYYYMMDDHHMMSS": RETURNVAL = String(year) + String(month)  + String(day) +  String(hours)+ String(minutes) + String(seconds); break;
            case "SEMI": RETURNVAL = String(year) + "-" +String(month)  + "-" +String(day) +  " " + String(hours)+ ":" + String(minutes) + ":" +String(seconds); break;
            case "YYMMDD":  RETURNVAL = String(year) + String(month)  + String(day); break;
            case "HHMMSS":RETURNVAL = String(hours) + String(minutes)  + String(seconds); break;
            case "YY":RETURNVAL = String(year); break;
            case "MM":RETURNVAL = String(month); break;
            case "DD":RETURNVAL = String(day); break;
            case "DC":RETURNVAL = String(year) + "-" +String(month)  + "-" +String(day) + "T" + String(hours)+ ":" + String(minutes) + ":" +String(seconds) + "+0900";
            case "YYYYMMDD" : RETURNVAL = String(year) + "-" + String(month) + "-"  + String(day); break;
        }


        return RETURNVAL;

    },
    zero_plus: function(str){
        var result;
        if(str.toString().length==1)
        {
            result = "0"+str;
        }
        else {
            result = str;
        }
        return result;

    },

    zero_pad(num){
        return num < 10 ? "0" + num : String(num);
    },

    /**
     * 기준 시간에서 TYPE 단위로 GAB만큼 이동 후 ISO 8601 문자열로 반환
     * @param {string} baseTime - 기준 시간 (예: "2025-05-06T00:00:00+09:00")
     * @param {string} type - 조정 단위 ("YEAR", "MONTH", "DAY", "HOUR", "MIN", "SEC")
     * @param {number} gab - 증감 수치 (정수)
     * @returns {string} ISO 형식 문자열 (예: "2025-05-06T23:00:00+09:00")
     */
    GET_DATE_BY_BASE(baseTime, type, gab){
        const date = new Date(baseTime);

        switch (type) {
            case "YEAR":  date.setFullYear(date.getFullYear() + gab); break;
            case "MONTH": date.setMonth(date.getMonth() + gab); break;
            case "DAY":   date.setDate(date.getDate() + gab); break;
            case "HOUR":  date.setHours(date.getHours() + gab); break;
            case "MIN":   date.setMinutes(date.getMinutes() + gab); break;
            case "SEC":   date.setSeconds(date.getSeconds() + gab); break;
            case "NONE":  break;
            default: throw new Error("Invalid TYPE");
        }

        const year = date.getFullYear();
        const month = this.zero_pad(date.getMonth() + 1);
        const day = this.zero_pad(date.getDate());
        const hour = this.zero_pad(date.getHours());
        const min = this.zero_pad(date.getMinutes());
        const sec = this.zero_pad(date.getSeconds());

        // 한국 표준시 (KST) 고정 반환
        return `${year}-${month}-${day}T${hour}:${min}:${sec}+09:00`;
    }

}




;
