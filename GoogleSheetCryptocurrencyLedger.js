function updateCell() {
    var log_url = 'https://docs.google.com/spreadsheets/d/................./edit?usp=sharing'; 
    var spreadsheet = SpreadsheetApp.openByUrl(log_url);
    var ss = spreadsheet.getSheetByName('table1');
  
  
    for (i=0; i<3; i++){
      var LastRow = ss.getLastRow();
  
      var coins=[];
  
      for ( i=0 ; i< LastRow;i++){
        var coin = ss.getRange(parseInt(i)+2,1).getValue()
        console.log(coin);
        if (coin !=''){
          coins.push(coin);
        }
      }
      console.log(coins);
  
      try {
        var url  ='https://api.coingecko.com/api/v3/simple/price?ids='+coins+'&vs_currencies=usd';
        console.log(url);
        var jsondata = UrlFetchApp.fetch(url);
        var object   = JSON.parse(jsondata.getContentText());
        console.log(object.hasOwnProperty("fuck"));
  
        for ( i=0 ; i+1< LastRow;i++){
          var coin = ss.getRange(parseInt(i)+2,1).getValue()
          console.log(coin);
          if (coin !='' && object.hasOwnProperty(coin) ){
            console.log(object[coin]["usd"]);
            var oldprice = ss.getRange(parseInt(i)+2,2).getValue()
            ss.getRange( parseInt(i)+2,3).setValue(oldprice);
            var lastprice = object[coin]["usd"]
            ss.getRange( parseInt(i)+2,2).setValue(object[coin]["usd"]);
            if (lastprice > oldprice){
              ss.getRange( parseInt(i)+2,2).setFontColor("green");
            }else if (lastprice < oldprice){
              ss.getRange( parseInt(i)+2,2).setFontColor("red");
            }else{
              ss.getRange( parseInt(i)+2,2).setFontColor("black");
            }
          }else{
            console.log("查無此幣種");
            ss.getRange( parseInt(i)+2,2).setValue("查無此幣種");
          }
        }
      } catch (e) {
        console.log("重新嘗試連線");
      }
      SpreadsheetApp.flush();
      Utilities.sleep(20000);
    } 
  }
  