<template>
  <q-page padding>
    <!-- content -->
    <div class="q-pa-md" style="max-width: 400px">
      <h4>New User Form</h4>
      <q-form @submit="onSubmit" @reset="onReset">
        <q-input
          v-model="firstName"
          label="First Name"
          lazy-rules
          :rules="[notEmpty, moreThan3]"
        />
        <q-input v-model="middleName" label="Middle Name" />
        <q-input v-model="lastName" label="Last Name" />

        <q-separator class="q-mb-lg" />

        <div class="q-gutter-sm q-mb-md">
          <q-radio v-model="gender" val="0" label="Male" />
          <q-radio v-model="gender" val="1" label="Female" />
          <q-radio v-model="gender" val="2" label="Trans-gender" />
        </div>
        <q-input
          filled
          v-model="dateOfBirth"
          label="Date of birth"
          mask="date"
          hint="YYYY/MM/DD"
          :rules="[notEmpty]"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="dateOfBirth"
                  @input="() => $refs.qDateProxy.hide()"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-separator class="q-mb-lg" />
        <q-input v-model="mobile" label="Mobile" :rules="[notEmpty]" />
        <q-input v-model="email" label="Email" />

        <q-toggle
          v-model="accept"
          label="I accept the license and terms"
          class="q-my-lg"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "0",
      dateOfBirth: "",
      email: "",
      mobile: "",
      accept: false
    };
  },
  methods: {
    notEmpty: function(val) {
      if (val && val.length > 0) {
        return true;
      } else return "Value cannot be null";
    },
    moreThan3: function(val) {
      if (val && val.length > 3) {
        return true;
      } else return "Please type more than 3 characters";
    },
    onSubmit: function() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first"
        });
      } else {
        const dob = new Date(this.dateOfBirth);
        dob.setMinutes(dob.getMinutes() - dob.getTimezoneOffset());
        const user = {
          firstName: this.firstName,
          middleName: this.middleName,
          lastName: this.lastName,
          mobile: this.mobile,
          email: this.email,
          dateOfBirth: dob.toJSON(),
          gender: Number.parseInt(this.gender)
        };

        this.$axios({
          url: "api/people",
          method: "post",
          data: user,
          headers: {
            "Content-Type": "application/json"
          }
        });
        // eslint-disable-next-line no-console
        console.log("Values subbmitted");
        this.$q.notify({
          color: "green-5",
          textColor: "white",
          icon: "warning",
          message: "User created"
        });
      }
    },
    onReset: function() {
      this.firstName = "";
      this.middleName = "";
      this.lastName = "";
      this.gender = "0";
      this.dateOfBirth = "";
      this.email = "";
      this.mobile = "";
      this.accept = false;
    }
  }
};
</script>
