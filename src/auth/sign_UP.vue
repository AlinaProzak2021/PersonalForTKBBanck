<template>
  <div class="registration">
    <form class="registration-form">
      <div class="registration-form__title">Регистрация</div>
      <div class="registration-form_line-process">
        <div class="registration-form_line-process_process">
          <div class="registration-form_line-process_circle"></div>
          <div class="registration-form_line-process_line"></div>
          <div
            class="registration-form_line-process_circle"
            :class="{
              registration_cange_state: currentState === regStates.state1,
            }"
          ></div>
        </div>
        <div class="registration-form_line-process_step-name">
          <div class="registration-form_line-process-step-name_p">
            <p>Введите номер карты</p>
          </div>
          <div class="registration-form_line-process-step-name_p">
            Придумайте логин и пароль
          </div>
        </div>
      </div>
      <div
        v-show="currentState === regStates.state1"
        class="registration-form__content__first-step"
      >
        <label class="registration-form__kind-data">
          <p>Введите 16-значный номер карты</p>
          <input
            type="text"
            class="registration-form__input"
            v-model="cardNumber"
          />
        </label>
        <label class="registration-form__kind-data">
          <p>Введите ваше Ф.И.О.</p>
          <input
            type="text"
            class="registration-form__input"
            v-model="fullname"
          />
        </label>
        <p class="registration-form__link-to-sign-in">
          У меня есть аккаунт
          <a @click="$router.push('/signIn')" href="#">Войти</a>
        </p>
        <div class="registration-form__buttons">
          <button
            @click.prevent="currentState = regStates.state2"
            class="registration-form__button-next"
          >
            Далее
          </button>
          <button @click="$router.push('/signin')" class="registration-form__button-cancel">Отменить</button>
        </div>
      </div>

      <div
        v-show="currentState === regStates.state2"
        class="registration-form__content__second-step"
      >
        <input
          class="registration-form__input"
          type="text"
          placeholder="Придумайте логин"
          v-model="login"
        />
        <input
          class="registration-form__input"
          type="password"
          placeholder="Придумайте пароль"
          v-model="password"
        />
        <input
          class="registration-form__input"
          type="password"
          placeholder="Повторите пароль"
          v-model="password"
        />
        <input
          class="registration-form__input"
          type="email"
          placeholder="Email"
          v-model="email"
        />
        <div class="registration-form__buttons">
          <button
            @click.prevent="(currentState = regStates.state3), signUP()"
            class="registration-form__button-next next"
          >
            Далее
          </button>
          <button
            class="registration-form__button-cancel cancel"
            @click="currentState = regStates.state1"
          >
            Отменить
          </button>
          <div class="registration-form__second-step-link-to-sign-in">
            У меня есть аккаунт
            <a @click="this.$router.push('/signIn')" href="#">Войти</a>
          </div>
        </div>
      </div>

      <div
        v-show="currentState === regStates.state3"
        class="registration-form__content__three-step"
      >
        <div class="registration-form__content__three-step-imge">
          <img src="./../../resources/image/success.png" alt="" />
        </div>
        <div class="registration-form__content__three-step_p">
          <p>Поздравляем с успешной регистрацией!</p>
        </div>
        <button
          class="registration-form__content__three-step_button"
          @click="$router.push('/signIn')"
        >
          Войти в интернет-банк
        </button>
        <div class="registration-form__content__three-footer"></div>
      </div>
    </form>
  </div>
</template>

<script>
 
// import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  name: 'reg',
  components:{
 
  },
  data() {
    return {
      regStates: {
        state1: 'state1',
        state2: 'state2',
        state3: 'state3',
      },
      currentState: '',
      fullname: [],
      firstName: '',
      lastName: '',
      surname: '',
      login: '',
      password: '',
      cardNumber: '',
      email: '',
    };
  },
  created() {
    this.currentState = this.regStates.state1;
  },
  methods: {
    // ...mapMutations(['setCurrentUser', 'setUsername', 'setCardNumber']),

    splitFullNmae() {
      this.lastName = this.fullname.split(' ').slice(0, 1).join(' ');
      this.firstName = this.fullname.split(' ').slice(1, 2).join(' ');
      this.surname = this.fullname.split(' ').slice(2, 3).join(' ');
      console.log('Имя - ' + this.firstName);
      console.log('Фамилия - ' + this.lastName);
      console.log('Отчество - ' + this.surname);
    },
    signUP() {
      this.splitFullNmae();
      console.log(this.firstName);
      console.log(this.surname);
      console.log(this.lastName);
      console.log(this.password);
      console.log(this.email);
      console.log(this.login);
      console.log(this.cardNumber);

      fetch('https://lkbank.bonch-ikt.ru/api/signup', {
        method: 'POST',
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          surname: this.surname,
          email: this.email,
          cardNumber: this.cardNumber,
          login: this.login,
          password: this.password 
        }),
      })
       .then(response => {
        if (response.status === 200) {
          response.json().then(data => {
                console.log(data)
          })
        }
      })
    },
  },
};
</script>
<style>
.registration {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('./../../resources/image/image (4).png');
  background-repeat: repeat;
}

.registration-form {
  width: 490px;
  background: #ffffff;
  border: 1px solid #949494;
  box-sizing: border-box;
  border-radius: 10px;
}
.registration-form__title {
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 35px;
  letter-spacing: 0.1em;
  color: #353535;
  text-align: center;
  padding: 35px;
  margin-bottom: 35px;
}

.registration-form_line-process {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.registration-form_line-process_process {
  width: 332px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
}
.registration-form_line-process_circle {
  width: 20px;
  height: 20px;
  background: #38b1ac;
  border-radius: 50px;
}
.registration_cange_state {
  background: #ffffff;
  border: 2px solid #38b1ac;
  width: 16px;
  height: 16px;
}
.registration-form_line-process_line {
  width: 390px;
  height: 5px;
  background: #38b1ac;
}
.registration-form_line-process_step-name {
  display: flex;
  width: 85%;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 35px;
}
/* @font-face {
    font-family: 'Roboto';
    src: url('C:/Users/Алина/Desktop/Fonts/Roboto');
  } */
.registration-form_line-process-step-name_p {
  width: 106px;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.05em;

  color: #353535;
}
.registration-form_line-process-step-name_p:last-child {
  width: 126px;
}
.registration-form__kind-data {
  display: flex;
  flex-direction: column;
}
.registration-form__kind-data p {
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.05em;
  color: #353535;
  width: 80%;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 10px;
  text-align: left;
}
.registration-form__input {
  width: 425px;
  height: 50px;
  background: #ffffff;
  border: 1px solid #38b1ac;
  box-sizing: border-box;
  border-radius: 10px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 20px;
  font-size: 20px;
  padding-left: 30px;
}
.registration-form__input::placeholder {
  color: #868c9d;
}
.registration-form__link-to-sign-in {
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 20px;
  letter-spacing: 0.05em;
  color: #353535;
  padding-bottom: 38px;
  padding-top: 20px;
}
.registration-form__buttons {
  display: flex;
  width: 450px;
  margin-right: auto;
  margin-left: auto;
  justify-content: space-around;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.registration-form__button-next,
.registration-form__button-cancel {
  width: 180px;
  height: 40px;
  border-radius: 10px;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.1em;
  border: none;
}
.registration-form__button-next {
  background: #38b1ac;
  color: white;
}
.registration-form__button-cancel {
  color: #353535;
  background: white;
  border: 2px solid #38b1ac;
}
.registration-form__content__second-step,
.registration-form__content__first-step {
  display: flex;
  flex-direction: column;
}

.registration-form__content__second-step > .registration-form__input {
  width: 425px;
  height: 60px;
  background: #f2f6f9;
  border: 1px solid #38b1ac;
  margin-right: auto;
  margin-left: auto;
}
.registration-form__content__second-step > .registration-form__buttons {
  padding-top: 20px;
  width: 450px;
}
.next,
.cancel {
  width: 200px;
  height: 40px;
}
.registration-form__content__three-step-imge {
  width: 100%;
  height: 175px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
}

.registration-form__content__three-step-imge img {
  width: 175px;
  height: 100%;
}
.registration-form__content__three-step_p {
  color: #353535;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  text-align: center;
  margin-bottom: 66px;
}
.registration-form__content__three-step_button {
  width: 385px;
  height: 60px;
  border-radius: 10px;
  background: #ffffff;
  border: 2px solid #38b1ac;
  margin-left: auto;
  margin-right: auto;
  font-size: 25px;
  line-height: 29px;
  letter-spacing: 0.1em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 80px;
}
.registration-form__second-step-link-to-sign-in {
  display: none;
}
.registration-form__content__three-footer {
  display: none;
}
.registration-form__link-to-sign-in a{
  text-decoration: none;
  color: #38b1ac;;
}

@media (max-width: 765px) {
  .registration-form {
    width: 100%;
    border: none;
    background: none;
  }
  .registration-form__title {
    font-weight: bold;
    font-size: 25px;
    line-height: 29px;
    color: #353535;
    padding: 40px;
    margin-bottom: 0;
  }
  .registration-form_line-process_process {
    width: 260px;
    margin-bottom: 10px;
  }
  .registration-form_line-process_circle {
    width: 12px;
    height: 12px;
  }
  .registration-form_line-process_line {
    width: 225px;
    height: 5px;
    background: #38b1ac;
  }
  .registration_cange_state {
    background: #ffffff;
    border: 2px solid #38b1ac;
    width: 8px;
    height: 8px;
  }
  .registration-form_line-process_step-name {
    width: 85%;
    margin-bottom: 25px;
  }
  .registration-form_line-process-step-name_p {
    width: 66px;
    font-size: 10px;
    line-height: 12px;
    color: #353535;
  }
  .registration-form_line-process-step-name_p:last-child {
    width: 80px;
  }
  .registration-form__kind-data p {
    width: 290px;
    font-size: 16px;
    line-height: 21px;
    margin-bottom: 10px;
  }
  .registration-form__kind-data:nth-child(even) {
    margin-bottom: 40px;
  }
  .registration-form__input {
    width: 290px;
    height: 50px;
  }
  .registration-form__link-to-sign-in {
    order: 2;
    background: #353535;
    color: white;
    padding: 20px;
    bottom: 0;
    position: fixed;
    width: 100%;
  }
  .registration-form__buttons {
    width: 290px;
    order: 1;
    margin-bottom: 40px;
  }
  .registration-form__button-next,
  .registration-form__button-cancel {
    width: 290px;
    height: 50px;
    font-size: 20px;
    border: none;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
  }
  .registration-form__button-cancel {
    color: #353535;
    background: white;
    border: 2px solid #38b1ac;
  }
  .registration-form__content__second-step > .registration-form__input {
    width: 290px;
    height: 50px;
    margin-bottom: 11px;
    font-size: 16px;
    line-height: 19px;
  }
  .registration-form__content__second-step > .registration-form__buttons {
    padding-top: 20px;
    width: 290px;
  }

  .registration-form__second-step-link-to-sign-in {
    display: block;
    background: #353535;
    color: white;
    padding: 20px;
    bottom: 0;
    position: fixed;
    width: 100%;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;
  }
  .registration-form__content__three-step-imge {
    width: 150px;
    height: 150px;
    margin-left: auto;
    margin-right: auto;
  }
  .registration-form__content__three-step-imge img {
    width: 100%;
    height: 100%;
  }
  .registration-form__content__three-step_p {
    font-size: 18px;
    margin-left: auto;
    margin-right: auto;
    width: 245px;
    margin-bottom: 40px;
  }
  .registration-form__content__three-step_button {
    width: 290px;
    height: 50px;
    font-size: 18px;
  }
  .registration-form__content__three-footer {
    background: #353535;
    bottom: 0;
    position: fixed;
    width: 100%;
    height: 60px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>