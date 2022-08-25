<script>
    import axios from 'axios'

    export default{
        name: 'setupusers',

        data(){
            return{
                errors: [],
                message: [],
                allroles: [],
                allsub: [],

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

            const resul = await axios.get('api/Users/profile', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.customerDetails = resul.data.result;


            const resu = await axios.get('api/Item/organizations/'+this.customerDetails.organizationCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.allitems = resu.data.result;


            const result = await axios.get('api/roles/allroles', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.allroles = result.data.result;
        },

        methods: {

            async onChange(event) {

                const response = await axios.get('api/SubOrganisation/suborganizations/'+event.target.value,{
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },);

                this.allsub = response.data.result;
            },

            async handleUser(){
                this.errors = [];
                this.message = [];

                
                
                // if (!this.emailAddress) {
                //     this.errors.push("Email Address required.");
                // }

                // if (!this.subOrganisationCode) {
                //     this.errors.push("Sub-Organisation Code required.");
                // }

                // if (!this.organizationCode) {
                //     this.errors.push("Organisation Code required.");
                // }

                // if (!this.unit) {
                //     this.errors.push("Unit required.");
                // }

                // if (!this.firstName) {
                //     this.errors.push("Firstname required.");
                // }

                // if (!this.lastName) {
                //     this.errors.push("Lastname required.");
                // }

                // if (!this.middleName) {
                //     this.errors.push("Middlename required.");
                // }

                // if (!this.gender) {
                //     this.errors.push("Gender required.");
                // }

                // if (!this.password) {
                //     this.errors.push("Password required.");
                // }

                // if (!this.role) {
                //     this.errors.push("Role required.");
                // }
                
                
                
                const response = await axios.post('api/Users/adduser', {
                    emailAddress: this.emailAddress,
                    subOrganisationCode: this.customerDetails.subOrganisationCode,
                    organizationCode: this.customerDetails.organizationCode,
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
                    // console.log(response);
                    this.message.push(response.data.message);

                    this.emailAddress = "";
                    this.subOrganisationCode = "";
                    this.organizationCode = "";
                    this.unit = "";
                    this.firstName = "";
                    this.lastName = "";
                    this.middleName = "";
                    this.gender = "";
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
                              <h4 class="mb-0">Setup Users</h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">Setup Users</li>
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
                                <router-link to="/view-users"><button class="btn btn-success">View Users</button></router-link>
                            </div>
                        </div>
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
                                <form @submit.prevent="handleUser">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Email Address</label>
                                                <input class="form-control" type="text" v-model="emailAddress">
                                            </div>
                                        </div>

                                        <div>
                                            <div>
                                                <!-- <label class="control-label">Organization Code</label> -->
                                                <input class="form-control" type="hidden" v-model="customerDetails.organizationCode" readonly @change="onChange($event)">

                                                <!-- <select v-model="organizationCode" @change="onChange($event)" class="form-control">
                                                    <option>Choose</option>
                                                    <option :value="customerDetails.organizationCode">{{customerDetails.organizationCode}}</option>
                                                    
                                                </select> -->
                                            </div>
                                        </div>

                                        <div>
                                            <div>
                                                <!-- <label class="control-label">Sub-Organization Code</label> -->
                                                <input class="form-control" type="hidden" v-model="customerDetails.subOrganisationCode" readonly>

                                                <!-- <select v-model="subOrganisationCode" class="form-control" id="">
                                                    <option>Choose</option>
                                                    <option v-for="sub in allsub" :value="sub.subOrganisationCode">{{sub.subOrganisationCode}}</option>
                                                    
                                                </select> -->
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Unit</label>
                                                <input class="form-control" type="text" v-model="unit">
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">First Name</label>
                                                <input class="form-control" type="text" v-model="firstName">
                                            </div>
                                        </div>
                                    
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Last Name</label>
                                                <input class="form-control" type="text" v-model="lastName">
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Middle Name</label>
                                                <input class="form-control" type="text" v-model="middleName">
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Gender</label>
                                                <select v-model="gender" class="form-control" id="">
                                                    <option>Choose</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Password</label>
                                                <input class="form-control" type="password" v-model="password">
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Role</label>
                                                
                                                <select v-model="role" class="form-control" id="">
                                                    <option>Choose</option>
                                                    <option v-for="item in allroles" :key="item.rolCode" :value="item.rolCode">{{item.rolName}}</option>
                                                    
                                                </select>
                                            </div>
                                        </div>

                                        <!-- <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Role</label>
                                                
                                                <select v-model="role"  class="form-control" id="">
                                                    <option>Choose</option>
                                                    <option value="PortalAdmin">Portal Admin</option>
                                                    <option value="OrgAdmin">Org Admin</option>
                                                    <option value="AssementOfficer">Assement Officer</option>
                                                    <option value="AccountAdmin">Account Admin</option>
                                                    <option value="Management">Management</option>
                                                </select>
                                            </div>
                                        </div> -->

                                    
                                        <!-- <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Phone Number</label>
                                                <input class="form-control" type="text" placeholder="Phone Number" id="example-text-input">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Email Address</label>
                                                <input class="form-control" type="text" placeholder="Email Address" id="example-text-input">
                                            </div>
                                        </div> -->

                                    </div>
                                    <button class="btn btn-success mr-4 float-left">Save</button> 
                                </form>
                                <!-- <button class="btn btn-primary float-left">Cancel</button> -->

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