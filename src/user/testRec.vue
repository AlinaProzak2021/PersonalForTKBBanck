<template>
  <div class="test-product">
    <div class="user-profile__product_">
      <div
        class="user-profile__image-product_"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      >
        <img
          class="image-product"
          src="./../../resources/image/card.png"
          alt=""
        />
        <div v-show="hover === true" class="user-profile__remove-product">
          <img
            class="image-remove"
            src="./../../resources/image/icons8-circle-100 1 (1).png"
            alt=""
          />
        </div>
      </div>
      <div class="user-profile__title-product__"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hover: false,
    };
  },
};
</script>
<style  scoped>
.test-product {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-profile__product_ {
  width: 340px;
  background: white;
  margin-bottom: 30px;
  height: 215px;
  position: relative;
}
.user-profile__image-product_ {
  width: 100%;
  height: 100%;
}
.user-profile__image-product_:hover::after {
  opacity: 0.8;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
.user-profile__image-product_::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  transition: opacity 0.3s linear;
  z-index: 1;
}
.user-profile__image-product_ img {
  width: 100%;
  height: 100%;
}
.user-profile__remove-product{
    position: absolute;
    width: 50px;
    height: 50px;
    top:100px;
    left: 150px;
    z-index: 2;
}

</style>
