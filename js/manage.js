var initManager = function () {
    const baseUrl = `https://ls-frontend.minimateapps.com/api` // backend url
    // const baseUrl = `https://backend-minimate.ngrok.app` // for ngrok - local development

    if (window.heymerchStockCountJquery) {
        window.heymerchStockCountChangeCss = function (css, isAbove, useParent, key, collectionCssType) {
            heymerchStockCountJquery
                .post(`${baseUrl}/StockEngine/changecss`, {
                    key: key,
                    css: css,
                    id: heymerchStockCountData.id,
                    useParent: useParent,
                    isAbove: isAbove,
                    collectionCssType: collectionCssType
                })
                .done(function (data) {
                    console.log('Status : OK - ' + data)
                })
        }
        var heymerchStockCountIsIncrease = false
        window.heymerchStockCountIncrease = function () {
            const selector =
                heymerchStockCountData.widgetDisplay.position === 'above'
                    ? heymerchStockCountData.widgetDisplay.aboveSelector
                    : heymerchStockCountData.widgetDisplay.belowSelector
            if (heymerchStockCountJquery(selector).length > 0 || window.heymerchStockCountIsCollectionPage) {
                if (heymerchStockCountIsIncrease === false) {
                    heymerchStockCountJquery.post(`${baseUrl}/StockEngine/` + window.heymerchStockCountShopId + '/updateVisit').done(function (data) {
                        // console.log("Status : OK - " + data);
                    })
                }
                heymerchStockCountIsIncrease = true
            }
        }
    } else {
        setTimeout(() => {
            initManager()
        }, 200)
    }
}

var heymerchControlManage = function () {
    if (window.heymerchStockCountData) {
        initManager()
    } else {
        setTimeout(() => {
            heymerchControlManage()
        }, 500)
    }
}

heymerchControlManage()