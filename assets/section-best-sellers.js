if (!customElements.get('best-sellers')) {
  class BestSellers extends HTMLElement {
    constructor() {
      super()

      let bestsellers = this.querySelectorAll('.swiper');
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
    }
  }

  customElements.define('best-sellers', BestSellers)
}
