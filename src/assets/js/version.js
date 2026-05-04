/*
 * @Description: 接口的版本号及相关公用设置
 * @Author: gao shuai
 * @Date: 2020-02-25 15:38:30
 * @LastEditTime: 2020-09-29 08:52:39
 * @LastEditors: gao shuai
 */

export const version = 1; // 接口的版本

// export const url = process.env.NODE_ENV !== 'production' ? 'http://localhost:5003/' : 'https://newapi.7xpay.com/'; // 商户API地址
// export const netUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5002' : 'https://7xpay.7xpay.com'; // 后台API地址
// export const loginUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5004' : 'https://new.7xpay.com'; // 后台地址
// export const authUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : 'https://auth.7xpay.com'; // 鉴权地址

// const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
// export const url = process.env.NODE_ENV !== 'production' ? 'http://localhost:5003/' : `${protocol}//newapi.7xpay.com/`; // 商户API地址
// export const netUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5002' : `${protocol}//7xpay.7xpay.com`; // 后台API地址
// export const loginUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5004' : `${protocol}//new.7xpay.com`; // 商户地址
// export const authUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : `${protocol}//auth.7xpay.com`; // 鉴权地址

const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
export const url = process.env.NODE_ENV !== 'production' ? 'http://localhost:5003/' : `${protocol}//api.5cz.com/`; // 商户API地址
export const netUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5002' : `${protocol}//8.136.39.37:5002`; // 后台API地址
export const loginUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5004' : `${protocol}//5cz.com`; // 商户地址
export const authUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : `${protocol}//xy.5cz.com`; // 鉴权地址
// const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
// export const url = process.env.NODE_ENV !== 'production' ? 'http://localhost:5003/' : `${protocol}//tenantserver.cpolar.top`; // 商户API地址
// export const netUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5002' : `${protocol}//manageserver.cpolar.top`; // 后台API地址
// export const loginUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5004' : `${protocol}//tenantweb.cpolar.top`; // 后台地址
// export const authUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : `${protocol}//auth.cpolar.top`; // 鉴权地址
