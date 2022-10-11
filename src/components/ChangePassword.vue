<script>
    import axios from "axios"

    export default{
        name: 'changepassword',
        
        data(){
            return{
                errors: [],
                message: [],

                oldpassword: '',
                newpassword: '',

                orgDetails: {
                    id: '',
                    emailAddress: '',
                    subOrganisationCode: '',
                    organizationCode: '',
                    firstName: '',
                    lastName: '',
                    middleName: '',
                    gender: '',
                    unit: '',
                },

                role: '',

            }
        },

        async mounted(){
            this.role = localStorage.getItem('role');

            const resul = await axios.get('api/Users/profile', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.orgDetails = resul.data.result;

            
        },

        methods: {
            async changePass(){
                this.errors = [];
                this.message = [];

                

                if (!this.newpassword) {
                    this.errors.push("Field required.");
                }
                
                const response = await axios.put('api/UserAccount/changepassword', {
                    accountid: this.orgDetails.id,
                    oldpassword: this.oldpassword,
                    newpassword: this.newpassword,
                    
                }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },);
                

                if (response) {
                    
                    this.message.push(response.data.message);
                    
                    this.oldpassword = "";
                    this.newpassword = "";

                }else{
                    this.errors.push("Incorrect Parameter");
                }
  
            }
        },

        
    }
</script>
<template>

  <!-- Begin page -->
  <div id="layout-wrapper">

      
      <!-- Left Sidebar End -->

      <!-- ============================================================== -->
      <!-- Start right Content here -->
      <!-- ============================================================== -->
      <div class="main-content">

          <div class="page-content">
              <div class="container-fluid">

                  <!-- start page title -->
                  <div class="row">
                      <div class="col-12">
                          <div class="page-title-box d-flex align-items-center justify-content-between">
                              <h4 class="mb-0">Change Password <br> <span style="font-size: 14px;font-weight: 500;">{{orgDetails.organizationCode}} //  {{orgDetails.subOrganisationCode}} //</span> <span style="font-size: 14px;font-weight: 500;">{{orgDetails.lastName}} {{orgDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">Change Password</li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
                  <!-- end page title -->

                  
                  <div class="row justify-content-center">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body table-responsive">
                                <div class="alert alert-danger" v-if="errors.length">
                                    <b>Please correct the following error(s):</b>
                                    <ul>
                                        <li v-for="error in errors">{{ error }}</li>
                                    </ul>
                                </div>

                                <div class="alert alert-success" v-if="message.length">
                                    <strong v-for="msg in message">{{ msg }}</strong>
                                </div>
                                <form @submit.prevent="changePass">
                                    <div class="row">

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">Old Password <span class="text-danger">*</span></label>
                                                <input class="form-control" type="password" v-model="oldpassword">
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">New Password <span class="text-danger">*</span></label>
                                                <input class="form-control" type="password" v-model="newpassword">
                                            </div>
                                        </div>

                                    </div>
                                    <button class="btn btn-outline-success mt-4">Change</button>
                                    
                                </form>

                            </div>
                        </div>
                    </div> <!-- end col -->
                </div> <!-- end row -->

              </div> <!-- container-fluid -->
          </div>
          <!-- End Page-content -->

          <footer class="footer">
              <div class="container-fluid">
                  <div class="row">
                      <div class="col-sm-6">
                          BackOffice 0.1 © 2022
                      </div>
                      <div class="col-sm-6">
                          <div class="text-sm-right d-none d-sm-block">
                             Powered by Intelligence
                          </div>
                      </div>
                  </div>
              </div>
          </footer>
      </div>
      <!-- end main content-->

  </div>
  <!-- END layout-wrapper -->

        
  <router-view>

  </router-view>
</template>
<style scoped>

</style>