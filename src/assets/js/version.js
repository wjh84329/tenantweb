/*
 * @Description: 接口的版本号及相关公用设置
 * @Author: gao shuai
 * @Date: 2020-02-25 15:38:30
 * @LastEditTime: 2020-09-29 08:52:39
 * @LastEditors: gao shuai
 */

export const version = 1; // 接口的版本

// 七星配置（七星分支启用）

const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
export const url = isLocal ? 'http://localhost:5003/' : `${protocol}//newapi.7xpay.com/`; // 商户API地址
export const netUrl = isLocal ? 'http://localhost:5002' : `${protocol}//7xpay.7xpay.com`; // 后台API地址
export const loginUrl = isLocal ? 'http://localhost:5004' : `${protocol}//new.7xpay.com`; // 后台地址
export const authUrl = isLocal ? 'http://localhost:5000' : `${protocol}//auth.7xpay.com`; // 鉴权地址

// 好充值配置（好充值分支启用时使用）
// export const url = isLocal ? 'http://localhost:5003/' : `${protocol}//api.haocz.com/`; // 商户API地址
// export const netUrl = isLocal ? 'http://localhost:5002' : `${protocol}//ht.haocz.com`; // 后台API地址
// export const loginUrl = isLocal ? 'http://localhost:5004' : `${protocol}//www.haocz.com`; // 商户地址
// export const authUrl = isLocal ? 'http://localhost:5000' : `${protocol}//auth.haocz.com`; // 鉴权地址


// const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
// export const url = process.env.NODE_ENV !== 'production' ? 'http://localhost:5003/' : `${protocol}//api.5cz.com/`; // 商户API地址
// export const netUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5002' : `${protocol}//8.136.39.37:5002`; // 后台API地址
// export const loginUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5004' : `${protocol}//5cz.com`; // 商户地址
// export const authUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : `${protocol}//xy.5cz.com`; // 鉴权地址
// const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
// export const url = process.env.NODE_ENV !== 'production' ? 'http://localhost:5003/' : `${protocol}//114.55.210.46:5003`; // 商户API地址
// export const netUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5002' : `${protocol}//114.55.210.46:5002`; // 后台API地址
// export const loginUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5004' : `${protocol}//114.55.210.46:5004`; // 后台地址
// export const authUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : `${protocol}//114.55.210.46:5000`; // 鉴权地址
