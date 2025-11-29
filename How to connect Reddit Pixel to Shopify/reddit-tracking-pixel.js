/******************************************************************************************
 *  REDDIT TRACKING PIXEL FOR SHOPIFY
 *  Full step-by-step guide: https://digital-expert.co.uk/blogs/marketing-seo/how-to-connect-reddit-pixel-to-shopify
 ******************************************************************************************/

/*  INSTRUCTIONS:
 *  1. Replace YOUR_REDDIT_PIXEL_ID_HERE in the TWO places below with your real Reddit Pixel ID
 *     → Your Pixel ID looks like this: a2_xxxxxxxxxxxxxxxx
 *     → Find it here: Reddit Ads Manager (read the article)
 *  2. Copy the entire code and follow the article where to paste and next steps
 */

// 1. Load Reddit Pixel library (never edit this part)
!function(w,d){
  if(!w.rdt){
      var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};
      p.callQueue=[];
      var t=d.createElement("script");
      t.src="https://www.redditstatic.com/ads/pixel.js";
      t.async=!0;
      var s=d.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(t,s);
  }
}(window, document);

// REPLACE ONLY THE TWO LINES BELOW WITH YOUR REAL REDDIT PIXEL ID
// Your Pixel ID looks like this → a2_xxxxxxxxxxxx
// (Copy it from Reddit Ads)

rdt('init', 'YOUR_REDDIT_PIXEL_ID_HERE');   // ← CHANGE THIS

// Advanced matching – re-initializes pixel when a logged-in customer is detected
analytics.subscribe('customer_identified', (event) => {
  rdt('init', 'YOUR_REDDIT_PIXEL_ID_HERE', {   // ← CHANGE THIS (same ID as above)
      email:       event.customer?.email,
      phoneNumber: event.customer?.phone,
      externalId:  event.customer?.id
  });
});

// Page Visit (fires on every page)
analytics.subscribe('page_viewed', () => {
  rdt('track', 'PageVisit');
});

// Product View
analytics.subscribe('product_viewed', (event) => {
  rdt('track', 'ViewContent', {
      products: {
          id:       event.data.productVariant.sku || '',
          category: event.data.productVariant.product.type || '',
          name:     event.data.productVariant.product.title
      }
  });
});

// Add to Cart
analytics.subscribe('product_added_to_cart', (event) => {
  const line = event.data.cartLine;
  rdt('track', 'AddToCart', {
      currency:  line.merchandise.price.currencyCode,
      value:     line.cost.totalAmount.amount,
      itemCount: line.quantity,
      products: {
          id:       line.merchandise.sku || '',
          category: line.merchandise.product.type || '',
          name:     line.merchandise.product.title
      }
  });
});

// Purchase
analytics.subscribe('checkout_completed', (event) => {
  const c = event.data.checkout;
  rdt('track', 'Purchase', {
      email:        c.email,
      phoneNumber:  c.phone,
      currency:     c.currencyCode,
      value:        c.totalPrice.amount,
      itemCount:    c.lineItems.reduce((sum, i) => sum + i.quantity, 0),
      conversionId: c.order.id,
      products: c.lineItems.map(i => ({
          id:       i.variant?.sku || '',
          category: i.variant?.product.type || '',
          name:     i.title
      }))
  });
});