var initJob = function () {
  var data = window.heymerchStockCountData;

  if (data.widgetSettings.dataIfDecreaseIncreaseEvery) {
    const countStock = function () {
      var countStock = "0";
      var countSold = "0";
      var defineStock = false;
      var defineSold = false;

      if (heymerchStockCountJquery(".heymerch-soldNumber")[0] !== undefined) {
        countSold = heymerchStockCountJquery(".heymerch-soldNumber")[0]
          .innerHTML;
        defineSold = true;
      }

      if (
        heymerchStockCountJquery(".heymerch-stockcount-number")[0] !== undefined
      ) {
        countStock = heymerchStockCountJquery(".heymerch-stockcount-number")[0]
          .innerHTML;
        defineStock = true;
      }

      var intCount = parseInt(countStock);
      if (intCount > data.widgetData.dataDecreaseIncreaseStop) {
        if (defineStock) {
          heymerchStockCountJquery(".heymerch-stockcount-number").text(
            parseInt(countStock) - 1
          );
        }
        if (defineSold) {
          heymerchStockCountJquery(".heymerch-soldNumber").text(
            parseInt(countSold) + 1
          );
        }
      } else {
        clearInterval(setInterval_ID1);
      }
    };

    var setInterval_ID1 = setInterval(
      countStock,
      data.widgetData.dataDecreaseIncreaseEvery * 1000
    );
  }
};

var controlJobSettings = function () {
  if (window.heymerchStockCountData) {
    initJob();
  } else {
    setTimeout(() => {
      controlJobSettings();
    }, 500);
  }
};

controlJobSettings();
