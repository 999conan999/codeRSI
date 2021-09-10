const Binance = require('node-binance-api');
const binance = new Binance().options({});
var RSI = require('technicalindicators').RSI;
////////////////////////////////
const so_ngay_xet_duyet=30;
const cham_muc_nay_thi_thong_bao=35;
////////////////////////////////
main(so_ngay_xet_duyet,cham_muc_nay_thi_thong_bao);
async function main(so_ngay_xet_duyet,cham_muc_nay_thi_thong_bao){
  // let list_symbol=await get_symbol('USDT');
  let list_symbol=[
    "SOLUSDT",
    "BTCUSDT",
    "ETHUSDT",
    "BUSDUSDT",
    "XRPUSDT",
    "ADAUSDT",
    "FTMUSDT",
    "FTTUSDT",
    "ALGOUSDT",
    "DOTUSDT",
    "BNBUSDT",
    "SRMUSDT",
    "FILUSDT",
    "DYDXUSDT",
    "AVAXUSDT",
    "ATOMUSDT",
    "NEARUSDT",
    "IOSTUSDT",
    "ONEUSDT",
    "LINKUSDT",
    "MATICUSDT",
    "XTZUSDT",
    "LUNAUSDT",
    "DOGEUSDT",
    "C98USDT",
    "SHIBUSDT",
    "RAYUSDT",
    "THETAUSDT",
    "ICPUSDT",
    "VETUSDT",
    "EOSUSDT",
    "LTCUSDT",
    "EGLDUSDT",
    "ARUSDT",
    "CELOUSDT",
    "MINAUSDT",
    "AXSUSDT",
    "SXPUSDT",
    "WAVESUSDT",
    "OMGUSDT",
    "TRXUSDT",
    "ETCUSDT",
    "PONDUSDT",
    "ICXUSDT"
  ];
  get_data_socket(list_symbol,so_ngay_xet_duyet,cham_muc_nay_thi_thong_bao);
}
// khoi tao socket lay data
//
async function get_data_socket(list_symbol,days_before,trigger){

  let list_check=[];
  list_symbol.forEach(e => {
    list_check[e]=false;
  });
  console.log("Các mã dưới đây xắp có dấu hiệu pump, cần lưu ý :")

  //
  binance.websockets.chart(list_symbol, "1d", (symbol, interval, chart) => {

    if(!list_check[symbol]){
      // console.info(symbol);
      // console.info(chart);

      let array_data=[]
      Object.keys(chart).forEach(function(key) {
        array_data.push(chart[key].close);
      })
      array_data.pop();
      ///
      let rsi=RSI.calculate({values:array_data,period : 14});
      // console.log(rsi)
      //
      for(let i=rsi.length-days_before;i<=rsi.length-1;i++){
        // xu ly neu RSI nho hon triger, thi hien thong bao
        if(rsi[i]<=trigger) console.log(symbol);
      }
      //
      list_check[symbol]=true;
    }

  },150);

}

// get_symbol('USDT')
// lay thong tin tat ca cac cap tien trade dua tren ten, dau vao la ten VD "USDT" ==> get_symbol('USDT')
async function get_symbol(basic_name){
  let ticker =await binance.prices();
  let list_symbol=[];
  Object.keys(ticker).forEach(function(key) {
    if(key.indexOf(basic_name)>0){
      list_symbol.push(key)
    }
  });
  // console.log(list_symbol)
  return list_symbol;
}