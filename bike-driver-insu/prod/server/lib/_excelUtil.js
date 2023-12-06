const xlsx = require( "xlsx" );
const _util = require("./_util");



module.exports = {
    /**
     *
     *
     * 프로미 정산파이
     *
     */

    CALC_DATA: function(FILENAME, PATH, DATA, res){





        return new Promise(function (resolve, reject) {

            var fileCompletePath = "";


            if (DATA == null) {
                fileCompletePath = "파일 없음";
                return fileCompletePath;
            }

            // console.log(DATA[1]);
            // console.log(DATA[0]);

            const book = xlsx.utils.book_new();

            var info = [];
            var d1 = DATA[1];
            var d2 = DATA[0];
            console.log('===========', Array.isArray(d1));
            d1 = Array.from(d1);

            info.push(
                ["NO","운행 기사수","운행 건수","총 운행시간(초단위)","보험료","영업일"]
            );
            d1.forEach(function(element, index){
                let oneRow = [];
                let no = element[Object.keys(element)[0]];
                let driverCnt = element[Object.keys(element)[1]];
                let drivingCnt = element[Object.keys(element)[2]];
                let drivingTime = element[Object.keys(element)[3]];
                let fee = element[Object.keys(element)[4]];
                let businessDay = element[Object.keys(element)[5]];
                oneRow.push(no);
                oneRow.push(driverCnt);
                oneRow.push(drivingCnt);
                oneRow.push(drivingTime);
                oneRow.push(fee);
                oneRow.push(businessDay);
                info.push(oneRow);
            });

            const baseInfo = xlsx.utils.aoa_to_sheet(info);

            baseInfo["!cols"] = [
                { wpx : 30 }   // A열
                , { wpx : 100 }   // B열
                , { wpx : 100 }    // C열
                , { wch : 30 }    // D열
                , { wch : 30 }    // D열
                , { wch : 30 }    // D열

            ]

            // / @breif 첫번째 시트에 작성한 데이터를 넣는다.

            xlsx.utils.book_append_sheet( book, baseInfo, "개요" );




            var newArray = _util.groupArray(d2, function(item) {
                return [item.businessDay];
            });
            console.log(newArray.length);
            newArray.forEach(function(element, index){
                console.log(element.length);

                var info2 = [];
                info2.push(
                    ["NO","운행 ID","기사 아이디","보험 기사아이디","이름","시작시간","종료시간","분단위 운행시간","담보","전챙 운행횟수","총 보험료","영업일"]
                );
                element.forEach(function(e){



                    let oneRow = [];
                    let no1 = e[Object.keys(e)[0]];
                    let no2 = e[Object.keys(e)[1]];
                    let no3 = e[Object.keys(e)[2]];
                    let no4 = e[Object.keys(e)[3]];
                    let no5 = e[Object.keys(e)[4]];
                    let no6 = e[Object.keys(e)[5]];
                    let no7 = e[Object.keys(e)[6]];
                    let no8 = e[Object.keys(e)[7]];
                    let no9 = e[Object.keys(e)[8]];
                    let no10 = e[Object.keys(e)[9]];
                    let no11 = e[Object.keys(e)[10]];
                    let no12 = e[Object.keys(e)[11]];

                    oneRow.push(no1);
                    oneRow.push(no2);
                    oneRow.push(no3);
                    oneRow.push(no4);
                    oneRow.push(no5);
                    oneRow.push(no6);
                    oneRow.push(no7);
                    oneRow.push(no8);
                    oneRow.push(no9);
                    oneRow.push(no10);
                    oneRow.push(no11);
                    oneRow.push(no12);


                    info2.push(oneRow);



                })
                const dailyInfo = xlsx.utils.aoa_to_sheet(info2);
                dailyInfo["!cols"] = [
                    { wpx : 30 }   // A열
                    , { wpx : 100 }   // B열
                    , { wpx : 100 }    // C열
                    , { wch : 30 }    // D열
                    , { wch : 30 }    // D열
                    , { wch : 30 }    // D열
                    , { wch : 30 }    // D열
                    , { wch : 30 }    // D열
                    , { wch : 30 }    // D열
                    , { wch : 30 }    // D열
                    , { wch : 30 }    // D열
                    , { wch : 30 }    // D열

                ]
                xlsx.utils.book_append_sheet( book, dailyInfo, element[0].businessDay );
            });




            // COMPLETE
            // console.log(PATH);
            xlsx.writeFile( book, PATH );
            fileCompletePath = PATH;

            resolve(fileCompletePath);
        });

    },


}


