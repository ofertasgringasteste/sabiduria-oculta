var initTemplate = function () {
    const data = heymerchStockCountData;

    const position = data.widgetDisplay.position;
    const selector = position === 'above' ? data.widgetDisplay.aboveSelector : data.widgetDisplay.belowSelector;
    const selectorDiv = '.heymerch-stockcount-container';

    const certainSelectors = document.querySelectorAll('#hey-low-stock');
    // Check if any certain selectors exist
    if (certainSelectors.length > 0) {
        // Get the original widget
        const originalWidget = heymerchStockCountJquery(selectorDiv).detach();

        // Position the widget inside each certain selector
        certainSelectors.forEach(function(certainSelector) {
            // Check if the widget is already present
            if (heymerchStockCountJquery(certainSelector).find(selectorDiv).length === 0) {
                heymerchStockCountJquery(certainSelector).prepend(originalWidget.clone());
            }
        });
        return; // Exit the function early if certain selectors exist
    }
    let $target
    const $widget = heymerchStockCountJquery(selectorDiv).detach();
    const selectorList = selector.split('--split--'); 

    for(let [index, selectorItem] of selectorList.entries()){
        $target = heymerchStockCountJquery(selectorItem).first();

        if($target.length > 0){
            break;
        }
    }

    switch (position) {
        case 'append':
            $target.append($widget);
            break;
        case 'prepend':
            $target.prepend($widget);
            break;
        case 'below':
            if (data.widgetDisplay.belowUseParent) {
                $target.parent().after($widget);
            } else {
                $target.after($widget);
            }
            break;
        case 'above':
            if (data.widgetDisplay.aboveUseParent) {
                $target.parent().before($widget);
            } else {
                $target.before($widget);
            }
            break;
        default:
            $target.before($widget);
            break;
    }
}
var controlStockSettings2 = function () {
    if (window.heymerchStockCountData) {
        initTemplate()
    } else {
        setTimeout(() => {
            controlStockSettings2()
        }, 500)
    }
}

controlStockSettings2()