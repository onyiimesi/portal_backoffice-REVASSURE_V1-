<script>

    export default{
        name: "Login",
        data() {
            return {
                username: '',
                password: ''
            }
        },

        methods:{
            login() {
                
            }
        }
    };

</script>
<template>
  
    
  <div class="home-btn d-none d-sm-block">
      <router-link to="/"><i class="mdi mdi-home-variant h2 text-white"></i></router-link>
  </div>
  <div>
    <div class="container-fluid p-0">
        <div class="row no-gutters">
            <div class="col-lg-4">
                <div class="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                    <div class="w-100">
                        <div class="row justify-content-center">
                            <div class="col-lg-9">
                                <div>
                                    <div class="text-center">
                                        <div>
                                            <router-link to="/" class="logo"><img src="/frontend/assets/images/lo.jpg" class="img-fluid" width="180" height="180" alt=""></router-link>
                                        </div>

                                        <h4 class="font-size-18 mt-4">Reset your password to access your account</h4>
                                    </div>

                                    <div class="p-2 mt-5">
                                        
            
                                        <div class="form-group auth-form-group-custom mb-4">
                                            <i class="ri-user-2-line auti-custom-input-icon"></i>
                                            <label for="username">Email Address</label>
                                            <input type="text" v-model="email" class="form-control" placeholder="Enter Email Address">
                                        </div>

                                        <div class="mt-4 text-center">
                                            <router-link to="/dashboard"><button class="btn btn-primary w-md waves-effect waves-light" >Reset</button></router-link>
                                        </div>
                                        
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