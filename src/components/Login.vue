<script>
import axios from 'axios'
import { useToast } from "vue-toastification";

export default {
    name: "Login",
    data() {
        return {
            errors: [],
            email: '',
            password: '',

            loading: false,
        }
    },

    methods: {
        handleLoader(){
            this.loading = false;

            if(this.email && this.password){
                setTimeout(()=>{
                    this.loading = true;
                }, 100)
            }else if(!this.email && !this.password){
                this.loading = false;
            }

        },

        async handleSubmit() {
            this.errors = [];

            const toast = useToast()

            if (!this.email) {
                // this.errors.push("Email required.");
                toast.error("Email required.");
               
            }

            if (!this.password) {
                // this.errors.push("Password required.");
                toast.error("Password required");
                
            }else{

                await axios.post("api/UserAccount/authenticate", {
                    email: this.email,
                    password: this.password
                }).then(response => { 
                    if (response.data.status == 200) {
                        // console.log(response);
                        var usertype = response.data.result.details.user;
                        var userrole = response.data.result.details.role;
                        var token = response.data.result.token;

                        localStorage.setItem('token', response.data.result.token);

                        localStorage.setItem('id', response.data.result.details.id);
                        
                        localStorage.setItem('role', response.data.result.details.role);

                        localStorage.setItem('firstname', response.data.result.details.firstname);

                        localStorage.setItem('lastname', response.data.result.details.lastname);

                        this.$store.dispatch("settoken", token);
                        this.$store.dispatch("setuserrole", userrole);
                        this.$store.dispatch("setusertype", usertype);
                        this.$store.dispatch("setIsAuth", true);
                        
                        this.$router.push("/dashboard");


                    }else{
                        toast.error("Invalid User");
                        this.loading = false;
                    }
                })
                .catch(error => {
                    if(error.response.data.status){
                        // console.log("An Error Occured!");
                    }
                    
                });

            }

            // if (response.data.status == 200) {
            //     console.log(response);
            //     var usertype = response.data.result.details.user;
            //     var userrole = response.data.result.details.role;
            //     var token = response.data.result.token;

            //     localStorage.setItem('token', response.data.result.token);
                
            //     localStorage.setItem('role', response.data.result.details.role);

            //     localStorage.setItem('firstname', response.data.result.details.firstname);

            //     localStorage.setItem('lastname', response.data.result.details.lastname);

            //     this.$store.dispatch("settoken", token);
            //     this.$store.dispatch("setuserrole", userrole);
            //     this.$store.dispatch("setusertype", usertype);
            //     this.$store.dispatch("setIsAuth", true);
                
            //     this.$router.push("/dashboard");


            // } else {
            //     toast.error("Invalid User");
            // }
        },
    },
};

</script>
<template>

    <div>
        <div class="p-0">
            <div class="row no-gutters">
                <div class="col-lg-5">
                    <div class="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                        <div class="w-100">
                            <div class="row justify-content-center">
                                <div class="col-lg-9">
                                    <div>
                                        <div class="text-center">
                                            <div class="">
                                                <router-link to="/" class="logo">
                                                    <img src="../assets/fg-ras-logo.png" class="img-fluid" width="180" height="180" alt="">
                                                </router-link>
                                            </div>

                                            <!-- <h4 class="font-size-18 mt-4">Welcome Back !</h4>
                                            <p class="text-muted">Sign in to continue to Revenue Assurance.</p> -->
                                        </div>

                                        <div class="p-2 mt-5">


                                            <div class="alert alert-danger" v-if="errors.length">
                                                <p v-for="error in errors">{{ error}}</p>
                                            </div>
                                            <form @submit.prevent="handleSubmit">
                                                <div class="form-group auth-form-group-custom mb-4">
                                                    <i class="ri-user-2-line auti-custom-input-icon"></i>
                                                    <label for="email">Email Address</label>
                                                    <input type="email" v-model="email" class="form-control" placeholder="Enter Email Address">
                                                </div>

                                                <div class="form-group auth-form-group-custom mb-4">
                                                    <i class="ri-lock-2-line auti-custom-input-icon"></i>
                                                    <label for="userpassword">Password</label>
                                                    <input type="password" v-model="password" class="form-control" placeholder="Enter password">
                                                </div>

                                                <!-- <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="customControlInline">
                                                <label class="custom-control-label" for="customControlInline">Remember me</label>
                                            </div> -->

                                                <div class="mt-4 text-center">
                                                    <button type="submit" @click="handleLoader()" class="btn btn-primary w-md waves-effect waves-light">
                                                        <span v-if="loading" class="spinner-border spinner-border-sm"></span>
                                                        <span v-else>Log In</span>
                                                    </button>
                                                </div>


                                            </form>
                                            <div class="mt-4 text-center">
                                                <router-link to="/reset-password">Forgot password?</router-link>
                                            </div>

                                        </div>

                                        <div class="mt-5 text-center">

                                            <p>?? 2022 Revenue Assurance Project.</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="authentication-bg">
                        <div class="bg-overlay"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <router-view></router-view>
</template>
<style scoped>
</style>