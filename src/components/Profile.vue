<script>
    import axios from "axios"
    import { useToast } from "vue-toastification";

    export default{
        name: 'profile',
        
        data(){
            return{
                errors: [],
                message: [],

                allorg: [],

                allsub: [],

                customerDetails: {
                    id: '',
                    emailAddress: '',
                    subOrganisationCode: '',
                    organizationCode: '',
                    firstName: '',
                    lastName: '',
                    middleName: '',
                    gender: '',
                },
                role: '',   
                
            }
        },

        async mounted(){
            this.role = localStorage.getItem('role');

            const result = await axios.get('api/Users/profile', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.customerDetails = result.data.result;

            const results = await axios.get('api/Organisation/organizations', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.allorg = results.data.result;

        },

        methods: {

            async onChange(event) {

                const response = await axios.get('api/SubOrganisation/suborganizations/'+event.target.value,{
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },);

                const resp = await axios.get('api/Item/organizations/'+event.target.value, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },);

                this.allsub = response.data.result;

                this.allitem = resp.data.result;
            },

            async editProfile(){

                const toast = useToast()
        
                const response = await axios.put('api/Users/editprofile', {
                    id: this.customerDetails.id,
                    emailAddress: this.customerDetails.emailAddress,
                    subOrganisationCode: this.customerDetails.subOrganisationCode,
                    organizationCode: this.customerDetails.organizationCode,
                    firstName: this.customerDetails.firstName,
                    lastName: this.customerDetails.lastName,
                    middleName: this.customerDetails.middleName,
                    gender: this.customerDetails.gender,

                    
                }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },);

                if(response) {

                    toast.success(response.data.message);

                }else{
                    toast.error("Incorrect Parameter");
                }

            }
        }
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
                              <h4 class="mb-0">Profile <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} //</span> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">Profile</li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
                  <!-- end page title -->

                  
                  <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">

                                <div class="alert alert-danger" v-if="errors.length">
                                    <b>Please correct the following error(s):</b>
                                    <ul>
                                        <li v-for="error in errors">{{ error }}</li>
                                    </ul>
                                </div>

                                <div class="alert alert-success" v-if="message.length">
                                    <strong v-for="msg in message">{{ msg }}</strong>
                                </div>

                                <form @submit.prevent="editProfile">
                                    <div class="row">
                                        <input class="form-control" readonly type="hidden" v-model="customerDetails.id">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Organization</label>
                                                <input class="form-control" readonly type="text" v-model="customerDetails.organizationCode">
                                            </div>
                                        </div>

                                        
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Sub-Organization</label>
                                                <input class="form-control" readonly type="text" v-model="customerDetails.subOrganisationCode">
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">First Name</label>
                                                <input class="form-control" type="text" v-model="customerDetails.firstName">
                                            </div>
                                        </div>



                                      <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Last Name</label>
                                                <input class="form-control" type="text" v-model="customerDetails.lastName">
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Middle Name</label>
                                                <input class="form-control" type="text" v-model="customerDetails.middleName">
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Email Address</label>
                                                <input class="form-control" readonly type="text" v-model="customerDetails.emailAddress">
                                                
                                            </div>
                                        </div>


                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Gender</label>
                                                <input class="form-control" type="text" v-model="customerDetails.gender">
                                            </div>
                                        </div>
                                        
                                    </div>

                                    <button class="btn btn-success mr-4 float-left">Edit Profile</button> 
                                </form>
                            </div>
                        </div>
                        <!-- end select2 -->

                    </div>


                </div>
                <!-- end row -->

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