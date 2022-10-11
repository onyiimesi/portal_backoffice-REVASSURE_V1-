<script>
    import axios from "axios"
    import { useToast } from "vue-toastification";

    export default{
        name: "resetpassword",
        data() {
            return {
                errors: [],
                message: [],

                email: '',
                
            }
        },

        methods:{

            async resetPassword() {
                this.errors = [];
                this.message = [];
                const toast = useToast()

                if(!this.email){

                    toast.error("Enter Email Address");

                }else{

                    const response = await axios.put('api/UserAccount/forgotpassword?email='+this.email);

                    if (response) {
                        // console.log(response)
                        this.$router.push("/verify-token");

                        this.email = "";

                    }else{
                        toast.error("Incorrect Parameter");
                    }
                }

            }
        }
    };

</script>
<template>
  
    
  
  <div>
    <div class="p-0">
        <div class="row no-gutters">
            <div class="col-lg-4">
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

                                        <h4 class="font-size-18 mt-4">Reset your password to access your account</h4>
                                    </div>

                                    <div class="p-2 mt-5">
                                        
                                        <div class="alert alert-danger" v-if="errors.length">
                                            <b>Please correct the following error(s):</b>
                                            <ul>
                                                <li v-for="error in errors">{{ error }}</li>
                                            </ul>
                                        </div>

                                        <div class="alert alert-success" v-if="message.length">
                                            <strong v-for="msg in message">{{ msg }}</strong>
                                        </div>
                                        <form @submit.prevent="resetPassword">
                                            <div class="form-group auth-form-group-custom mb-4">
                                                <i class="ri-user-2-line auti-custom-input-icon"></i>
                                                <label for="username">Email Address</label>
                                                <input type="text" v-model="email" class="form-control" placeholder="Enter Email Address">
                                            </div>

                                            <div class="mt-4 text-center">
                                                <button class="btn btn-primary w-md waves-effect waves-light" >Reset</button>
                                            </div>
                                        </form>
                                        
                                    </div>

                                    <div class="mt-5 text-center">
                                        
                                        <p>© 2022 Revenue Assurance Project.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-8">
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