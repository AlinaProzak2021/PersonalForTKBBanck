<template>
  <div class="product-links">
    <div class="product__list">
      <div class="product-links__title">
        Покупайте товары и получайте кешбек от ТКБ банка
      </div>
      <div
        v-for="(key, index) in links"
        :key="index"
        @click="clickOnLink(key.property)"
        class="list__item-link"
      >
        <div class="item-link__image">
          <img :src="require(`./../../resources/image/${key.imgUrl}`)" />
        </div>
        <div class="item-link__title">
          {{ key.title }}
        </div>
      </div>
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
import { mapState, mapMutations } from "vuex";
export default {
  name: "links",
  data() {
    return {
      links: [
        {
          imgUrl: "avito_child_.png",
          title: "Товары для детей",
          property: "child",
          link: "updatechild",
        },
        {
          imgUrl: "avito_child_.png",
          title: "новые автомобили",
          property: "newauto",
          link: "updatenewauto",
        },
        {
          imgUrl: "dns.png",
          title: "офисная техника",
          property: "officetech",
          link: "updateofficetech",
        },
        {
          imgUrl: "avito_child_.png",
          title: "коммерческая недвижимость",
          property: "komnedv",
          link: "updatekomnedv",
        },
        {
          imgUrl: "auto_ru.png",
          title: "б/у автомобили",
          property: "buauto",
          link: "updatebuauto",
        },
        {
          imgUrl: "dns.png",
          title: "компьютеры и комплектующие",
          property: "pc",
          link: "updatepc",
        },
        {
          imgUrl: "avito_child_.png",
          title: "недвижимость",
          property: "gknedv",
          link: "updategknedv",
        },
        {
          imgUrl: "yandex.png",
          title: "Первичный рынок",
          property: "fr",
          link: "updatefr",
        },
        {
          imgUrl: "steam.png",
          title: "компьютерные игры",
          property: "games",
          link: "updategames ",
        },
        {
          imgUrl: "avito_child_.png",
          title: "бытовая техника",
          property: "btech",
          link: "updatebtech",
        },
        {
          imgUrl: "yandex.png",
          title: "вторичный рынок",
          property: "sr",
          link: "updatesr",
        },
        {
          imgUrl: "e_apteka.png",
          title: "медикаменты",
          property: "med",
          link: "updatemed",
        },
      ],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    ...mapMutations(["setCurrentUser"]),
    signOut() {
      this.setUserToken({});
      this.setCurrentUser({});
      this.$router.push("/signIn");
    },
    clickOnLink(property) {
      console.log(this.currentUser.token);
      fetch(`https://lkbank.bonch-ikt.ru/api/addcard`, {
        method: "PATCH",
        body: JSON.stringify({
          email: this.currentUser.email,
          card: property,
        }),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${this.currentUser.token}`,
        },
      })
        .then((response) => response.text())
        .then((text) => console.log(text));
    },
  },
};
</script>
<style>
.product-links {
  width: 100%;
  height: 100%;
}
.product__list {
  padding-top: 80px;
  max-width: 1200px;
  min-width: 350px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
}
.product-links__title {
  font-size: 1.5rem;
  font-family: "Roboto", sans-serif;
  border-bottom: 1px solid#38B1AC;
  width: 100%;
  line-height: 2;
  margin-bottom: 20px;
  letter-spacing: 0.1em;
  padding: 20px;
}
.list__item-link {
  width: 300px;
  min-width: 200px;
  background: #ffffff;
  border: 0.5px solid #7e7e7e;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  -webkit-box-shadow: 3px 4px 10px 3px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 3px 4px 10px 3px rgba(34, 60, 80, 0.2);
  box-shadow: 3px 4px 10px 3px rgba(34, 60, 80, 0.2);
}

.item-link__image {
  width: 200px;
  height: 75px;
  margin-bottom: 5px;
  margin-left: auto;
  margin-right: auto;
}
.item-link__image img {
  width: 100%;
  height: 100%;
}
.item-link__title {
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  font-weight: 300;
  color: #353535;
  text-align: center;
  line-height: 21px;
  max-width: 270px;
  margin-left: auto;
  margin-right: auto;
}
.list__item-link:hover {
  opacity: 0.6;
}

.user-profile__footer {
  display: none;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #353535;
  height: 66px;
}
@media (max-width: 765px) {
  .product-links {
    display: block;
  }
  .product__list {
    justify-content: space-around;
  }
  .item-link__title {
    font-size: 16px;
  }
  .list__item-link {
    width: 150px;
    padding: 10px;
  }
  .product-links__title {
    font-size: 18px;
    text-align: center;
  }
  .item-link__image {
    width: 120px;
  }
  .user-profile__footer {
    display: block;
  }
}
</style>
