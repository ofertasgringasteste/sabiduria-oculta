
    (function() {
      var cdnOrigin = "https://cdn.shopify.com";
      var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/polyfills.D8hiOd40.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/app.CgrIouFZ.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/page-OnePage.D7bj-TRA.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/DeliveryMethodSelectorSection.CehwpfAV.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/useEditorShopPayNavigation.1fu6Fuj0.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/VaultedPayment.7gR2Bflf.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/LocalizationExtensionField.DrFSbCHG.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/ShopPayOptInDisclaimer.BCCGiVka.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/ShipmentBreakdown.DYntLbpP.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/MerchandiseModal.D3OUwLZw.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/StackedMerchandisePreview.DiPmWMl1.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/PayButtonSection.ClkUw4mO.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/component-ShopPayVerificationSwitch.CYk9c0lc.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/useSubscribeMessenger.DN7rtLCP.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/index.HKfSu8h1.js"];
      var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/app.bsMIEg5C.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/OnePage.PMX4OSBO.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/DeliveryMethodSelectorSection.Cx21oFfE.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/useEditorShopPayNavigation.DCOTvxC3.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/VaultedPayment.OxMVm7u-.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/StackedMerchandisePreview.CKAakmU8.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/ShopPayVerificationSwitch.DW7NMDXG.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = [];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [cdnOrigin].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  