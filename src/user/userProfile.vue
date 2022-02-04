<template>
  <div class="user-profile">
    <div class="user-profile__wrapper">
      <div class="user-profile__card-block">
        <div class="user-profile__header-block">
          <div class="user-profile__title">Карты</div>
          <div class="user-profile__title user-profile__title__green">
            + Оформить картy
          </div>
        </div>
        <div class="user-profile__sub-header-block">
          <div class="user-profile__title active">Активные<sup>1</sup></div>
          <div class="user-profile__title not-active">
            Неактивные <sup>0</sup>
          </div>
        </div>
        <div class="user-profile__card">
          <div class="user-profile__card-type">
            <div class="user-profile__title-card size_twenty">
              Дебетовая карта
            </div>
            <div class="user-profile__card-logo">
              <img src="./../../resources/image/visa 1 (1).png" alt="" />
            </div>
          </div>
          <div class="user-profile__card-balance">
            <div class="user-profile__title-card size_eighteen">
              Баланс карты
            </div>
            <div class="user-profile__title-card twenty_eight">$5,750,20</div>
          </div>
          <div class="user-profile__card-data">
            <div class="user-profile__card-number">
              <div
                v-if="isClickEye === false"
                class="user-profile__number_card"
              >
                {{ currentUser.cardNumber.substring(0, 4) }}
                {{ currentUser.cardNumber.substring(5, 9) }}
                {{ currentUser.cardNumber.substring(10, 14) }}
                {{
                  currentUser.cardNumber.substring(
                    currentUser.cardNumber.length - 4
                  )
                }}
              </div>
              <div v-else class="user-profile__number_card closeNumber">
                **** **** ****
                {{
                  currentUser.cardNumber.substring(
                    currentUser.cardNumber.length - 4
                  )
                }}
              </div>
              <div
                class="user-profile__hide-number-logo"
                @click="isClickEye_()"
              >
                <img src="./../../resources/image/asd 1.png" alt="" />
              </div>
            </div>
            <div class="user-profile__card-years">09/25</div>
          </div>
        </div>
      </div>
      <div class="user-profile__recomendatoon-block">
        <div class="user-profile__header-block">
          <div class="user-profile__title">Для вас</div>
        </div>
        <div class="user-profile__sub-header-block">
          <div class="user-profile__title border">Продукты банка</div>
        </div>
        <div v-if="recomendationst.length===0" class="user-profile__title-not-rec">
          Скоро здесь будут рекомендации от банка ТКБ!
        </div>
        <div class="user-profile__products">
          <div
            v-for="(key, index) in recomendationst"
            :key="index"
            class="user-profile__product"
          >
            <div class="user-profile__image-product">
              <img :src="`${key.url}`" alt="" />
              <div
                @click="deleteProduct(key.card, index)"
                class="user-profile__remove-product"
              >
                <img
                  class="image-remove"
                  src="./../../resources/image/icons8-circle-100 1 (1).png"
                  alt=""
                />
              </div>
            </div>
            <div class="user-profile__title-product">
              {{ key.title }}
            </div>
          </div>
        </div>
      </div>
      <img
        src="https://downloader.disk.yandex.ru/preview/ab2d333ed9227a0423675f8baf9a086761666543cdb207cd52b9b1128d78e507/61f7462a/EboLgUMePJFuw1c-u061QpVt-scR-kV8ux4IMtsEd1UNOZmRsOLC6StYWekL0dYsNDPCsuLsLTFS_b-OfdJDUQ%3D%3D?uid=0&filename=min-banner-polzunki.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=1920x947"
        alt=""
      />
    </div>
    <div class="user-profile__footer">
      <div class="footer__user-logo">
        <div class="footer__user-logo__user">
          <router-link to="/userProfile">
            <img src="./../../resources/image/icons8-user-64 1.png" alt="" />
          </router-link>
        </div>
        <div class="footer__user-logo__purchases">
          <router-link to="/links">
            <img src="./../../resources/image/shopping-bag(2) 2.png" alt="" />
          </router-link>
        </div>
        <div class="footer__user-logo__log-out">
          <router-link to="signIn">
            <img
              src="./../../resources/image/icons8-logout-rounded-down-100 1.png"
              alt=""
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "user-profile",
  data() {
    return {
      recomendationst: [],
      hover: false,
      isClickEye: false,
    };
  },
  created() {
    this.getUserData();
    this.getUserRecom();
  },
  computed: {
    ...mapGetters(["isSignedIn"]),
    ...mapState(["currentUser"]),
    isSignedIn() {
      return this.isSignedIn();
    },
  },
  methods: {
    ...mapMutations(["setUserData", "setCurrentUser"]),
    signOut() {
      this.setUserToken({});
      this.setCurrentUser({});
      this.$router.push("/signIn");
    },
    getUserData() {
      fetch("https://lkbank.bonch-ikt.ru/api/getuser", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.currentUser.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.setUserData(data);
          console.log(data);
        });
    },
    getUserRecom() {
      fetch("https://lkbank.bonch-ikt.ru/api/getproducts", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.currentUser.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.recomendationst = data.list;
          console.log(this.recomendationst);
        });
    },

    deleteProduct(property, index) {
      console.log(index);
      console.log(property);
      let massiv = property;

      fetch(`https://lkbank.bonch-ikt.ru/api/deletecard`, {
        method: "PATCH",
        body: JSON.stringify({
          email: this.currentUser.email,
          cardsfordelete: massiv,
        }),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${this.currentUser.token}`,
        },
      })
        .then((response) => response.text())
        .then((text) => {
          this.recomendationst.splice(index, 1);
          console.log(text);
        });
    },
    isClickEye_() {
      this.isClickEye = !this.isClickEye;
    },
  },
};
</script>
<style>
.user-profile {
  width: 100%;
  height: 100%;
}
.user-profile__wrapper {
  display: flex;
  justify-content: space-between;
  width: 95%;
  flex-wrap: wrap;
  padding-top: 150px;
  margin-left: auto;
  margin-right: auto;
}
.user-profile__title {
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  line-height: 29px;
  letter-spacing: 0.1em;
  color: #353535;
  padding: 10px;
}
.user-profile__title-not-rec {
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 29px;
  letter-spacing: 0.1em;
  color: #353535;
  padding: 10px;
}
.user-profile__title__green {
  color: #38b1ac;
}
.user-profile__header-block {
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: 2px solid #353535;
  min-width: 290px;
  margin-bottom: 20px;
}
.user-profile__sub-header-block {
  display: flex;
  margin-bottom: 30px;
}
.user-profile__card-block {
  width: 670px;
  min-width: 290px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
}
.user-profile__recomendatoon-block {
  width: 720px;
  min-width: 290px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
}
.active {
  border-bottom: 3px solid #38b1ac;
  padding-right: 0;
}
.not-active {
  color: #989898;
  padding-left: 35px;
}
.border {
  border-bottom: 3px solid #38b1ac;
}
.user-profile__card {
  width: 530px;
  background: url("./../../resources/image/card.png");
  border-radius: 30px;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 40px;
}
.user-profile__card-type {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
}
.user-profile__title-card {
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #ffffff;

  line-height: 23px;
  letter-spacing: 2px;
  font-style: normal;
}
.size_twenty {
  font-size: 20px;
}
.user-profile__card-balance {
  margin-bottom: 90px;
}
.size_eighteen {
  font-size: 18px;
  margin-bottom: 28px;
}
.twenty_eight {
  font-size: 28px;
  line-height: 37px;
  font-family: "Halter", sans-serif;
}
@font-face {
  font-size: 400;
  font-family: Halter; /* Имя шрифта */
  src: url("./../../resources/Halter.ttf"); /* Путь к файлу со шрифтом */
}
.user-profile__card-data {
  width: 530px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-profile__card-number {
  display: flex;
  max-width: 400px;
 
  align-items: center;
}
.user-profile__number_card {
  font-family: "Halter", sans-serif;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: 0.5px;
  color: #ffffff;
  padding-right: 10px;
  min-width: 150px;
}
.closeNumber{
  min-width: 280px;
   
}
.user-profile__card-years {
  display: flex;
  align-items: center;
  font-family: Halter;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 27px;
  text-align: right;
  letter-spacing: 0.5px;
  color: #ffffff;
}
.user-profile__products {
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 30px;
}
.user-profile__product {
  width: 340px;
  background: white;
  margin-bottom: 30px;
}

.user-profile__title-product {
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.05em;
  color: #353535;
  text-align: center;
}
.user-profile__image-product {
  width: 340px;
  height: 215px;
  border: 2px solid #38b1ac;
  margin-bottom: 10px;
  border-radius: 10px;
  position: relative;
}
.user-profile__image-product:hover .user-profile__remove-product {
  display: block;
}
.user-profile__image-product:hover::after {
  opacity: 0.8;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.user-profile__image-product::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: opacity 0.3s linear;
  z-index: 1;
}
.user-profile__remove-product {
  position: absolute;
  width: 50px;
  height: 50px;
  top: 90px;
  left: 145px;
  z-index: 2;
  display: none;
}

.user-profile__image-product img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.user-profile__button {
  width: 295px;
  height: 50px;
  background: #ffffff;
  border: 2px solid #38b1ac;
  box-sizing: border-box;
  border-radius: 10px;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.1em;
  color: #353535;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-profile__footer {
  display: none;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #353535;
  height: 66px;
}

.footer__user-logo {
  width: 200px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  padding-top: 20px;
}
.footer__user-logo__user img,
.footer__user-logo__purchases img,
.footer__user-logo__log-out img {
  width: 40px;
  height: 40px;
}
@media (max-width: 765px) {
  .user-profile {
    background: url("./../../resources/image/image (4).png");
  }
  .user-profile__wrapper {
    padding-top: 100px;
  }
  .user-profile__header-block {
    margin-bottom: 0;
  }
  .user-profile__sub-header-block {
    margin-bottom: 12px;
  }
  .user-profile__card-block {
    width: 290px;
    margin-bottom: 20px;
  }
  .user-profile__title {
    font-size: 13px;
    padding: 6px;
    line-height: 15px;
  }
  .user-profile__card {
    width: 235px;
    padding: 20px;
  }
  .user-profile__card-type {
    margin-bottom: 5px;
  }
  .user-profile__card-balance {
    margin-bottom: 25px;
  }
  .size_twenty {
    font-size: 12px;
    line-height: 14px;
  }
  .size_eighteen {
    font-size: 10px;
    margin-bottom: 2px;
  }
  .user-profile__card-logo {
    width: 54px;
    height: 19px;
  }
  .twenty_eight {
    font-size: 16px;
  }

  .user-profile__card-logo img {
    width: 100%;
    height: 100%;
  }
  .user-profile__card-data {
    width: 235px;
  }
  .user-profile__card-number{
      min-width: 160px;
      max-width: 220px;
       
  }
  .closeNumber{
    min-width: 120px;
  }
  .user-profile__number_card {
    font-size: 9px;
   max-width: 190px;
   padding-right: 2px;
  }
  .user-profile__hide-number-logo {
    width: 17px;
    height: 17px;
 
  }
  .user-profile__hide-number-logo img {
    width: 100%;
    height: 100%;
  }
  .user-profile__card-years {
    font-size: 9px;
  }
  .user-profile__recomendatoon-block {
    width: 300px;
  }
  .user-profile__product {
    width: 137px;
    background-size: 35%;
  }
  .user-profile__title-product {
    font-size: 13px;
  }
  .user-profile__image-product {
    width: 140px;
    height: 80px;
  }
  .user-profile__button {
    width: 290px;
    height: 30px;
    margin-bottom: 30px;
  }
  .user-profile__remove-product {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 28px;
    left: 55px;
    z-index: 2;
    display: none;
  }
  .user-profile__footer {
    display: block;
  }
}
</style>
