import axios from "axios"

const API = process.env.API

// let login = (userInfo) => axios.post(`${API}/users/login/`, userInfo)

function func2(param) {
  
  return {
    good_id: '12987122',
    name: '王小虎',
    barcode: param,
    price: 10
  }
}


// 获取商品
let get_goods_for_barcode = (barcode) => func2(barcode)


export {
  get_goods_for_barcode,
  // func1,
  // get_goods_for_barcode,
}