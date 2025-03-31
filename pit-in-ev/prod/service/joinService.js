require('dotenv').config({ path: '../.env' });
const mysql_util = require('../server/lib/sql_util');
const _util = require('../server/lib/_util');
const token = require('../server/lib/makeToken');
const crypto = require('crypto');
const { addTextAndImageToPDF } = require('../server/lib/pdf');
const dayjs = require('dayjs');


module.exports = {
    saveJoin: async function (param, cmpk) {
        try {
            let joinResult = await this.joinPitin(param, cmpk);
            if(joinResult.code === '200'){
                let savedFileResult = await this.joinFiles(param, joinResult);
            }
            return joinResult;
        } catch (error) {

            throw error;

        }


    },

    saveFiles: async function (param) {
        try {
            let signResult = await this.signFiles(param);
            if(signResult[0].s3Key){
                let apiKey =  param.get('X-API-SECRET');
                let savedFileResult = await this.regiFiles(signResult[0], apiKey);
                return savedFileResult;
            }else {
                return {code : '400', msg: '서비스 오류입니다.'};
            }
        } catch (error) {

            throw error;

        }


    },

    joinPitin: async function (param, cmpk) {
        var apiKey =  param.get('X-API-SECRET');
        let keyInfo = _util.encInfo(apiKey);
        let encKey = keyInfo.enckey;
        let ivKey = keyInfo.iv;
        let bpk = _util.platformBpkCheck(apiKey);
        let req_data = param.body;
        let requesterName = req_data.cName;
        let requesterCnsl = _util.getTimeyymmddhhmmss('day');
        if(param.body.date){
            requesterCnsl = param.body.date+' '+param.body.time;
        }
        let requesterCmpk = req_data.cmpk;

        if(requesterCmpk){
            let temp = req_data.cmpk.replaceAll(' ', '+');
            requesterCmpk = _util.promiDecModule(encKey, ivKey, temp);
        }else {
            requesterCmpk = 'no';
        }

        requesterName = _util.emptySpace(requesterName); // 공백제거
        requesterName = _util.specialCharEx(requesterName); // 특수문자제거

        let requesterCell = req_data.cCell;
        requesterCell = requesterCell.replaceAll('-','');
        let requesterJumin = req_data.cJumin;


        // CI값 생성
        let created = _util.getTimeyymmddhhmmss('no'); // yyyymmddhhmmss
        let requestTime = created;
        let requesterCi = cryptoSha512(requesterJumin+created);

        let requesterBusinessType = req_data.businessType;
        let requesterCarUse = req_data.carUse;
        let requesterCarType = req_data.carType;
        let requesterCarNum = req_data.carNum;
        let requestDay = _util.getTimeyymmddhhmmss('day');
        let collectionYN = 'Y';
        let provisionYN = 'Y';
        let inquiryYN = 'Y';
        let sharingYN = 'Y';
        let marketingYN = req_data.marketingYn;
        let obuYn = 'N';
        // 결제 정보
        let requesterPayType = req_data.payType;
        let requesterBank = '';
        let requesterAccount = '';
        let requesterCardNum = '';
        let requesterPayExpir = '';
        let requesterPayDt = req_data.payDate;

        if(requesterPayType === '01'){
            requesterBank = req_data.payExpir;
            requesterAccount = req_data.payNum;
        }

        if(requesterPayType === '02'){
            requesterCardNum = req_data.payNum;
            requesterPayExpir = req_data.payExpir;
        }




        // 마케팅 동의는 필수 값은 아님. 들어오지 않았거나 Y 가 아니라면 N으로 처리하게 해야함
        if(marketingYN=== "" || marketingYN===undefined || marketingYN !== 'Y') {
            marketingYN = 'N';
        }





        let job = 'S';
        // 받는 준비는 DB설계되어 확정되면~
        var joinQuery = "CALL pitinJoin(" +
            "'" + job + "'," +
            "'" + bpk + "'," +
            "'" + 1 + "'," +        // 아직 보험사가 정해지지 않았으니~
            "'" + requesterCmpk + "'," +
            "'" + requesterName + "'," +
            "'" + requesterCell + "'," +
            "'" + requesterJumin + "'," +
            "'" + requesterCarNum + "'," +
            "'" + requesterCarType + "'," +
            "'" + requesterCarUse + "'," +
            "'" + obuYn + "'," +
            "'" + requesterPayType + "'," +
            "'" + requesterBank + "'," +
            "'" + requesterCnsl + "'," +
            "'" + requesterAccount + "'," +
            "'" + requesterCardNum + "'," +
            "'" + requesterPayExpir + "'," +
            "'" + requesterPayDt + "'," +
            "'" + requesterCi + "'," +
            "'" + requesterBusinessType + "'," +
            "'" + collectionYN + "'," +
            "'" + provisionYN + "'," +
            "'" + inquiryYN + "'," +
            "'" + sharingYN + "'," +
            "'" + marketingYN + "'," +
            "'" + requestDay + "'" +
            ");";
        console.log("joinQuery : ", joinQuery);

        try {
            let res = await mysql_util.mysql_proc_exec(joinQuery, apiKey);
            console.log('res ::: ', res);
            let d = res[0][0];
            return d;
        } catch (error) {
            console.log('joinPitIn ERROR : ', error)

            throw error;
        }

    },


    reservPitin: async function (param) {
        var apiKey =  param.get('X-API-SECRET');
        let bpk = _util.platformBpkCheck(apiKey);
        console.log('param ::: ', param.body);
        let req_data = param.body;
        let requesterName = req_data.cName;
        requesterName = _util.emptySpace(requesterName); // 공백제거
        requesterName = _util.specialCharEx(requesterName); // 특수문자제거

        let requesterCell = req_data.cCell;
        requesterCell = requesterCell.replaceAll('-','');

        let requesterJumin = '';


        // CI값 생성
        let created = _util.getTimeyymmddhhmmss('no'); // yyyymmddhhmmss
        let requestTime = created;
        let requesterCi = cryptoSha512(requesterJumin+created);

        let requesterBusinessType = '';
        let requesterCarUse = '';
        let requesterCarType = '';
        let requesterCarNum = '';
        let requestDay = _util.getTimeyymmddhhmmss('day');
        let collectionYN = 'Y';
        let provisionYN = 'Y';
        let inquiryYN = 'Y';
        let sharingYN = 'Y';
        let marketingYN = req_data.marketingYn;
        let requesterCnsl = '';
        if(req_data.time === '' || req_data.time === undefined){
            requesterCnsl = req_data.appointDT1st;
        }else {
            requesterCnsl = req_data.date+' '+req_data.time;
        }
        let requesterCmpk = '';
        // 결제 정보
        let requesterPayType = '';
        let requesterBank = '';
        let requesterAccount = '';
        let requesterCardNum = '';
        let requesterPayExpir = '';
        let requesterPayDt = '';

        // 마케팅 동의는 필수 값은 아님. 들어오지 않았거나 Y 가 아니라면 N으로 처리하게 해야함
        if(marketingYN=== "" || marketingYN===undefined || marketingYN !== 'Y') {
            marketingYN = 'N';
        }


        /* 확인용 */
        console.log('requesterName is : ', requesterName);
        console.log('requesterCell is : ', requesterCell);
        console.log('requesterJumin is : ', requesterJumin);
        console.log('requesterCi is : ', requesterCi);
        console.log('collectionYN is : ', collectionYN);
        console.log('provisionYN is : ', provisionYN);
        console.log('inquiryYN is : ', inquiryYN);
        console.log('marketingYN is : ', marketingYN);
        console.log('sharingYN is : ', sharingYN);
        //console.log('rightsYN is : ', rightsYN);


        let job = 'RES';
        // 받는 준비는 DB설계되어 확정되면~
        var joinQuery = "CALL pitinJoin(" +
            "'" + job + "'," +
            "'" + bpk + "'," +
            "'" + 1 + "'," +        // 아직 보험사가 정해지지 않았으니~
            "'" + requesterCmpk + "'," +
            "'" + requesterName + "'," +
            "'" + requesterCell + "'," +
            "'" + requesterJumin + "'," +
            "'" + requesterCarNum + "'," +
            "'" + requesterCarType + "'," +
            "'" + requesterCarUse + "'," +
            "'" + '' + "'," +
            "'" + requesterPayType + "'," +
            "'" + requesterBank + "'," +
            "'" + requesterCnsl + "'," +
            "'" + requesterAccount + "'," +
            "'" + requesterCardNum + "'," +
            "'" + requesterPayExpir + "'," +
            "'" + requesterPayDt + "'," +
            "'" + requesterCi + "'," +
            "'" + requesterBusinessType + "'," +
            "'" + collectionYN + "'," +
            "'" + provisionYN + "'," +
            "'" + inquiryYN + "'," +
            "'" + sharingYN + "'," +
            "'" + marketingYN + "'," +
            "'" + requestDay + "'" +
            ");";
        console.log("joinQuery : ", joinQuery);

        try {
            let res = await mysql_util.mysql_proc_exec(joinQuery, apiKey);
            console.log('res ::: ', res);
            let d = res[0][0];
            return d;
        } catch (error) {
            console.log('joinPitIn ERROR : ', error)

            throw error;
        }

    },




    updatePitin: async function (apiKey, param) {
        let bpk = _util.platformBpkCheck(apiKey);
        console.log('param ::: ', param);
        let req_data = param;
        let requesterName = req_data.cName;
        requesterName = _util.emptySpace(requesterName); // 공백제거
        requesterName = _util.specialCharEx(requesterName); // 특수문자제거

        let requesterCell = req_data.cCell;
        let requesterJumin = req_data.cJumin;


        // CI값 생성
        let created = _util.getTimeyymmddhhmmss('no'); // yyyymmddhhmmss
        let requestTime = created;
        let requesterCi = cryptoSha512(requesterJumin+created);
        let reqeusterCmpk = req_data.cmpk;
        let requesterBusinessType = req_data.businessType;
        let requesterCarUse = req_data.carUse;
        let requesterCarType = req_data.carType;
        let requesterCarNum = req_data.carNum;
        let requesterStatus = req_data.saleStatus;
        let requestDay = _util.getTimeyymmddhhmmss('day');
        let collectionYN = 'Y';
        let provisionYN = 'Y';
        let inquiryYN = 'Y';
        let sharingYN = 'Y';
        let marketingYN = req_data.marketingYn;

        // 마케팅 동의는 필수 값은 아님. 들어오지 않았거나 Y 가 아니라면 N으로 처리하게 해야함
        if(marketingYN=== "" || marketingYN===undefined || marketingYN !== 'Y') {
            marketingYN = 'N';
        }


        /* 확인용 */
        console.log('requesterName is : ', requesterName);
        console.log('requesterCell is : ', requesterCell);
        console.log('requesterJumin is : ', requesterJumin);
        console.log('requesterCi is : ', requesterCi);
        console.log('collectionYN is : ', collectionYN);
        console.log('provisionYN is : ', provisionYN);
        console.log('inquiryYN is : ', inquiryYN);
        console.log('marketingYN is : ', marketingYN);
        console.log('sharingYN is : ', sharingYN);
        //console.log('rightsYN is : ', rightsYN);
        let testQuery = `UPDATE clientMaster SET `;
        let keys = Object.keys(param)
        for(let key of keys){
            switch (key) {
                case 'cName' :
                    if(requesterName !== '' ) testQuery += `cName = '${requesterName}',`;
                    break;
                case 'cCell' :
                    if(requesterCell !== '' ) testQuery += `cCell = hex(aes_encrypt('${requesterCell}','cell23456@#$%^')),`;
                    break;
                case 'birth' : if(requesterJumin !== '' || requesterJumin !== '미입력') {
                    testQuery += `birth = left('${requesterJumin}', 6),`;
                }else {
                    testQuery += `birth = ''`;
                }
                    break;
                case 'cJumin' :
                    if(requesterJumin !== '미입력' ) testQuery += `cJumin = hex(aes_encrypt('${requesterJumin}','jumin23456@#$%^')),`;
                    break;
                case 'carNum' :
                    if(requesterCarNum !== '미입력' ) testQuery += `carNum = '${requesterCarNum}',`;
                    break;
                case 'businessType' :
                    if(requesterBusinessType !== '00' ) testQuery += `businessType = '${requesterBusinessType}',`;
                    break;
                case 'carType' :
                    if(requesterCarType !== '00' ) testQuery += `carType = '${requesterCarType}', `;
                    break;
                case 'carUse' :
                    if(requesterCarUse !== '00' ) testQuery += `carUse = '${requesterCarUse}',`;
                    break;
            }
        }
        testQuery += `age = CASE
                        WHEN LEFT('${requesterJumin}', 1) = 0 THEN
                        LEFT((DATE_FORMAT(now(),'%Y%m%d') - CONCAT('20', LEFT('${requesterJumin}', 6))), 2)
                        ELSE
                        LEFT((DATE_FORMAT(now(),'%Y%m%d') - CONCAT('19', LEFT('${requesterJumin}', 6))), 2)
                        END,
                        updatedYMD = now() 
                        WHERE bpk = '6'
                           and cmpk = ${reqeusterCmpk}; 
                        UPDATE salesInsur set saleStatus = '${requesterStatus}' WHERE cmpk = ${reqeusterCmpk}`;

        console.log('testQuery is ::::', testQuery);


        try {
            let res = await mysql_util.mysql_proc_exec(testQuery, apiKey);
            console.log('res ::: ', res);
            if(res[0].affectedRows > 0){
                return {code : '200', 'msg' : '정상적으로 수정되었습니다.'};
            }else {
                return {code : '400', 'msg' : '서비스 오류입니다.'};
            }
        } catch (error) {
            console.log('joinPitIn ERROR : ', error)

            throw error;
        }

    },

    deletePitin: async function (apiKey, param) {
        let bpk = _util.platformBpkCheck(apiKey);
        console.log('param ::: ', param);
        let req_data = param;

        let joinQuery = `UPDATE clientMaster set useYNull = 'N' WHERE cmpk = ${req_data.cmpk};
                         UPDATE salesInsur set saleStatus = '23' WHERE cmpk = ${req_data.cmpk};
                        `;
        console.log("joinQuery : ", joinQuery);

        try {
            let res = await mysql_util.mysql_proc_exec(joinQuery, apiKey);
            console.log('res ::: ', res);
            if(res[0].affectedRows > 0){
                return {code : '200', 'msg' : '접수취소 되었습니다.'};
            }else {
                return {code : '400', 'msg' : '서비스 오류입니다.'};
            }
        } catch (error) {
            console.log('joinPitIn ERROR : ', error)

            throw error;
        }

    },

    memoService : async function (apiKey, param) {
        let bpk = _util.platformBpkCheck(apiKey);
        console.log('param ::: ', param);

        let cmpk = param.cmpk;
        let job = param.type;
        let contents = param.contents;
        let bopk = param.bopk;
        let group_depth = param.group_depth;


        let joinQuery = `CALL memoService('${job}','${cmpk}','${bpk}', '${contents}', ${bopk}, ${group_depth})`;

        console.log("joinQuery : ", joinQuery);

        try {
            let res = await mysql_util.mysql_proc_exec(joinQuery, apiKey);
            console.log('res ::: ', res[0]);
            if(res[0].length > 0){
                return res[0];
            }else {
                return [{status : 401}];
            }
        } catch (error) {
            console.log('MemoService ERROR : ', error)

            throw error;
        }

    },

    joinFiles: async function (param, joinResult) {
        let apiKey =  param.get('X-API-SECRET');
        let cmpk = joinResult.cmpk;
        let files = param.files;
        if(!files) return;
        let today = _util.getTimeyymmddhhmmss('day');
        try {
            if (files.length !== 0) {
                for (let i = 0; i < files.length; i++) {
                    let query = `INSERT INTO file (cmpk, originalname, mimetype, fieldname, contentType,location, s3Key, bucket, createdYMD)
                                 VALUES ('${cmpk}', '${files[i].originalname}', '${files[i].mimetype}', '${files[i].fieldname}', '${files[i].contentType}', '${files[i].location}', '${files[i].key}', '${files[i].bucket}', '${today}');`
                    console.log('joinFIles Query ::: ', query)
                    let result = await mysql_util.mysql_proc_exec(query, apiKey)
                }

            }else {
                    return;
                }
        }catch(error){
            console.log('joinPitIn ERROR : ', error)

            throw error;
        }
    },

    signFiles: async function (param) {
        let apiKey =  param.get('X-API-SECRET');
        let cmpk = param.body.cmpk;
        let files = param.files;
        let today = _util.getTimeyymmddhhmmss('day');
        try {
                    let query = `INSERT INTO file (cmpk, originalname, mimetype, fieldname, contentType,location,type, s3Key, bucket, createdYMD)
                                 VALUES ('${cmpk}', '${files[0].originalname}', '${files[0].mimetype}', '${files[0].fieldname}', '${files[0].contentType}', '${files[0].location}','sign', '${files[0].key}', '${files[0].bucket}', '${today}');
                    SELECT A.cmpk,B.filePk, A.cName,A.cPayDt, A.businessType, CAST(aes_decrypt(unhex(A.cCell),'cell23456@#$%^') as char) as cCell,B.s3Key,A.payType, A.carType, A.carNum, A.premiums   from clientMaster A, file B where A.cmpk = B.cmpk and A.cmpk = ${cmpk} order by filePk desc limit 1;`;
                    console.log('joinFIles Query ::: ', query)
                    let result = await mysql_util.mysql_proc_exec(query, apiKey);
                    console.log("joinFIles result is ::: ",result[1]);
                    if(result[0].affectedRows > 0) {

                        return result[1];
                    }else {
                        return {code : '400'}
                    }

        }catch(error){
            console.log('joinPitIn ERROR : ', error)

            throw error;
        }
    },

    regiFiles : async function (param, apiKey) {
        let today = _util.getTimeyymmddhhmmss('day');
        try {
            param.contractDate = dayjs(today).format('YYYY-MM-DD');
            param.contractYear = dayjs(today).add(1, 'day').format('YYYY-MM-DD')+'   00:00'+'~'+dayjs(today).add(366, 'day').format('YYYY-MM-DD')+'   00:00'+'(1년)';
            let saved = await addTextAndImageToPDF(param);
            console.log('saved :::' , saved)
            let query = `INSERT INTO file (cmpk, originalname, mimetype, fieldname, contentType,location,type, s3Key, bucket, createdYMD)
                                 VALUES ('${param.cmpk}', '${saved.originalname}', 'application/pdf', 'pdf', 'application/pdf', '${saved.Location}','contract', '${saved.key}', '${saved.Bucket}', '${today}');`
            console.log('regiFiles Query ::: ', query)
            let result = await mysql_util.mysql_proc_exec(query, apiKey)
            console.log('regiFiles result is ::: ', query)
            if(result.affectedRows > 0){
                return {code : '200', 'msg' : '가입이 완료 되었습니다..'};
            }else {
                return {code : '400', 'msg' : '서비스 오류입니다.'};
            }
        }catch(error){
            console.log('regiFiles ERROR : ', error)

            throw error;
        }
    },

    loginUser: async function (param) {
        let apiKey =  param.get('X-API-SECRET');
        let cCell = param.body.cCell;
        try {
                //let query = `select cmpk, cName, convert(aes_decrypt( unhex(cCell),'cell23456@#$%^') USING utf8) as cCell ,CONCAT(LEFT(cast(aes_decrypt( unhex(cJumin),'jumin23456@#$%^') as char),6),'-',SUBSTRING(cast(aes_decrypt( unhex(cJumin),'jumin23456@#$%^') as char) FROM 7 FOR 13)) as cJumin  from clientMaster where bpk = 6 and useYNull = 'Y' and aes_decrypt(unhex(cCell),'cell23456@#$%^') = '${cCell}';`
                let query = `select cmpk
                             from clientMaster
                             where bpk = 6
                               and useYNull = 'Y'
                               and convert(aes_decrypt( unhex(cCell),'cell23456@#$%^') USING utf8) = '${cCell}'`;
                console.log('joinFIles Query ::: ', query);
                let res = await mysql_util.mysql_proc_exec(query, apiKey)
                let d = res[0];
                if(d !== undefined){
                    let accessToken = token.makeAccessToken({id : d.cmpk});
                    let refreshToken = token.makeRefreshToken();

                    let query2 = `UPDATE salesInsur SET refreshToken = '${refreshToken}' where cmpk = ${d.cmpk}`;
                    let logRes = await mysql_util.mysql_proc_exec(query2, apiKey);
                    d['refreshToken'] = refreshToken;
                    d['accessToken'] = accessToken;

                    return d;
                }else {
                    return '400';
                }
                return d;
        }catch(error){
            console.log('loginUser ERROR : ', error)

            throw error;
        }
    },
    regiInfo: async function (apiKey, cmpk) {
        try {
            let query = `select cmpk,
                cName,
                convert(aes_decrypt( unhex(cCell),'cell23456@#$%^') USING utf8) as cCell
            from clientMaster
            where bpk = 6
            and useYNull = 'Y'
            and cmpk = '${cmpk}'`;

            console.log('userInfo Query ::: ', query);

            let res = await mysql_util.mysql_proc_exec(query, apiKey)
            let d = res[0];
            if(d !== undefined){
                return d;
            }else {
                return '400';
            }
        }catch(error){
            console.log('loginUser ERROR : ', error)

            throw error;
        }
    },

    existCar: async function (apiKey, carNum) {
        try {
            let query = `select cmpk,
                convert(aes_decrypt( unhex(cCell),'cell23456@#$%^') USING utf8) as cCell
            from clientMaster
            where bpk = 6
            and useYNull = 'Y'
            and carNum = '${carNum}'`;

            console.log('userInfo Query ::: ', query);

            let res = await mysql_util.mysql_proc_exec(query, apiKey)
            let d = res[0];
            if(d !== undefined){
                return d;
            }else {
                return '400';
            }
        }catch(error){
            console.log('loginUser ERROR : ', error)

            throw error;
        }
    },

    getUserInfo: async function (apiKey, cmpk) {
        try {
            let query = `select 
                                cName, 
                                birth,
                                convert(aes_decrypt( unhex(cCell),'cell23456@#$%^') USING utf8) as cCell,
                                carNum,
                                CASE businessType
                                    WHEN '01' THEN '개인'
                                    WHEN '02' THEN '법인'
                                    END AS 'bussinessType',
                                CASE carUse
                                    WHEN '01' THEN '택시'
                                    WHEN '02' THEN '화물'
                                    END AS 'carUse',
                                 CASE payType
                                     WHEN '01' THEN '계좌이체'
                                     WHEN '02' THEN '카드'
                                     END AS 'payType',
                                carType,
                                CONCAT(premiums,'원') as premiums, 
                                cpayDt, 
                                CONCAT(payPeriod, '/24') as payPeriod, 
                                NonPaymentYn,
                                fmsInfo,
                                (select location from file where cmpk = ${cmpk} order by filePk desc limit 1) as location
                            from clientMaster 
                            where cmpk = '${cmpk}';`
            console.log('userInfo Query ::: ', query);

            let res = await mysql_util.mysql_proc_exec(query, apiKey)
            let d = res[0];
            if(d !== undefined){
                return d;
            }else {
                return '400';
            }
        }catch(error){
            console.log('loginUser ERROR : ', error)

            throw error;
        }
    }
}

function cryptoSha512(password){
    return crypto.createHash('sha512').update(password).digest('base64');
    // return crypto.createHash('sha512').update(password).digest('hex').toUpperCase();

}
