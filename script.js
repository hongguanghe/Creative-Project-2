

document.getElementById("convert").addEventListener('click',function(event) {
  const fromCurrency = document.getElementById("From").value;
  const toCurrency = document.getElementById("To").value;
  const amount = document.getElementById("convertAmount").value;

  // check values are empty and set default value
  if (toCurrency === "none"){
    toCurrency = "GBP";
  }
  if (fromCurrency === "none"){
    fromCurrency = "USD";
  }
  if (amount === ""){
    amount = 1;
  }


  const url = "https://v2.api.forex/rates/latest.json?beautify=true&from=" + fromCurrency + "&to=" + toCurrency + "&key=3f42b68b-70a3-4888-bb0f-00349860d941";
  fetch (url)
    .then (function(response) {
      return response.json();
    }).then(function(json){
      var tooSmall = false;
      let targetRate = JSON.stringify(json.rates);
      if (targetRate == "{}"){
        tooSmall = true;
      }
      targetRate = targetRate.replace(targetRate.substring(0,6), "");
      targetRate = targetRate.replace("}", "");
      targetRate = targetRate.replace(":", "");
      let originalAmount = amount + " " + fromCurrency + " =";
      var targetRateNum = parseFloat(targetRate);
      let convertedAmount = targetRateNum*amount;
      let convertedResult = convertedAmount.toPrecision(6) + " " + toCurrency;
      let defaultResult = "1 " + fromCurrency + " = " + targetRateNum + " " + toCurrency;

      // get time and remove T and Z
      let lastUpdated = json.infos.timestamp;
      lastUpdated = lastUpdated.replace("T", " ");
      lastUpdated = lastUpdated.replace("Z", "");

      // send info back to page
      document.getElementById("original-amount").innerHTML = originalAmount;
      if (tooSmall){
        document.getElementById("converted-amount").innerHTML = "< 0.01 " + toCurrency;
      }
      else {
        document.getElementById("converted-amount").innerHTML = convertedResult;
      }
      document.getElementById("defaultVal").innerHTML = defaultResult;
      document.getElementById("lastUpdated").innerHTML = "Last Update: " + lastUpdated;

      targetRateNum = 0;
      const urlExchange = "http://data.fixer.io/api/latest?access_key=054952d81def3e70606c8901da7ece5c&symbols=USD,AUD,CAD,CNY,JPY&format=1";

      fetch(urlExchange)
        .then(function (responseS){
          return responseS;
        }).then(function(jsonObj){
            document.getElementById("AUD").innerHTML = 1.15;
            document.getElementById("CAD").innerHTML = 1.32;
            document.getElementById("CNY").innerHTML = 7.03;
            document.getElementById("JPY").innerHTML = 111.57;

        })
    })
});
