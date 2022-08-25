<script>

    import axios from 'axios'

    export default{
        name: 'setuporganization',

        data(){
            return{
                errors: [],
                message: [],
                organisationCode: '',
                organisationName: '',

                emailAddress: '',
                subOrganisationCode: '',
                organizationCode: '',
                unit: '',
                firstName: '',
                lastName: '',
                middleName: '',
                gender: '',
                password: '',
                role: '',
            }
        },  

        methods: {
            async handleOrg(){
                this.errors = [];
                this.message = [];

                
                
                if (!this.organisationCode) {
                    this.errors.push("Organisation Code required.");
                }

                if (!this.organisationName) {
                    this.errors.push("Organisation Name required.");
                }

                if (!this.emailAddress) {
                    this.errors.push("Email Address required.");
                }

                if (!this.organizationCode) {
                    this.errors.push("Organisation Code required.");
                }

                if (!this.firstName) {
                    this.errors.push("Firstname required.");
                }

                if (!this.lastName) {
                    this.errors.push("Lastname required.");
                }

                if (!this.password) {
                    this.errors.push("Password required.");
                }

                if (!this.role) {
                    this.errors.push("Role required.");
                }
                
                
                
                const response = await axios.post('api/Organisation/addorganization', {
                    organisationCode: this.organisationCode,
                    organisationName: this.organisationName
                    
                }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },);

                const resp = await axios.post('api/Users/adduser', {
                    emailAddress: this.emailAddress,
                    subOrganisationCode: this.subOrganisationCode,
                    organizationCode: this.organizationCode,
                    unit: this.unit,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    middleName: this.middleName,
                    gender: this.gender,
                    password: this.password,
                    role: this.role,
                    
                }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },);
                

                if (response) {
                    console.log(response);
                    this.message.push(response.data.message);

                    this.organisationCode = "";
                    this.organisationName = "";

                    this.emailAddress = "";
                    this.organizationCode = "";
                    this.firstName = "";
                    this.lastName = "";
                    this.password = "";
                    this.role = "";
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
                              <h4 class="mb-0">Setup Organization</h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">Setup Organization</li>
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

                                <h4 class="card-title">Setup Organization</h4>

                                <div class="alert alert-danger" v-if="errors.length">
                                    <b>Please correct the following error(s):</b>
                                    <ul>
                                        <li v-for="error in errors">{{ error }}</li>
                                    </ul>
                                </div>

                                <div class="alert alert-success" v-if="message.length">
                                    <strong v-for="msg in message">{{ msg }}</strong>
                                </div>
                                <form @submit.prevent="handleOrg">
                                    <div class="row mt-4">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">Organization Code</label>
                                                <input class="form-control" type="text" v-model="organisationCode">
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">Organization Name</label>
                                                <input class="form-control" type="text" v-model="organisationName">
                                            </div>
                                        </div>
                                    
                                    </div><hr>
                                    
                                    <div>
                                        <h4 class="card-title">Setup Org Admin</h4>
                                    </div>
                                    <div class="row mt-3">
                                       <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">First Name</label>
                                                <input class="form-control" type="text" v-model="firstName">
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Last Name</label>
                                                <input class="form-control" type="text" v-model="lastName">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Email Address</label>
                                                <input class="form-control" type="text" v-model="emailAddress">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                       <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Organization Code</label>
                                                <input class="form-control" type="text" v-model="organizationCode">
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Role</label>
                                                <input class="form-control" type="text" v-model="role">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Password</label>
                                                <input class="form-control" type="password" v-model="password">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <!-- <label class="control-label">Unit</label> -->
                                                <input class="form-control" type="hidden" v-model="unit">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <!-- <label class="control-label">Middle Name</label> -->
                                                <input class="form-control" type="hidden" v-model="middleName">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <!-- <label class="control-label">Gender</label> -->
                                                <select v-model="gender" class="form-control" style="display: none;">
                                                    <option>Choose</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <!-- <label class="control-label">Sub-Organization Code</label> -->
                                                <input class="form-control" type="hidden" v-model="subOrganisationCode">
                                            </div>
                                        </div>
                                    </div>
                                    <button class="btn btn-success mr-4 float-left">Save</button>
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