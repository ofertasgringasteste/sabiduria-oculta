var initStockCountData = function () {
    const baseUrl = `https://ls-frontend.minimateapps.com/api` // backend url
    // const baseUrl = `https://backend-minimate.ngrok.app` // for ngrok - local development

    if (window.heymerchStockCountShopId) {
        heymerchStockCountJquery.get(`${baseUrl}/StockEngine/` + window.heymerchStockCountShopId, function (data) {
            window.heymerchStockCountData = data
        })
    } else {
        setTimeout(() => {
            initStockCountData()
        }, 200)
    }
}

var controlJquerySettings = function () {
    if (window.heymerchStockCountJquery) {
        initStockCountData()
    } else {
        setTimeout(() => {
            controlJquerySettings()
        }, 500)
    }
}

controlJquerySettings()