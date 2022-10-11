<script>
    import axios from 'axios';
    import { useToast } from "vue-toastification";
    import useValidate  from '@vuelidate/core'
    import { required, sameAs  } from '@vuelidate/validators'

    export default{
        name: 'setupusers',

        data(){
            return{
                v$: useValidate(),
                errors: [],
                error: false,
                message: [],
                allroles: [],
                allsub: [],
                allsuborg: [],

                emailAddress: '',
                subOrganisationCode: '',
                organizationCode: '',
                unit: '',
                firstName: '',
                lastName: '',
                middleName: '',
                gender: '',
                password: '',
                confirmPassword: '',
                role: '',

                roles: '',

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

        validations () {
            return {
                password: {
                    required,
 
                },
                confirmPassword: { required, sameAsPassword: sameAs(this.password) }
            }
        },
        
        async mounted(){

            this.roles = localStorage.getItem('role');

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

            const results = await axios.get('api/SubOrganisation/suborganizations/'+this.customerDetails.organizationCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.allsuborg = results.data.result;
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
                const toast = useToast()

                if (!this.emailAddress) {
                    toast.error("Email Address required.");
                }

                if (!this.subOrganisationCode) {
                    toast.error("Sub-Organisation Code required.");
                }

                if (!this.firstName) {
                    toast.error("Firstname required.");
                }

                if (!this.lastName) {
                    toast.error("Lastname required.");
                }

                if (!this.gender) {
                    toast.error("Gender required.");
                }

                if (!this.role) {
                    toast.error("Role required.");
                }

                this.v$.$validate()
                if (!this.v$.$error) {
                   
                    const response = await axios.post('api/Users/adduser', {
                    emailAddress: this.emailAddress,
                    subOrganisationCode: this.subOrganisationCode,
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
                        toast.success(response.data.message);

                        this.emailAddress = "";
                        this.subOrganisationCode = "";
                        this.organizationCode = "";
                        this.firstName = "";
                        this.lastName = "";
                        this.middleName = "";
                        this.gender = "";
                        this.password = "";
                        this.confirmPassword = "";
                        this.role = "";
                    }else{
                        toast.error("Incorrect Parameter");
                    }
                    
                }else {
                    toast.error("Password & Confirm Password Don't Match.");
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
                              <h4 class="mb-0">Create User <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} //</span> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.roles}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">Create User</li>
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
                                    <strong v-for="error in errors">{{ error }}</strong>
                                </div>

                                <div class="alert alert-success" v-if="message.length">
                                    <strong v-for="msg in message">{{ msg }}</strong>
                                </div>
                                <form @submit.prevent="handleUser">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Sub-Organization <span class="text-danger">*</span></label>
                                                <select v-model="subOrganisationCode" class="form-control" id="">

                                                    <option v-for="sub in allsuborg" :value="sub.subOrganisationCode">{{sub.subOrganisationName}}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">First Name <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="firstName" autocomplete="nope">
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Middle Name (optional)</label>
                                                <input class="form-control" type="text" v-model="middleName" autocomplete="nope">
                                            </div>
                                        </div>
                                    
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Last Name <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="lastName" autocomplete="nope">
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Email Address <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="emailAddress" autocomplete="nope">
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Gender <span class="text-danger">*</span></label>
                                                <select v-model="gender" class="form-control" id="">
                                                    
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Role <span class="text-danger">*</span></label>
                                                
                                                <select v-model="role" class="form-control" id="">
                                                    <option v-for="item in allroles" :key="item.rolCode" :value="item.rolCode">{{item.rolName}}</option>
                                                    
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Password <span class="text-danger">*</span></label>
                                                <input class="form-control" type="password" v-model="password" autocomplete="nope">
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Confirm Password <span class="text-danger">*</span></label>
                                                <input class="form-control" type="password" v-model="confirmPassword" autocomplete="nope">
                                                
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
                                    <button class="btn btn-outline-success mt-4">Create User</button> 
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