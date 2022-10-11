<script>

    import axios from "axios"

    export default{
        name: "passwordreset",
        data() {
            return {
                errors: [],
                message: [],

                newpassword: '',
                tokenid: '',
                
            }
        },

        created(){
            this.tokenid = localStorage.getItem('tokenid');

            console.log(this.tokenid)
        },  

        methods:{

            async resetPassword() {
                this.errors = [];
                this.message = [];

                

                const response = await axios.put('api/UserAccount/resetpassword', {
                    accountid: this.tokenid,
                    newpassword: this.newpassword,
                    
                });

                if (response) {
                    // console.log(response)
                    this.message.push(response.data.message);

                    this.newpassword = "";

                }else{
                    this.errors.push("Incorrect Parameter");
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

                                        <h4 class="font-size-18 mt-4">Enter a new password</h4>
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
                                                <label for="username">New Password</label>
                                                <input type="password" v-model="newpassword" class="form-control" placeholder="Enter New Password">
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