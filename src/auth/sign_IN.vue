<template>
  <div class="login">
    <form class="login__form">
      <div class="form__title">Вход</div>
      <input
        type="email"
        class="form__input"
        placeholder="Введите E-mail"
        v-model="email"
      />
      <input
        type="password"
        class="form__input form__input__margin_38"
        placeholder="Введите пароль"
        v-model="password"
      />
      <button class="form__button" @click.prevent="signIn({ email, password })">
        Войти
      </button>
      <div class="form__link-sign-up">
        У меня еще нет аккаунта
        <a @click="$router.push('/signUp')">Зарегистрироваться</a>
      </div>
    </form>
    <div class="login__footer">
      <div class="login__link-sign-up">
        У меня еще нет аккаунта <a href="#">Зарегистрироваться</a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "sign-in",
  components: {},
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },

  methods: {
    ...mapMutations(["setUserToken"]),

    signIn(credentials) {
      fetch("https://lkbank.bonch-ikt.ru/api/signin", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            this.setUserToken(data.token);
            this.$router.push("/userProfile");
          }
        });
    },
  },
};
</script>

<style>
.login {
  background: url("./../../resources/image/image (4).png");
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.login__form {
  width: 489px;
  background: #ffffff;
  border: 1px solid #949494;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background-image: url("./../../resources/image/padlock 1 (2).png");
  background-repeat: no-repeat;
  background-size: 150px;
  background-position-x: right;
  background-position-y: 70px;
}
.form__title {
  font-family: "Roboto", sans-serif;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 58px;
  border-bottom: 1px solid #969696;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 0.05em;
  color: #353535;
  margin-bottom: 44px;
}
.form__input {
  width: 400px;
  height: 50px;
  background: #ffffff;
  border: 1px solid #38b1ac;
  box-sizing: border-box;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 27px;
  padding-left: 20px;
  font-size: 18px;
}
.form__input:focus {
  border: 2px solid #38b1ac;
}
.form__input__margin_38 {
  margin-bottom: 38px;
}
::placeholder {
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.05em;
  color: #cacaca;
}
.form__button {
  margin-left: auto;
  margin-right: auto;
  width: 200px;
  height: 40px;
  background: #38b1ac;
  border-radius: 10px;
  border: none;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.05em;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  margin-bottom: 44px;
}
.form__link-sign-up {
  width: 242px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.05em;
  color: #353535;
  margin-bottom: 53px;
}
.form__link-sign-up a {
  text-decoration: none;
  color: #38b1ac;
}
.form__button:hover {
  color: #38b1ac;
  background: #ffffff;
  border: 2px solid #38b1ac;
}
input {
  outline: none;
}
.login__footer {
  display: none;
}
@media (max-width: 765px) {
  .login__form {
    border: none;
    border-radius: 0;
    background: none;
  }
  .form__title {
    font-style: normal;
    font-weight: bold;
    font-size: 35px;
    line-height: 41px;
    border-bottom: 0;
    margin-bottom: 100px;
  }
  .form__input {
    width: 290px;
    height: 55px;
    margin-bottom: 25px;
  }
  .form__input__margin_38 {
    margin-bottom: 90px;
  }
  .form__button {
    width: 290px;
    height: 50px;
    border-radius: 5px;
  }
  .form__link-sign-up {
    display: none;
  }
  .login__footer {
    display: block;
    text-align: center;
    background: #353535;
    width: 100%;
    position: fixed;
    bottom: 0;
  }
  .login__link-sign-up {
    width: 236px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.05em;
    color: #fff;
    padding: 12px;
  }
  .login__link-sign-up a {
    text-decoration: none;
    color: #38b1ac;
  }
}

</style>