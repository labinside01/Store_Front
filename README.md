# Shopee Finds

A lightweight affiliate storefront built with plain HTML, CSS, and JavaScript. No build step or dependencies are required; the project can be deployed as a static site on Vercel.

## Customize products

Edit the `products` list and `storeName` at the top of [`app.js`](./app.js):

- Set each product's name, category, price, images, and `affiliateUrl`.
- Replace each sample `affiliateUrl` with your own Shopee affiliate link before publishing.
- Set `featured: true` for products to include in the automatic slideshow.
- Put your product images in the `assets` folder. The sample products expect these first-image filenames:
  `ceramic-mug.jpg`, `woven-tote.jpg`, `daily-notebook.jpg`, `skincare-bottle.jpg`,
  `glass-vase.jpg`, `sunglasses.jpg`, `journal.jpg`, and `bath-oil.jpg`.
- To add more images to a product, add their local paths to its `images` array in `app.js`,
  for example: `images: ["./assets/mug-front.jpg", "./assets/mug-side.jpg"]`.
  The product card will show previous/next controls when there is more than one image.
  The featured slideshow uses the first image in each product's array.
- To use a different filename or image format, update the paths in that product's `images`
  array (for example, `"./assets/my-product.png"`).
- The slideshow advances every five seconds. Visitors can also use its arrow and dot controls.

## Deploy to Vercel

1. Push this folder to a Git repository and import it in Vercel, or run `vercel` from this folder.
2. Select **Other** as the framework preset if Vercel asks.
3. Leave the build command and output directory empty; the site is served directly from the project root.

The sample products and prices are for demonstration. Update them and your affiliate links before sharing the site.
