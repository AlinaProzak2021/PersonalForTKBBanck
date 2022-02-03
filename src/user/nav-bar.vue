<template>
  <div class="nav-bar">
    <div class="nav-bar__content">
      <div class="nav-bar__logo-tkb">
        <img src="./../../resources/image/tkb-image.png" alt="" />
      </div>
      <div v-if="isCurrentUser" class="nav-bar__user-logo">
        <div class="nav-bar__user-logo__user">
          <router-link to="/userProfile">
            <img src="./../../resources/image/user (1).png" />
          </router-link>
        </div>
        <div class="nav-bar__user-logo__purchases">
           <router-link to="/links">
          <img src="./../../resources/image/shopping-bag(2) 1.png" alt="" />
           </router-link>
        </div>
        <div class="nav-bar__user-logo__log-out" @click="signOut()">
          <img src="./../../resources/image/logout (1).png" alt="" />
        </div>
      </div>
      <div v-else class="nav-bar__user-logo nav-ber_user-logo__sign-in-out">
        <div class="nav-bar__user-logo__user">
          <router-link to="/signup">
            <img src="./../../resources/image/user (1).png" />
          </router-link>
        </div>
        <div class="nav-bar__user-logo__user-sign-in">
          <router-link to="/signIn">
            <img src="./../../resources/image/enter 2.png" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["currentUser"]),
    isCurrentUser() {
      if (this.currentUser.token) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapMutations(["setUserToken", "setCurrentUser"]),
    signOut() {
      this.setUserToken({});
      this.setCurrentUser({});
      this.$router.push("/signIn");
    },
  },
};
</script>
<style>
.nav-bar {
  height: 60px;
  width: 100%;
  background: #ffffff;
  position: absolute;
  top: 0;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);
}
.nav-bar__content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
.nav-bar__logo-tkb {
  /* width: 90px; */
  /* height: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 40px;
}
.nav-bar__logo-tkb img {
  width: 100%;
  height: 53px;
}
.nav-bar__user-logo {
  width: 130px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 60px;
}
.nav-ber_user-logo__sign-in-out {
  width: 85px;
  height: 100%;
}
.nav-bar__user-logo__user img,
.nav-bar__user-logo__purchases img {
  width: 30px;
  height: 30px;
}
.nav-bar__user-logo__purchases {
}
@media (max-width: 765px) {
  .nav-bar {
    height: 106px;
    width: 100%;
    background: none;
    box-shadow: none;
  }
  .nav-bar__logo-tkb {
    width: 250px;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 0;
  }
  .nav-bar__logo-tkb img {
    width: 100%;
    height: 106px;
  }
  .nav-bar__user-logo {
    display: none;
  }
}
</style>