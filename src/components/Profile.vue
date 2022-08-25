<script>
    import axios from "axios"

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
                
            }
        },

        async mounted(){

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

                console.log(response)

                if(response) {

                    this.message.push(response.data.message);

                }else{
                    this.errors.push("Incorrect Parameter");
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
                              <h4 class="mb-0">Profile</h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
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
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">Email Address</label>
                                                <input class="form-control" readonly type="text" v-model="customerDetails.emailAddress">
                                                
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">Organisation Code</label>
                                                <select v-model="customerDetails.organizationCode" @change="onChange($event)" class="form-control">
                                                    <option>{{customerDetails.organizationCode}}</option>
                                                    <option v-for="org in allorg" :value="org.organisationCode">{{org.organisationCode}}</option>
                                                    
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">Sub-Organisation Code</label>
                                                <select v-model="customerDetails.subOrganisationCode" class="form-control" id="">
                                                    <option>{{customerDetails.subOrganisationCode}}</option>
                                                    <option v-for="sub in allsub" :value="sub.subOrganisationCode">{{sub.subOrganisationCode}}</option>
                                                    
                                                </select>
                                            
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">First Name</label>
                                                <input class="form-control" type="text" v-model="customerDetails.firstName">
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">

                                      <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">Last Name</label>
                                                <input class="form-control" type="text" v-model="customerDetails.lastName">
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">Middle Name</label>
                                                <input class="form-control" type="text" v-model="customerDetails.middleName">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">

                                      <div class="col-md-6">
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