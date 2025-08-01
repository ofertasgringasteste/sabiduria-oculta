async function initStockAdd() {
    if (window.location.pathname.includes('/products/')) {
        return
    }

    if (window?.heymerchStockCountData) {
        if (!window?.heymerchStockCountData?.widgetDisplay?.showOnCollection) {
            console.log('Stock info is disabled on collections page, skipping...')
            return
        }
    // Removes the App Block container
        const elements = document.querySelectorAll('[class*="heymerch-stockcount-container"]');
        elements.forEach(element => element.remove());

        console.log('Setting up collections page stock info.')
        await addStockInfo()
    } else {
        setTimeout(initStockAdd, 1000)
    }
}

async function addStockInfo() {
    const productIds = window.allProducts
    if (!productIds || productIds?.length === 0) {
        console.log('No product IDs found, nothing to display.')
        return
    }

    const filteredCards = getFilteredProductCards()
    console.log(`Found ${filteredCards.length} potential product cards`)

    filteredCards.forEach((card, index) => addStockInfoToCard(card, index, productIds))
}

function getFilteredProductCards() {
    const processedProducts = new Set()
    const productCardsSelector = window.heymerchStockCountData.widgetDisplay.productCard ?? '[class*="product"], [class*="card"], .grid__item, li[class*="grid__item"], div[class*="grid__item"], .product-card-wrapper,#main-collection-products > li.grid-item '
    const productCards = document.querySelectorAll(productCardsSelector)

    return Array.from(productCards).filter((card) => {
        const productLinks = card.querySelectorAll('a[href*="/products/"]')
        if (productLinks.length === 0 || productLinks.length >= 5) {
            return false
        }

        const productUrl = productLinks[0].getAttribute('href')
        if (processedProducts.has(productUrl)) {
            return false
        }

        processedProducts.add(productUrl)
        return true
    })
}

function addStockInfoToCard(card, index, productIds) {
    const productLinks = card.querySelectorAll('a[href*="/products/"]')
    const productUrl = productLinks[0].getAttribute('href')
    const priceElementSelector = window.heymerchStockCountData.widgetDisplay.priceElement ?? '[class*="price"], .price__container, .price-item, [class*="money"]'
    const priceElement = card.querySelector(priceElementSelector)
    console.log('addStockInfoToCard - priceElement', priceElement, productUrl)
    if (priceElement) {
        const productId = getProductId(card, productIds)
        if (!productId) return

        // Check availability before creating the wrapper
        const isTracked = window.heymerchStockCountVariantAvailableList[productId] !== ''

        // Only create and insert the stock info if the product is tracked
        if (isTracked) {
            const stockInfo = createStockInfoElement(card, productIds, index)
            // Always try to insert after the price element's parent (.price)
            const priceContainer = priceElement.closest('.price')
            if (priceContainer) {
                insertStockInfo(priceContainer, stockInfo)
            } else {
                // Fallback to card-information if price container not found
                const cardInfo = card.querySelector('.card-information')
                if (cardInfo) {
                    cardInfo.appendChild(stockInfo)
                } else {
                    insertStockInfo(priceElement, stockInfo)
                }
            }

            // Call the top-level function from stock-show.js with the index
            window.controlStockCountDataSet(index)
        }
    } else {
    }
}

function createStockInfoElement(card, productIds, index) {
    const stockInfo = document.createElement('div')
    stockInfo.className = `heymerch-stockcount-wrapper-stock-${index}`

    const productId = getProductId(card, productIds)
    
    if (!productId) return stockInfo


    window.heymerchStockCountProductId = String(productId)

    return stockInfo
}

function insertStockInfo(priceElement, stockInfo) {
    if (priceElement.parentNode) {
        priceElement.parentNode.insertBefore(stockInfo, priceElement.nextSibling)
    } else {
        priceElement.appendChild(stockInfo)
    }
}

function getProductId(card, productIds) {
    const allHandles = window.productHandles
    const foundIds = new Set()

    // First check for handles
    for (const productId of productIds) {
        if (allHandles[productId] && card.innerHTML.includes(allHandles[productId])) {
            foundIds.add(productId)
        }
    }

    // Then check for product IDs
    for (const productId of productIds) {
        if (card.innerHTML.includes(productId)) {
            foundIds.add(productId)
        }
    }

    // If we found exactly one ID, return it
    if (foundIds.size === 1) {
        return Array.from(foundIds)[0]
    }

    // If we found multiple IDs, try to determine the most likely correct one
    if (foundIds.size > 1) {
        // Get the first product link in the card
        const productLinks = card.querySelectorAll('a[href*="/products/"]')
        if (productLinks.length > 0) {
            const handle = productLinks[0].getAttribute('href').split('/products/').pop().split('?')[0]
            // Return the ID that matches the handle in the URL
            for (const id of foundIds) {
                if (allHandles[id] === handle) {
                    return id
                }
            }
        }
        // If we can't determine the correct ID, return the first one found
        return Array.from(foundIds)[0]
    }

    return null
}

initStockAdd()
