
import jsonp from 'common/jsonp'
import {norm, option} from './config'


//电影列表
export function getMovieListMsg(){
    let url = 'https://acs.m.taopiaopiao.com/h5/mtop.film.mtopshowapi.getshowsbycitycode/4.0/'
    let param = {
        "api": "mtop.film.MtopShowAPI.getShowsByCityCode",
        "v": 4.0,
        "expire_time": 180000,
        data:{"field":"i:id;poster;showName;showMark;remark;highlight;director;leadingRole;previewNum;openDay;openTime;wantCount;fantastic;specialSchedules(i:id;tag;title;description)-1;derivationList(i:id;label;title;links;advertiseType);activities(i:id;activityTag;activityExtType;activityTitle;longDescription);showNameEn;type;duration;country;openCountry;friendCount;friends;starMeeting;preScheduleDates;soldType","citycode":"110100","ecode":0,"platform":"8"}
    }
    
    var params = Object.assign({}, norm, param)
    
    jsonp(url, params, option)
}