import Debug from 'debug';
import { HttpException } from "@nestjs/common";
const debug =  Debug('lib::');

export class Lib {
 
  constructor(
    
     
 ) {
   
 }
  public static async getDate() {

    //return new Date().toString();
    const date = new Date();
    const today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    const date1 = new Date(today);
    console.log('date1',date1);
    return date1;
  }
  public static async getDateTime() {

    //return new Date().toString();
    const date = new Date();
    const today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    const date1 = new Date(today);

    return date1;
  }
  public static async getCurrentDate() {

    //return new Date().toString();
    const date = new Date();
    const today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    //const date1 = new Date(today);
    //console.log('date1',date1);
    return today;
  }
  public static round(amount) {
    return Math.round(amount*100)/100;
  }
  public static changeDateFormat(date) {

    
    const moment = require("moment");
    date = date.replace('.','-');
    return moment(date,"DD/MM/YYYY").format("YYYY-MM-DD");
    

    /*
    date = date.replace('.','-');
    const newDate = new Date(date);
    const updatedDate = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate() + " " + newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
    */

    //return updatedDate;


  }

  public static getUTC(datetimeStr) {
    const date = new Date(datetimeStr);
    const now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                  date.getUTCDate(), date.getUTCHours(),
                  date.getUTCMinutes(), date.getUTCSeconds());
  
    console.log(new Date(now_utc));
    console.log(date.toISOString());
    //console.log("date",date.toLocaleString());
    return date.toISOString();
  }

  public static stringToDate(datetimeStr) {
    
    const moment = require("moment");
    //const sp = datetimeStr.split(" ");
    //const date=sp[0];

    //const date:Date = new Date(datetimeStr);
    const date = moment(datetimeStr);
    debug("stringtodate",date);
    return date;
  }

  public static getDatetimeDifference(startDate: Date, endDate: Date): any {
    const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());

    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    const hoursDifference = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutesDifference = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));
    const secondsDifference = Math.floor((timeDifference % (1000 * 60)) / 1000);

    //return `${daysDifference} days, ${hoursDifference} hours, ${minutesDifference} minutes, ${secondsDifference} seconds`;
    let time_diff='';

    if(daysDifference>0) {
      time_diff+=daysDifference+' day(s)';
    }else if(hoursDifference>0) {
      time_diff+=hoursDifference+' hour(s)';
    }else if(minutesDifference>0) {
      time_diff+=minutesDifference+' minute(s)';
    }else if(secondsDifference>0) {
      time_diff+=secondsDifference+' second(s)';
    }else {
      time_diff+='0 second';
    }

    return time_diff;
    
    /*
    return { 
      days: daysDifference,
      hours: hoursDifference,
      minutes: minutesDifference,
      seconds: secondsDifference
    };*/

  }

  public static isNumeric(str) {
   // if (typeof str != "string") return false // we only process strings!  
   // return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
   //        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    // return /^\d+$/.test(str);
    return !isNaN(str);
  }
  public static remvoveLine(str) {
     return str.replace(/(\r\n|\n|\r)/gm, "");
   }
  
   public static convertNumber(str) {
    if(str=='' || str == 'undefined') {
      return 0;
    }
    let no = isNaN(parseFloat(str)) ? 0 :   parseFloat(str);
    return no;
  }

  // Check valid date
  public static isValidDate(dateStr) {
    const moment = require("moment");
    dateStr = dateStr.replace('.','-');
    dateStr = dateStr.replace('/','-');
    return moment(dateStr,"YYYY-MM-DD").isValid(); 
  }

  public static getCurrentTime() {
    var moment = require('moment');
    return moment().format('Y-M-D H:m:s');
  }

  public static changeDayToMonthFormat(date) {

    const moment = require("moment");
    date = date.replace('.','-');
    return moment(date,"DD/MM/YYYY").format("MM/DD/YYYY");
  

  }
  public static isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }
  
  public static getCurrentDateTime() {
    return new Date(Lib.getUTC(new Date()));
  }

  public static generateNumber(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}