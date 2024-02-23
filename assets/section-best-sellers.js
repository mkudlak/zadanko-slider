if (!customElements.get('best-sellers')) {
  class BestSellers extends HTMLElement {
    constructor() {
      super()

      let bestsellers = this.querySelectorAll('.swiper-slide')

      if (bestsellers.length <= 4) {
        this.querySelector('.js-slider').classList.add('no-slider-arrows')
      }

      let splide = new Splide(this.querySelector('.js-slider'), {
        rewind: true,
        slideFocus: false,
        pagination: false,
        arrows: true,
        perPage: 3,
        breakpoints: {
          989: { perPage: 2 },
          768: { perPage: 2 },
          640: { perPage: 1 },
        },
      })
    }
  }

  customElements.define('best-sellers', BestSellers)
}
