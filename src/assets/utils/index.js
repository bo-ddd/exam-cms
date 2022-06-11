import { JSEncrypt } from "jsencrypt";

export const encrypt = function (val) {
    var encryptor = new JSEncrypt(); // 创建加密对象实例
    let publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnZIdkAWLgkux1eMT1mSwyOb7V
uTtfDYMepItVxy6IhZNT1mSLZ0Ab4b2FvJ7JQmkDEG38l9JcFYY9f61tNPaEZWfl
FwoIC+vbjhQq8mvv6dYN1uWTpEeQ4L1JEj8Zm/kKLM2prOi5qnN5A1rVgQ5HmB5l
/9AAyN2x4vdqegRNFQIDAQAB
-----END PUBLIC KEY-----`;
    encryptor.setPublicKey(publicKey); //设置公钥
    return encryptor.encrypt(val); // 对内容进行加密
};

export const formatDate = (time) => {
    let d = new Date(time);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let date = d.getDate();
    date = date > 9 ? date : "0" + date;
    let hours = d.getHours();
    hours = hours > 9 ? hours : "0" + hours;
    let day = ["七", "一", "二", "三", "四", "五", "六"][d.getDay()];
    let minutes = d.getMinutes();
    minutes = minutes > 9 ? minutes : "0" + minutes;
    let seconds = d.getSeconds();
    seconds = seconds > 9 ? seconds : "0" + seconds;
    return (year + "年" + month + "月" + date + "日" + "  星期" + day + "  " + hours + ":" + minutes + ":" + seconds)
}

export const count = function(a,b){
    return a + b;
}

