window.heymerchStockCountMessage = ''
let dataStock = null
let isOldUI = null
window.heymerchStockCountClasses = {
    wrapper: 'heymerch-stockcount-wrapper-stock',
    emoji: 'heymerch-stockcount-emoji',
    text: 'heymerch-stockcount-text',
    text2: 'heymerch-stockcount-text2',
    number: 'heymerch-stockcount-number',
}

var controlStockCountDataSet = function (index = null) {    
     // Early return only if we're not supposed to show stock count on collection page
     const showOnCollection = window?.heymerchStockCountData?.widgetDisplay?.showOnCollection
     const pageType = window?.ShopifyAnalytics?.meta?.page?.pageType
     if (pageType) {
         if (pageType === 'collection' && !showOnCollection) {
             return
         }
     } else {
         // Fallback to pathname check if ShopifyAnalytics is not available e.g. Preview
         const isCollectionPage = window.location.pathname.includes('/collections/') && !window.location.pathname.includes('/products/')
         if (isCollectionPage && !showOnCollection) {
             return
         }
     }

    window.heymerchStockCountIsCollectionPage = index !== null

    // Use product ID instead of variant ID for collection pages
    if (window.heymerchStockCountIsCollectionPage) {
        window.heymerchStockCountVariantId = window.heymerchStockCountProductId
        window.heymerchStockCountNumber = window.heymerchStockCountVariantList[window.heymerchStockCountProductId]
        window.heymerchStockCountProductAvailable = heymerchStockCountVariantAvailableList[window.heymerchStockCountVariantId]
    }

    Object.keys(window.heymerchStockCountClasses).forEach((key) => {
        window.heymerchStockCountClasses[key] = window.heymerchStockCountIsCollectionPage ? (key === 'wrapper' ? `heymerch-stockcount-wrapper-stock-${index}` : `heymerch-stockcount-${key}-${index}`) : (key === 'wrapper' ? 'heymerch-stockcount-wrapper-stock' : `heymerch-stockcount-${key}`)
    })

    window.heymerchStockCountCustomClass = window.heymerchStockCountClasses.wrapper

    if (window.heymerchStockCountData) {
        dataStock = window.heymerchStockCountData
        ControlStockCountScriptActive()
    } else {
        setTimeout(() => {
            controlStockCountDataSet(index)
        }, 500)
    }
}

function ControlStockCountScriptActive() {
        if (dataStock.widgetSettings.isActive) {
        heymerchStockCountMessage += ' ControlStockScriptActive -> Yes |'
        injectCss()
        ControlStockCountDisplayRules()
    } else {
        heymerchStockCountMessage += ' ControlStockScriptActive -> No |'
    }
}

function injectCss() {
    heymerchStockCountJquery('head').append(
        '<style type="text/css"> .heymerch-stockcount-customcss{' + dataStock.widgetDisplay.customCss + '}</style>',
    )
}

var ControlStockCountDisplayRules = function () {
    const isExclude = dataStock.widgetSettings.selectedForExclude
    heymerchStockCountMessage += ' Display for -> ' + dataStock.widgetDisplay.showFor + ' with Exclude is  ' + isExclude + ' |'

    if (dataStock.widgetDisplay.showFor == 'all') {
        ControlProductAvailable()
    } else if (dataStock.widgetDisplay.showFor == 'selectedProducts') {
        const isProductIncluded = dataStock.widgetData.selectedProducts.includes(heymerchStockCountProductId)
        if (isExclude) {
            if (!isProductIncluded) {
                ControlProductAvailable()
            } else {
                heymerchStockCountMessage += ' Product found in exclude list |'
            }
        } else {
            if (isProductIncluded) {
                ControlProductAvailable()
            } else {
                heymerchStockCountMessage += ' Product not found in include list |'
            }
        }
    } else if (dataStock.widgetDisplay.showFor == 'selectedCollections') {
        let resultCollection = false

        if (isExclude) {
            resultCollection = heymerchStockCountCollectionList.every((collection) => {
                return !dataStock.widgetData.selectedCollections.includes(collection)
            })
        } else {
            heymerchStockCountCollectionList.forEach((collection) => {
                if (dataStock.widgetData.selectedCollections.includes(collection)) {
                    resultCollection = true
                }
            })
        }

        if (resultCollection) {
            ControlProductAvailable()
        } else {
            heymerchStockCountMessage += ' Product not found in collection list |'
        }
    }
}

//stock 0 condition runs under this func
function ControlProductAvailable() {
    if (window.heymerchStockCountProductAvailable) {
        heymerchStockCountMessage += ' ControlProductAvailable -> Yes |'
        window.heymerchStockCountRandomCount = getRandomInt(dataStock.widgetData.minStock, dataStock.widgetData.maxStock)
        ControlWidgetFor()
    } else {
        heymerchStockCountMessage += ' ControlProductAvailable -> No |'
        //stock0
    //     //only run this if the product page is loaded - not collections
    // what if we can run another check for heymerchStockCountVariantAvailableList if it is empty string then we do not show the stock zero text. 
    // Only do this for the collection page. Ensure that it works when sold out even if the first product is sold out in a collection page.
    //    if(window.location.pathname.includes('/products/')) { 
            if (dataStock.widgetSettings.isStockZero) {
                heymerchStockCountMessage += ' StockZero -> Yes |'
                    ShowStockZeroText()
            } else {
                heymerchStockCountMessage += ' StockZero -> No |'
                HideStockText()
                }
        // }
        heymerchStockCountMessage += ' Product not available |'
    }
}

function ControlWidgetFor() {
    if (dataStock.widgetDisplay.displayFor === 'Product') {
        heymerchStockCountMessage += ' ControlWidgetFor -> Product |'
        window.heymerchStockCountNumber = window.heymerchStockCountTotalInventory
        ControlUseRealData()
    } else {
        heymerchStockCountMessage += ' ControlWidgetFor -> Variant |'
        if (!(getParameterByName2('variant') === '' || getParameterByName2('variant') === null)) {
            heymerchStockCountVariantId = getParameterByName2('variant')
        }

        window.heymerchStockCountVariantCount = heymerchStockCountVariantList[heymerchStockCountVariantId]
        window.heymerchStockCountNumber = window.heymerchStockCountVariantCount
        window.addEventListener('locationchange', onChangeVariant)
        document.addEventListener(
            'change',
            function (event) {
                onChangeVariant()
            },
            false,
        )
        ControlUseRealData()
    }
}

function ControlUseRealData() {
    if (dataStock.widgetSettings.useRealData) {
        heymerchStockCountMessage += ' ControlUseRealData -> Yes |'
        if (window.heymerchStockCountNumber > 0) {
            heymerchStockCountMessage += ' ControlCount>0 -> Yes |'
            IsTrack()
        } else {
            //check if isSelectedShow true
            if (dataStock.widgetSettings.isStockZero) {
                let isTrack = window.heymerchStockCountVariantAvailableList[window.heymerchStockCountVariantId] !== ''
                if (isTrack) {
                    heymerchStockCountMessage += ' isStockZero YES and isTrack Yes |'
                    if (window.heymerchStockCountVariantPolicyList[window.heymerchStockCountVariantId] === 'deny') {
                        ShowStockZeroText()
                    } else {
                        //here check if IsStockMinus
                        if (dataStock.widgetSettings.isStockMinus) {
                            ShowStockMinusText()
                        } else {
                            HideStockText()
                        }
                    }
                } else {
                    heymerchStockCountMessage += ' istrack NO'
                    HideStockText()
                }
            } else {
                if (dataStock.widgetSettings.isStockMinus) {
                    heymerchStockCountMessage += ' isStockMinus Yes'
                    //istrack
                    let isTrack = window.heymerchStockCountVariantAvailableList[window.heymerchStockCountVariantId] !== ''
                    if (isTrack) {
                        //cont to cont selling check
                        if (window.heymerchStockCountVariantPolicyList[window.heymerchStockCountVariantId] === 'deny') {
                            heymerchStockCountMessage += ' Cont Selling No | No'
                            HideStockText()
                        } else {
                            heymerchStockCountMessage += ' Cont Selling YES'
                            heymerchStockCountMessage += ' Stock Minus YES | Yes'
                            ShowStockMinusText()
                        }
                    } else {
                        heymerchStockCountMessage += ' isTrack No | No'
                        HideStockText()
                    }
                } else {
                    heymerchStockCountMessage += ' isStockZero NO | No'
                    heymerchStockCountMessage += ' ControlCount>0 -> No | No'
                    heymerchStockCountMessage += '  isStockMinus NO | No'
                    HideStockText()
                }
            }
        }
    } else {
        heymerchStockCountMessage += ' ControlUseRealData -> No |'
        IsTrackGenerate()
    }
}
function IsTrack() {
    let isTrack = window.heymerchStockCountVariantAvailableList[window.heymerchStockCountVariantId] !== ''
    if (isTrack) {
        heymerchStockCountMessage += ' IsTrack -> Yes |'

        ControlShowLessThan()
    } else {
        heymerchStockCountMessage += ' IsTrack -> No |'
        HideStockText()
    }
}

function IsTrackGenerate() {
    let isTrack = window.heymerchStockCountVariantAvailableList[window.heymerchStockCountVariantId] !== ''
    if (isTrack) {
        heymerchStockCountMessage += ' IsTrackGenerate -> Yes |'

        IsCountControlGenerate()
    } else {
        heymerchStockCountMessage += ' IsTrackGenerate -> No |'
        ControlCookie()
    }
}

function IsCountControlGenerate() {
    if (window.heymerchStockCountNumber > 0) {
        heymerchStockCountMessage += ' IsCountControlGenerate > 0 -> Yes |'
        ControlCookie()
    } else {
        heymerchStockCountMessage += ' IsCountControlGenerate > 0 -> No |'
        ControlPolicy()
    }
}

function ControlPolicy() {
    if (window.heymerchStockCountVariantPolicyList[window.heymerchStockCountVariantId] === 'deny') {
        heymerchStockCountMessage += ' ControlPolicy = deny -> Yes |'
        HideStockText()
    } else {
        heymerchStockCountMessage += ' ControlPolicy = deny -> No |'
        ControlCookie()
    }
}

function ControlCookie() {
    let key = 'heymerch-count-' + window.heymerchStockCountShopId.toString() + '-' + window.heymerchStockCountProductId.toString()
    if (dataStock.widgetDisplay.displayFor !== 'Product') {
        key = key + '-' + heymerchStockCountVariantId.toString()

        window.heymerchStockCountRandomCount = getRandomInt(dataStock.widgetData.minStock, dataStock.widgetData.maxStock)
    }
    const productCookie = window.heyMerchCookieManagerGet(`heymerch-count-${window.heymerchStockCountShopId}-${window.heymerchStockCountProductId}-${window.heymerchStockCountProductId}`)
    const variantCookie = window.heyMerchCookieManagerGet(key)
    let controlCookie = productCookie || variantCookie

    if (controlCookie) {
        window.heymerchStockCountNumber = parseInt(controlCookie)
        ControlShowStockCountLastWidget()
    } else {
        window.heymerchStockCountNumber = window.heymerchStockCountRandomCount
        window.heyMerchCookieManagerSet(key, window.heymerchStockCountNumber)
        ControlShowStockCountLastWidget()
    }
}

//Different in oldUI
function ControlShowLessThan() {
    isOldUI = dataStock.isOldUI
    if (dataStock.widgetSettings.isStockLessThan) {
        heymerchStockCountMessage += ' stockIfShowAvailableLessThan -> Yes |'
        if (window.heymerchStockCountNumber < dataStock.widgetData.showLessThan) {
            heymerchStockCountMessage += ' Count < ' + dataStock.widgetData.showLessThan + ' -> Yes |'
            ControlShowStockCountLastWidget()
        } else {
            heymerchStockCountMessage += ' Count < ' + dataStock.widgetData.showLessThan + ' -> No |'
            ControlShowMoreThan()
        }
    } else {
        if (isOldUI) {
            heymerchStockCountMessage += ' stockIfShowAvailableLessThan -> No |'
            ControlShowStockCountLastWidget()
        } else {
            ControlShowMoreThan()
        }
    }
}

function ControlShowMoreThan() {
    if (dataStock.widgetSettings.isStockMoreThan) {
        heymerchStockCountMessage += ' stockIfShowAvailableMoreThan -> Yes |'
        if (window.heymerchStockCountNumber >= dataStock.widgetData.showMoreThan) {
            heymerchStockCountMessage += ' Count > ' + dataStock.widgetData.showMoreThan + ' -> Yes |'
            ShowMoreThan()
        } else {
            if (dataStock.widgetSettings.isStockLast && window.heymerchStockCountNumber == 1) {
                ShowStockCountLastWidget()
            } else {
                heymerchStockCountMessage += ' Count > ' + dataStock.widgetData.showMoreThan + ' -> No |'
                HideStockText()
            }
        }
    } else {
        heymerchStockCountMessage += ' stockIfShowAvailableMoreThan -> No |'
        if (dataStock.widgetSettings.isStockLast) {
            heymerchStockCountMessage += ' isStock1 -> selected |'
            if (window.heymerchStockCountNumber == 1) {
                heymerchStockCountMessage += ' isStock1 =1  | stock1'
                ShowStockCountLastWidget()
            } else {
                heymerchStockCountMessage += ' isStock1 !=1  | hide'
                HideStockText()
            }
        } else {
            heymerchStockCountMessage += ' isStock1 !=1  | hide'
            HideStockText()
        }
    }
}

//Different in oldUI
function ControlShowStockCountLastWidget() {
    if (isOldUI) {
        if (dataStock.widgetSettings.isStockLast) {
            heymerchStockCountMessage += ' isStock1TextActive -> Yes |'
            if (window.heymerchStockCountNumber == 1) {
                heymerchStockCountMessage += ' Count 1 = ' + heymerchStockCountNumber + ' -> Yes |'
                ShowStockCountLastWidget()
            } else {
                heymerchStockCountMessage += ' Count 1= ' + heymerchStockCountNumber + ' -> No |'
                ShowStockText()
            }
        } else {
            heymerchStockCountMessage += ' isStock1TextActive -> No |'
            ShowStockText()
        }
    } else {
        if (dataStock.widgetSettings.isStockLast) {
            heymerchStockCountMessage += ' isStock1TextActive -> Yes |'
            if (window.heymerchStockCountNumber == 1) {
                heymerchStockCountMessage += ' Count 1 = ' + heymerchStockCountNumber + ' -> Yes |'
                ShowStockCountLastWidget()
            } else {
                heymerchStockCountMessage += ' Count 1= ' + heymerchStockCountNumber + ' -> No |'
                //here we do control less than again
                if (dataStock.widgetSettings.isStockLessThan) {
                    if (window.heymerchStockCountNumber < dataStock.widgetData.showLessThan) {
                        heymerchStockCountMessage += ' this is second control Count < ' + dataStock.widgetData.showLessThan + ' -> Yes |'
                        ShowStockText()
                    }
                } else {
                    //here we need to check if isuserealdata is true
                    if (dataStock.widgetSettings.useRealData) {
                        HideStockText()
                    } else {
                        ShowStockText()
                    }
                }
            }
        } else {
            heymerchStockCountMessage += ' isStock1TextActive -> No |'
            ShowStockText()
        }
    }
}

//stockMinus
function ShowStockMinusText() {
    increaseCount()
    heymerchStockCountJquery(`.${window.heymerchStockCountCustomClass}`).empty()
    heymerchStockCountJquery(`.${window.heymerchStockCountCustomClass}`).append(
        `<span class="${window.heymerchStockCountClasses.emoji}"></span><span class="${window.heymerchStockCountClasses.text}"></span>`,
    )

    const widget = dataStock.widgets.find((a) => a.type === 'stockMinus')
    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.text}`).html(widget.text)
    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.text}`).css('color', widget.color)
    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.text}`).css('font-size', '' + widget.size + 'px')

    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.emoji}`).html(dataStock.widgetData.emojiMinus)

    heymerchStockCountJquery(`.${window.heymerchStockCountCustomClass}`).show()
}

//stock0
function ShowStockZeroText() {
    increaseCount()
    heymerchStockCountJquery(`.${window.heymerchStockCountCustomClass}`).empty()
    heymerchStockCountJquery(`.${window.heymerchStockCountCustomClass}`).append(
        `<span class="${window.heymerchStockCountClasses.emoji}"></span><span class="${window.heymerchStockCountClasses.text}"></span>`,
    )

    const widget = dataStock.widgets.find((a) => a.type === 'stock0')
    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.text}`).html(widget.text)
    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.text}`).css('color', widget.color)
    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.text}`).css('font-size', '' + widget.size + 'px')

    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.emoji}`).html(dataStock.widgetData.emojiZero)

    heymerchStockCountJquery(`.${window.heymerchStockCountCustomClass}`).show()
}

//stock1
function ShowStockCountLastWidget() {
    increaseCount()
    heymerchStockCountJquery(`.${window.heymerchStockCountCustomClass}`).empty()
    heymerchStockCountJquery(`.${window.heymerchStockCountCustomClass}`).append(
        `<span class="${window.heymerchStockCountClasses.emoji}"></span><span class="${window.heymerchStockCountClasses.text}"></span>`,
    )

    const widget = dataStock.widgets.find((a) => a.type === 'stock1')
    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.text}`).html(widget.text)
    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.text}`).css('color', widget.color)
    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.text}`).css('font-size', '' + widget.size + 'px')
    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.emoji}`).html(dataStock.widgetData.emojiOne)

    heymerchStockCountJquery(`.${window.heymerchStockCountCustomClass}`).show()
}

//orjinal
function ShowStockText() {
    increaseCount()
    heymerchStockCountJquery(`.${window.heymerchStockCountCustomClass}`).empty()
    heymerchStockCountJquery(`.${window.heymerchStockCountCustomClass}`).append(
        `<span class="${window.heymerchStockCountClasses.emoji}"></span>` +
        `<span class="${window.heymerchStockCountClasses.text2}"></span> ` +
        `<b><span class="${window.heymerchStockCountClasses.number}"></span></b> ` +
        `<span class="${window.heymerchStockCountClasses.text}"></span>`,
    )

    const widgetNumber = dataStock.widgets.find((a) => a.type === 'count')
    const widgetBeforeNumber = dataStock.widgets.find((a) => a.type === 'beforeCount')
    const widgetAfterNumber = dataStock.widgets.find((a) => a.type === 'afterCount')

    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.emoji}`).html(dataStock.widgetData.emoji)

    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.text2}`).html(widgetBeforeNumber.text)
    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.text2}`).css('color', widgetBeforeNumber.color)
    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.text2}`).css('font-size', '' + widgetBeforeNumber.size + 'px')

    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.number}`).html(window.heymerchStockCountNumber)
    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.number}`).css('color', widgetNumber.color)
    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.number}`).css('font-size', '' + widgetNumber.size + 'px')

    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.text}`).html(widgetAfterNumber.text)
    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.text}`).css('color', widgetAfterNumber.color)
    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.text}`).css('font-size', '' + widgetAfterNumber.size + 'px')
}

//morethan
function ShowMoreThan() {
    increaseCount()
    heymerchStockCountJquery(`.${window.heymerchStockCountCustomClass}`).empty()
    heymerchStockCountJquery(`.${window.heymerchStockCountCustomClass}`).append(
        `<span class="${window.heymerchStockCountClasses.emoji}"></span><span class="${window.heymerchStockCountClasses.text}"></span>`,
    )

    const widget = dataStock.widgets.find((a) => a.type === 'moreThan')
    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.text}`).html(widget.text)
    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.text}`).css('color', widget.color)
    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.text}`).css('font-size', '' + widget.size + 'px')

    heymerchStockCountJquery(`.${window.heymerchStockCountClasses.emoji}`).html(dataStock.widgetData.emojiMore)
    heymerchStockCountJquery(`.${window.heymerchStockCountCustomClass}`).show()
}

//hide
function HideStockText() {
    heymerchStockCountJquery(`.${window.heymerchStockCountCustomClass}`).empty()
    // Remove the .hide() call since we want to keep the element available for future updates
    // Just empty it instead
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

function increaseCount() {
    // This is to prevent calling this function before the manage.js is loaded
    if (window.heymerchStockCountIncrease) {
        window.heymerchStockCountIncrease()
    } else {
        setTimeout(() => {
            increaseCount()
        }, 500)
    }
}

function getParameterByName2(name, url) {
    if (!url) url = window.location.href
    name = name.replace(/[\[\]]/g, '\\$&')
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

function onChangeVariant() {
    const heymerchNewVariantId = getParameterByName2('variant')
    if (heymerchNewVariantId !== null) {
        if (heymerchStockCountVariantId !== heymerchNewVariantId) {
            heymerchStockCountVariantId = heymerchNewVariantId
            window.heymerchStockCountVariantId = heymerchStockCountVariantId

            window.heymerchStockCountVariantCount = heymerchStockCountVariantList[heymerchStockCountVariantId]
            window.heymerchStockCountNumber = window.heymerchStockCountVariantCount
            
            // Make sure the wrapper is visible before checking the new variant
            heymerchStockCountJquery(`.${window.heymerchStockCountCustomClass}`).show()
            ControlUseRealData()
        }
    }
}

;(function () {
    var pushState = history.pushState
    var replaceState = history.replaceState

    history.pushState = function () {
        pushState.apply(history, arguments)
        window.dispatchEvent(new Event('pushstate'))
        window.dispatchEvent(new Event('locationchange'))
    }

    history.replaceState = function () {
        replaceState.apply(history, arguments)
        window.dispatchEvent(new Event('replacestate'))
        window.dispatchEvent(new Event('locationchange'))
    }

    window.addEventListener('popstate', function () {
        window.dispatchEvent(new Event('locationchange'))
    })
})()

controlStockCountDataSet()
