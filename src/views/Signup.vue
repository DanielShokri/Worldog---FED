<template>
  <div class="page-wrapper bg-red p-t-180 p-b-100 font-robo">
    <div class="wrapper wrapper--w960">
      <div class="card card-2">
        <div class="card-heading"></div>
        <div class="card-body">
          <h2 class="title">Registration</h2>
          <form>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="name"
                  :counter="10"
                  :rules="nameRules"
                  label="Username"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  :type="show3 ? 'text' : 'password'"
                  name="input-10-2"
                  label="Password"
                  class="input-group--focused"
                ></v-text-field>
              </v-flex>

              <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

              <v-btn color="warning" @click="resetValidation">Register</v-btn>
            </v-form>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- <form action class="container">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Sign Up</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Username">
          <b-input type="text" placeholder="Your user name" required></b-input>
        </b-field>

        <b-field label="Password">
          <b-input
            type="password"
            
            password-reveal
            placeholder="Your password"
            required
          ></b-input>
        </b-field>

        
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary">Register</button>
      </footer>
    </div>
  </form>-->
</template>

<style scoped>
@import "../../public/css/main.css";
</style>