<script>

    import axios from 'axios'
    import { useToast } from "vue-toastification";

    export default{
        name: 'setuporganization',

        data(){
            return{
                errors: [],
                message: [],

                allorg: [],
                
                org: {
                    organisationCode: '',
                    organisationName: '',
                    parentOrganizationCode: '',
                    officeAddress: '',
                    emailAddress: '',
                    website: '',
                    phoneNumber: '',
                },

                suborg: {
                    subOrganisationCode: '',
                    subOrganisationName: '',
                    organisationCode: '',
                },

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

                allroles: [],

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

                roles: '0',
                roless: 'portal-admin',
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

            this.role = localStorage.getItem('role');

            if(this.roles != this.role && this.roless != this.role){
                localStorage.removeItem('token');
                this.$router.push('/');
            }

            const resultss = await axios.get('api/Users/profile',{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.customerDetails = resultss.data.result;

            const result = await axios.get('api/roles/allroles', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.allroles = result.data.result;

            const results = await axios.get('api/Organisation/organizations', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.allorg = results.data.result;
        },

        methods: {
            async handleOrg(){
                this.errors = [];
                this.message = [];
                const toast = useToast()
                
                if (!this.org.parentOrganizationCode) {
                    toast.error("Parent Organization required.");
                }
                
                if (!this.org.organisationCode) {
                    toast.error("Organization Code required.");
                }

                if (!this.org.organisationName) {
                    toast.error("Organization Name required.");
                }

                if (!this.org.emailAddress) {
                    toast.error("Organization Email Address required.");
                }

                if (!this.org.phoneNumber) {
                    toast.error("Mobile Number required.");
                }

                if (!this.org.website) {
                    toast.error("Website required.");
                }

                if (!this.org.officeAddress) {
                    toast.error("Office Address required.");
                }

                if (!this.firstName) {
                    toast.error("Firstname required.");
                }

                if (!this.lastName) {
                    toast.error("Lastname required.");
                }

                
                else{
                    await axios.post('api/Users/adduser', {
                        emailAddress: this.emailAddress,
                        subOrganisationCode: "SUB"+this.org.organisationCode,
                        organizationCode: this.org.organisationCode,
                        unit: this.unit,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        middleName: this.middleName,
                        gender: this.gender,
                        password: "password1",
                        role: "org-admin",
                        
                    }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    },).then(response => { 
                        
                    })
                    .catch(error => {
                        this.eee = error.response.data.errors;
                        toast.error(this.eee.EmailAddress[0])
                        toast.error(this.eee.FirstName[0])
                        toast.error(this.eee.LastName[0])
                        toast.error(this.eee.OrganizationCode[0])
                    });

                    await axios.post('api/SubOrganisation/addsuborganization', {
                        subOrganisationCode: "SUB"+this.org.organisationCode,
                        subOrganisationName: "SUB "+this.org.organisationName,
                        organisationCode: this.org.organisationCode
                        
                    }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    },).then(response => { 
                        
                    })
                    .catch(error => {
                        this.eee = error.response.data.errors;
                        toast.error(this.eee.OrganizationCode[0])
                    });

                    const response = await axios.post('api/Organisation/addorganization', {
                    organisationCode: this.org.organisationCode,
                    organisationName: this.org.organisationName,
                    parentOrganizationCode: this.org.parentOrganizationCode,
                    officeAddress: this.org.officeAddress,
                    emailAddress: this.org.emailAddress,
                    website: this.org.website,
                    phoneNumber: this.org.phoneNumber,
                        
                    }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    },).then(response => { 
                            toast.success(response.data.message);
                            this.$router.push("/list-organization");

                            this.org.organisationCode = "";
                            this.org.organisationName = "";
                            this.org.parentOrganizationCode = "";
                            this.org.officeAddress = "";
                            this.org.emailAddress = "";
                            this.org.website = "";
                            this.org.phoneNumber = "";

                            this.suborg.subOrganisationCode = "";
                            this.suborg.subOrganisationName = "";
                            this.suborg.organisationCode = "";

                            this.emailAddress = "";
                            this.organizationCode = "";
                            this.subOrganisationCode = "";
                            this.firstName = "";
                            this.lastName = "";
                            this.password = "";
                            this.confirmPassword = "";
                            this.role = "";
                        })
                        .catch(error => {
                            this.eee = error.response.data.errors;
                            toast.error(this.eee.OrganisationCode[0])
                            toast.error(this.eee.OrganisationName[0])
                            toast.error(this.eee.ParentOrganizationCode[0])
                        });
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
                              <h4 class="mb-0">Create Organization <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} //</span> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                                      <li class="breadcrumb-item active">Create Organization</li>
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

                                <h4 class="card-title">Organization Information</h4>

                                <div class="alert alert-danger" v-if="errors.length">

                                    <span v-for="error in errors">{{ error }}</span>

                                </div>

                                <div class="alert alert-success" v-if="message.length">
                                    <strong v-for="msg in message">{{ msg }}</strong>
                                </div>
                                <form @submit.prevent="handleOrg">
                                    <div class="row mt-4">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Parent Organization <span class="text-danger">*</span></label>
                                                <select v-model="org.parentOrganizationCode" class="form-control">
                                                    <option v-for="org in allorg" :value="org.organisationCode">{{org.organisationName}}</option>
                                                    
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Organization Code <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="org.organisationCode">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Organization Name <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="org.organisationName">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Email Address <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="org.emailAddress">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Mobile Number <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="org.phoneNumber">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Website <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="org.website">
                                            </div>
                                        </div>
                                    
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Address <span class="text-danger">*</span></label>
                                                <textarea class="form-control"  v-model="org.officeAddress" cols="30" rows="5"></textarea>
                                            </div>
                                        </div>
                                    </div><hr>
                                    
                                    <div class="mt-5 mb-4">
                                        <h4 class="card-title">Organization Administrator Information</h4>
                                    </div>
                                    <div class="row">
                                       <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">First Name <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="firstName">
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Last Name <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="lastName">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Email Address <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="emailAddress">
                                            </div>
                                        </div>

                                    </div>
                                    <button class="btn btn-outline-success mt-4 float-left mr-3">Create</button>

                                    
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