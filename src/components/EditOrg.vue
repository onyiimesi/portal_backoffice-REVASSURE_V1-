<script>
    import axios from "axios"
    import { useToast } from "vue-toastification";

    export default{
        name: 'editorg',
        
        data(){
            return{
                errors: [],
                message: [],

                allorg: {
                    organisationCode: '',
                    organisationName: '',
                    organisationEmail: '',
                    organisationPhoneNumber: '',
                    organisationAddress: '',
                    organisationWebsite: '',
                },

                role: '',

                customerDetails: {

                    emailAddress: '',
                    subOrganisationCode: '',
                    organizationCode: '',
                    firstName: '',
                    lastName: '',
                    middleName: '',
                    gender: '',
                    unit: '',
                },
            
            }
        },

        async mounted(){

            this.role = localStorage.getItem('role');

            const resul = await axios.get('api/Users/profile', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.customerDetails = resul.data.result;

            const result = await axios.get('api/Organisation/details/'+this.$route.params.organisationCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.allorg = result.data.result;
        },

        methods: {
            async editOrg(){

                this.errors = [];
                this.message = [];
                const toast = useToast()


                if (!this.allorg.organisationName) {
                    toast.error("Organisation Name required.");
                }

                if (!this.allorg.organisationEmail) {
                    toast.error("Email Address required.");
                }

                if (!this.allorg.organisationPhoneNumber) {
                    toast.error("Phone Number required.");
                }

                if (!this.allorg.organisationAddress) {
                    toast.error("Office Address required.");
                }

                if (!this.allorg.organisationWebsite) {
                    toast.error("Website required.");
                }
                
                const response = await axios.put('api/Organisation/edit', {
                    organisationCode: this.customerDetails.organizationCode,
                    organisationName: this.allorg.organisationName,
                    emailAddress: this.allorg.organisationEmail,
                    phoneNumber: this.allorg.organisationPhoneNumber,
                    officeAddress: this.allorg.organisationAddress,
                    website: this.allorg.organisationWebsite,
                    
                }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },);
                

                if (response) {
                    
                    toast.success(response.data.message);

                }else{
                    toast.error("Incorrect Parameter");
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
                              <h4 class="mb-0">Edit Organisation <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}}</span> // <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">Edit Organisation</li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
                  <!-- end page title -->

                  
                  <div class="row ssss">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body table-responsive">
                                <div class="alert alert-danger" v-if="errors.length">
                                    <p v-for="error in errors">{{ error }}</p>
                                </div>

                                <div class="alert alert-success" v-if="message.length">
                                    <strong v-for="msg in message">{{ msg }}</strong>
                                </div>
                                <form @submit.prevent="editOrg">
                                    <div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                
                                                <input class="form-control" type="hidden" v-model="customerDetails.organizationCode">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Organisation Name</label>
                                                <input class="form-control" type="text" v-model="allorg.organisationName">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Email Address</label>
                                                <input class="form-control" type="text" v-model="allorg.organisationEmail">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Phone Number</label>
                                                <input class="form-control" type="text" v-model="allorg.organisationPhoneNumber">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Office Address</label>
                                                <input class="form-control" type="text" v-model="allorg.organisationAddress">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Website</label>
                                                <input class="form-control" type="text" v-model="allorg.organisationWebsite">
                                            </div>
                                        </div>

                                    </div>
                                    <button class="btn btn-outline-success mt-4">Edit</button>
                                    
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
<style>
    
</style>