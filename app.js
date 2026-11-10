const storeName = "Shopee Finds";
const products = [
  {
    id: "ceramic-mug",
    name: "Everyday ceramic mug",
    category: "Home",
    price: "$12.90",
    oldPrice: "$18.00",
    label: "BESTSELLER",
    featured: true,
    images: [
      "./assets/item1/mug1.jpg",
      "./assets/item1/mug2.jpg",
    ],
    affiliateUrl: "https://shopee.com/",
    alt: "Handmade ceramic mug on a light table",
  },
  {
    id: "woven-tote",
    name: "The weekend woven tote",
    category: "Accessories",
    price: "$16.50",
    oldPrice: "",
    label: "A LITTLE FAVORITE",
    featured: true,
    images: ["./assets/woven-tote.jpg"],
    affiliateUrl: "https://shopee.com/",
    alt: "Woven everyday tote bag",
  },
  {
    id: "daily-notebook",
    name: "A little space to plan",
    category: "Stationery",
    price: "$8.25",
    oldPrice: "$10.00",
    label: "LOVELY PICK",
    featured: true,
    images: ["./assets/daily-notebook.jpg"],
    affiliateUrl: "https://shopee.com/",
    alt: "Open notebook and stationery on a desk",
  },
  {
    id: "skincare-bottle",
    name: "Simple skin, happy days",
    category: "Self-care",
    price: "$14.00",
    oldPrice: "",
    label: "SELF-CARE",
    featured: true,
    images: ["./assets/skincare-bottle.jpg"],
    affiliateUrl: "https://shopee.com/",
    alt: "Minimal skincare bottle with a clean background",
  },
  {
    id: "glass-vase",
    name: "Sunday morning vase",
    category: "Home",
    price: "$11.75",
    oldPrice: "",
    label: "NEW FIND",
    featured: false,
    images: ["./assets/glass-vase.jpg"],
    affiliateUrl: "https://shopee.com/",
    alt: "Decorative glass vase in a sunny room",
  },
  {
    id: "sunglasses",
    name: "A sunny-day essential",
    category: "Accessories",
    price: "$9.90",
    oldPrice: "",
    label: "UNDER $10",
    featured: false,
    images: ["./assets/sunglasses.jpg"],
    affiliateUrl: "https://shopee.com/",
    alt: "Classic sunglasses in warm sunlight",
  },
  {
    id: "journal",
    name: "Little notes, big ideas",
    category: "Stationery",
    price: "$7.50",
    oldPrice: "",
    label: "DESK FAVORITE",
    featured: false,
    images: ["./assets/journal.jpg"],
    affiliateUrl: "https://shopee.com/",
    alt: "Notebook and pen on a tidy desk",
  },
  {
    id: "bath-oil",
    name: "A softer kind of evening",
    category: "Self-care",
    price: "$13.25",
    oldPrice: "$16.00",
    label: "SLOW DOWN",
    featured: false,
    images: ["./assets/bath-oil.jpg"],
    affiliateUrl: "https://shopee.com/",
    alt: "Self-care essentials arranged together",
  },
];

const featuredProducts = products.filter((product) => product.featured);
const carouselImage = document.querySelector(".carousel-image");
const carouselTag = document.querySelector(".carousel-tag");
const carouselCounter = document.querySelector(".carousel-counter");
const carouselTitle = document.querySelector(".carousel-title");
const carouselPrice = document.querySelector(".carousel-price");
const carouselLink = document.querySelector(".carousel-link");
const carouselDots = document.querySelector(".carousel-dots");
const productGrid = document.querySelector(".product-grid");
const categoryList = document.querySelector(".category-list");
let activeSlide = 0;
let activeCategory = "All finds";
let slideshowTimer;

document.title = `${storeName} — Little things, lovely finds`;
document.querySelectorAll("[data-store-name]").forEach((element) => {
  element.textContent = storeName;
});
document.querySelector("#current-year").textContent = new Date().getFullYear();

function renderSlide(index) {
  activeSlide = (index + featuredProducts.length) % featuredProducts.length;
  const product = featuredProducts[activeSlide];

  carouselImage.classList.add("is-changing");
  carouselImage.src = product.images[0];
  carouselImage.alt = product.alt;
  carouselImage.onload = () => carouselImage.classList.remove("is-changing");
  carouselImage.onerror = () => carouselImage.classList.remove("is-changing");
  carouselTag.textContent = product.label;
  carouselCounter.textContent = `${String(activeSlide + 1).padStart(2, "0")} / ${String(featuredProducts.length).padStart(2, "0")}`;
  carouselTitle.textContent = product.name;
  carouselPrice.textContent = product.price;
  carouselLink.href = product.affiliateUrl;
  carouselLink.setAttribute("aria-label", `Shop ${product.name} on Shopee`);
  carouselDots.querySelectorAll(".carousel-dot").forEach((dot, dotIndex) => {
    dot.setAttribute("aria-current", String(dotIndex === activeSlide));
  });
}

function restartSlideshow() {
  window.clearInterval(slideshowTimer);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    slideshowTimer = window.setInterval(() => renderSlide(activeSlide + 1), 5000);
  }
}

function showSlide(index) {
  renderSlide(index);
  restartSlideshow();
}

featuredProducts.forEach((product, index) => {
  const dot = document.createElement("button");
  dot.className = "carousel-dot";
  dot.type = "button";
  dot.setAttribute("aria-label", `Show featured product ${index + 1}: ${product.name}`);
  dot.addEventListener("click", () => showSlide(index));
  carouselDots.append(dot);
});

document.querySelector(".carousel-arrow.previous").addEventListener("click", () => {
  showSlide(activeSlide - 1);
});
document.querySelector(".carousel-arrow.next").addEventListener("click", () => {
  showSlide(activeSlide + 1);
});

function renderCategories() {
  const categories = ["All finds", ...new Set(products.map((product) => product.category))];
  categoryList.replaceChildren();

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = "category-button";
    button.type = "button";
    button.textContent = category;
    button.setAttribute("aria-pressed", String(category === activeCategory));
    button.addEventListener("click", () => {
      activeCategory = category;
      renderCategories();
      renderProducts();
    });
    categoryList.append(button);
  });
}

function renderProducts() {
  const visibleProducts =
    activeCategory === "All finds"
      ? products
      : products.filter((product) => product.category === activeCategory);

  productGrid.replaceChildren();
  visibleProducts.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const imageWrap = document.createElement("div");
    imageWrap.className = "product-image-wrap";
    const image = document.createElement("img");
    image.className = "product-image";
    let activeImage = 0;
    image.src = product.images[activeImage];
    image.alt = product.alt;
    image.loading = "lazy";

    const label = document.createElement("span");
    label.className = "product-label";
    label.textContent = product.label;
    imageWrap.append(image, label);

    if (product.images.length > 1) {
      const galleryControls = document.createElement("div");
      galleryControls.className = "product-gallery-controls";

      const imageCounter = document.createElement("span");
      imageCounter.className = "product-image-counter";
      imageCounter.setAttribute("aria-live", "polite");

      const previousImage = document.createElement("button");
      previousImage.className = "product-gallery-button";
      previousImage.type = "button";
      previousImage.setAttribute("aria-label", `Previous image of ${product.name}`);
      previousImage.textContent = "←";

      const nextImage = document.createElement("button");
      nextImage.className = "product-gallery-button";
      nextImage.type = "button";
      nextImage.setAttribute("aria-label", `Next image of ${product.name}`);
      nextImage.textContent = "→";

      const showProductImage = (index) => {
        activeImage = (index + product.images.length) % product.images.length;
        image.src = product.images[activeImage];
        imageCounter.textContent = `${activeImage + 1} / ${product.images.length}`;
      };

      previousImage.addEventListener("click", () => showProductImage(activeImage - 1));
      nextImage.addEventListener("click", () => showProductImage(activeImage + 1));
      showProductImage(activeImage);
      galleryControls.append(previousImage, imageCounter, nextImage);
      imageWrap.append(galleryControls);
    }

    const info = document.createElement("div");
    info.className = "product-info";
    const category = document.createElement("p");
    category.className = "product-category";
    category.textContent = product.category;

    const name = document.createElement("h3");
    name.className = "product-name";
    name.textContent = product.name;

    const bottom = document.createElement("div");
    bottom.className = "product-bottom";
    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = product.price;
    if (product.oldPrice) {
      const oldPrice = document.createElement("del");
      oldPrice.textContent = product.oldPrice;
      price.append(oldPrice);
    }

    const link = document.createElement("a");
    link.className = "product-link";
    link.href = product.affiliateUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `Shop ${product.name} on Shopee`);
    link.textContent = "Shop on Shopee ↗";
    bottom.append(price, link);
    info.append(category, name, bottom);
    card.append(imageWrap, info);
    productGrid.append(card);
  });
}

renderSlide(0);
renderCategories();
renderProducts();
restartSlideshow();
