if (!customElements.get('best-sellers')) {
  class BestSellers extends HTMLElement {
    constructor() {
      super();

      const bestsellersWrapper = this.querySelector('.best-sellers__wrapper');
      const productID = this.querySelector('#product-id').getAttribute('data-product-id');

      let bestsellers = this.querySelectorAll('.swiper');
      let bestsellersSwiperWrapper = this.querySelector('.swiper-wrapper');

      if (bestsellers.length <= 4) {
        this.querySelector('.js-slider').classList.add('no-slider-arrows')
      }

      new Swiper(this.querySelector('.js-slider'), {
        slidesPerView: 4,
        spaceBetween: 30,
        grabCursor: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
      },
      })

    const renderProductCard = (product) => {
      let productElement = document.createElement("div");
      const template = `
        <a href="${product.onlineStoreUrl}" class="product-image-link">
          <div class="product-card__image-wrapper">
            <img
              src="${product.image.url}"
              alt="${product.title}"
              width="353"
              height="353" loading="lazy">
          </div>
         </a>
        <div class="product-card__info">
          <h2 class="product-card__title card__heading card__heading--placeholder h5" id="Product-${product.id}">
            ${product.title}
          </h2>
          <div class="product-card__price">
            <span><s class="price-item price-item--regular">${product.compareAtPrice}${product.currencyCode}</s></span>
            <span class="price-item price-item--sale price-item--last">${product.price}${product.currencyCode}</span>
          </div>
        </div>
      `;

      productElement.classList.add('best-sellers__slide', 'swiper-slide');
      productElement.setAttribute('aria-labelledby', `Product-${product.id}`);
      productElement.innerHTML = template;
      bestsellersSwiperWrapper.appendChild(productElement);
    };

    const accessToken = '4d28a2cf220c1d3d602fb95278c54365';
    const collectionTitlesData = document.getElementById('collectionTitles').getAttribute('data-collections');

    const replacePolishChars = (str) => {
      const from = "ąćęłńóśźżĄĆĘŁŃÓŚŹŻ";
      const to = "acelnoszzACELNOSZZ";

      return str.split('').map((letter) => {
        const index = from.indexOf(letter);
        return index !== -1 ? to[index] : letter;
      }).join('');
    };

    const extractNumericId = (globalId) => {
      const idParts = globalId.split('/');
      return idParts[idParts.length - 1];
    };

    const handles = replacePolishChars(collectionTitlesData).split(',').filter(Boolean);
    // console.log('handles ', handles);
    const fetchProductsByHandle = async (handle) => {
      const query = `
        query {
          collectionByHandle(handle: "${handle}"){
            products(first: 10, sortKey: BEST_SELLING) {
              edges {
                node {
                  id
                  title
                  handle
                  featuredImage {
                    url
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        compareAtPriceV2 {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const response = await fetch(`https://${window.Shopify.shop}/api/2024-01/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': accessToken
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      return data.data.collectionByHandle.products.edges;
    };

    // Funkcja do pobrania produktów dla każdego handle
    const fetchAllProducts = async () => {
      const allProducts = [];

      for (const handle of handles) {
        const products = await fetchProductsByHandle(handle);
        allProducts.push({ handle, products });
      }
      return allProducts;
    };

    fetchAllProducts()
      .then(allProducts => {
        const displayedProducts = {};

        allProducts.forEach(({ handle, products }) => {
          products.forEach(({node: product}) => {
            const numericProductId = extractNumericId(product.id);

            if (!displayedProducts[product.id] && numericProductId !== productID) {
              bestsellersWrapper.classList.remove('hide');
              const firstVariant = product.variants.edges[0]?.node;

              const productData = {
                id: product.id,
                title: product.title,
                onlineStoreUrl: `https://${window.Shopify.shop}/products/${product.handle}`,
                image: {
                  url: product.featuredImage?.url || ''
                },
                price: product.priceRange.minVariantPrice.amount,
                currencyCode: product.priceRange.minVariantPrice.currencyCode,
                compareAtPrice: firstVariant.compareAtPriceV2 ? firstVariant.compareAtPriceV2.amount : null,
                compareAtPriceCurrencyCode: firstVariant.compareAtPriceV2 ? firstVariant.compareAtPriceV2.currencyCode : null
              };
              renderProductCard(productData);

              displayedProducts[product.id] = true;
            };
          });
          // products.forEach(product => {
          //   console.log('handle:', product.handle);
          //   console.log('Product ID:', product.node.id);
          //   console.log('Title:', product.node.title);
          //   console.log('------------------------------------');
          // });
        });
      })
      .catch(error => console.error('Error:', error));
      }
  }

  customElements.define('best-sellers', BestSellers)
}
