<script>
    import axios from 'axios'
    import { useToast } from "vue-toastification";
    import useValidate  from '@vuelidate/core'
    import { required, sameAs  } from '@vuelidate/validators'

    export default{
        name: 'createcustomerindividual',

        data(){
            return{
                v$: useValidate(),
                errors: [],
                message: [],

                allstate: [],
                alllga: [],

                customerCode: '',
                fullNames: '',
                phoneNumber: '',
                phoneNumber2: '',
                emailAddress: '',
                bvn: '',
                nin: '',
                contactAddress: '',
                lgaCode: '',
                stateCode: '',
                customerType: '',
                customerTin: '',
                firstName: '',
                lastName: '',
                middleName: '',
                password: '',
                confirmPassword: '',

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

                businessDetails: {
                    companyAddress: '',
                    companyPhoneNumber: '',
                    companyEmailAddress: '',
                    companyRCNumber: '',
                    companyName: '',
                    companyTIN: '',
                },

                adminDetails: {
                    firstName: '',
                    lastName: '',
                    middleName: '',
                    phoneNumber: '',
                    phoneNumber2: '',
                    emailAddress: '',
                    bvn: '',
                    nin: '',
                    contactAddress: '',
                    lgaCode: '',
                    stateCode: '',
                    customerType: 11,
                    customerTin: '',
                    password: '',
                    confirmPassword: '',
                },
                

                role: '',
                isHidden: false,
                isHiddens: false,
                roles: 'billing-oficer',
            }
        }, 

        validations () {
            return {
                password: {
                    required,
 
                },
                confirmPassword: { required, sameAsPassword: sameAs(this.password) }, 
            }
        },

        async mounted(){

            this.role = localStorage.getItem('role');

            if(this.roles != this.role){
                localStorage.removeItem('token');
                this.$router.push('/');
            }

            const resu = await axios.get('api/Users/profile', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.customerDetails = resu.data.result;

            const resul = await axios.get('api/State/allstate', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.allstate = resul.data.result;

        },

        methods: {

            async onChange(event) {

                const response = await axios.get('api/Lga/alllgas/'+event.target.value,{
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },);

                this.alllga = response.data.result;

            },

            async handleIndCustomer(){
                this.errors = [];
                this.message = [];
                const toast = useToast()

                await axios.post('api/Customer/createindividualcustomer', {

                    phoneNumber: this.phoneNumber,
                    phoneNumber2: this.phoneNumber2,
                    emailAddress: this.emailAddress,
                    bvn: this.bvn,
                    nin: this.nin,
                    contactAddress: this.contactAddress,
                    lgaCode: this.lgaCode,
                    stateCode: this.stateCode,
                    customerType: 10,
                    customerTin: this.customerTin,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    middleName: this.middleName,
                    password: this.password,

                }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    "Access-Control-Allow-Origin": true
                }
                }).then(response => { 
                    if(response){
                        toast.success("Customer Created");
                        this.$router.push("/view-customers");
                        
                        this.phoneNumber = "";
                        this.phoneNumber2 = "";
                        this.emailAddress = "";
                        this.bvn = "";
                        this.nin = "";
                        this.contactAddress = "";
                        this.lgaCode = "";
                        this.stateCode = "";
                        this.customerTin = "";
                        this.firstName = "";
                        this.lastName = "";
                        this.middleName = "";
                        this.password = "";
                        this.confirmPassword = "";
                    }
                })
                .catch(error => {
                    this.eee = error.response.data.errors;

                    this.v$.$validate()
                    if (this.v$.$error) {
                        toast.error("Password & Confirm Password Don't Match.");
                    }

                    if (this.eee) {
                        toast.error(this.eee.Bvn[0])
                        toast.error(this.eee.Bvn[1])
                        toast.error(this.eee.ContactAddress[0])
                        toast.error(this.eee.EmailAddress[0])
                        toast.error(this.eee.EmailAddress[1])
                        toast.error(this.eee.FirstName[0])
                        toast.error(this.eee.LastName[0])
                        toast.error(this.eee.LgaCode[0])
                        toast.error(this.eee.Nin[0])
                        toast.error(this.eee.Nin[1])
                        toast.error(this.eee.PhoneNumber[0])
                        toast.error(this.eee.StateCode[0])
                        
                    }
                    
                    
                });  
   
            },

            async handleCoOpCustomer(){
                this.errors = [];
                this.message = [];
                const toast = useToast()

                

                    await axios.post('api/Customer/createcorporatecustomer', {

                        businessDetails: this.businessDetails,
                        adminDetails: this.adminDetails

                    }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                        "Access-Control-Allow-Origin": true
                    }
                    }).then(response => { 

                        if(response){
                            toast.success("Customer Created");
                            this.$router.push("/view-customers");
                            

                            this.businessDetails = {};

                            this.adminDetails = {};
                        }
                    })
                    .catch(error => {
                        this.err = error.response.data.errors.AdminDetailsBvn;
                        console.log(this.err)

                        // this.v$.$validate()
                        // if (this.v$.$error) {
                        //     toast.error("Password & Confirm Password Don't Match.");
                        // }

                            
                            toast.error(this.err)
                            // toast.error(this.err.EmailAddress[1])
                            // toast.error(this.err.FirstName[0])
                            // toast.error(this.err.LastName[0])
                            // toast.error(this.err.LgaCode[0])
                            // toast.error(this.err.Password[0])
                            // toast.error(this.err.PhoneNumber[0])
                            // toast.error(this.err.StateCode[0])
                        
                        
                    });

                
   
            },
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
                              <h4 class="mb-0">Create Customer <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} //</span> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">Create Customer</li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
                  <!-- end page title -->

                  
                  <div class="row">
                    <div class="col-lg-12">
                        <div class="card pt-4 pb-3 pl-3 pr-3 bor" v-if="!isHidden && !isHiddens">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6 mb-4">
                                        <div class="cus text-center shadow">
                                            <img src="/frontend/icon.png" class="img-fluid pb-3" width="50" height="50" alt="">
                                            <h4 class="pb-3">Individual</h4>
                                            <p class="pb-3">
                                                For Individuals who make regular payments and receive money for their business
                                            </p>

                                            <button @click="isHidden = true" class="btn btn-outline-success">Get Started</button>
                                        </div>
                                    </div>

                                    <div class="col-md-6 mb-4">
                                        <div class="cus text-center shadow">
                                            <img src="/frontend/company.png" class="img-fluid pb-3" width="50" height="50" alt="">
                                            <h4 class="pb-3">Cooperate</h4>
                                            <p class="pb-3">
                                                For Registered Companies with Multiple Directors
                                            </p>
                                            <button @click="isHiddens = true" class="btn btn-outline-success">Get Started</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="card pt-4 pb-3 pl-3 pr-3" v-if="isHidden">
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
                                <form @submit.prevent="handleIndCustomer">
                                    <div class="row">
                                    
                                        <div class="col-md-4 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">First Name <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="firstName">
                                            </div>
                                        </div>

                                        <div class="col-md-4 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">Middle Name (optional)</label>
                                                <input class="form-control" type="text" v-model="middleName">
                                            </div>
                                        </div>

                                        <div class="col-md-4 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">Last Name <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="lastName">
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-4 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">Email Address <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="emailAddress">
                                            </div>
                                        </div>
                                    
                                        <div class="col-md-4 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">Mobile Number <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="phoneNumber">
                                            </div>
                                        </div>

                                        <div class="col-md-4 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">Mobile Number 2 (optional)</label>
                                                <input class="form-control" type="text" v-model="phoneNumber2">
                                            </div>
                                        </div>
                                    
                                        <div class="col-md-4 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">BVN</label>
                                                <input class="form-control" type="text" v-model="bvn">
                                            </div>
                                        </div>

                                        <div class="col-md-4 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">NIN</label>
                                                <input class="form-control" type="text" v-model="nin">
                                                <div class="text-right">
                                                    <span style="font-weight: 600; font-size: 12px;">Dial *346# to get your NIN</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-4 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">TIN Number</label>
                                                <input class="form-control" type="text" v-model="customerTin">
                                            </div>
                                        </div>

                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">State <span class="text-danger">*</span></label>
                                                <select v-model="stateCode" @change="onChange($event)" class="form-control">
                                                    
                                                    <option v-for="org in allstate" :value="org.stateCode">{{org.stateName}}</option>
                                                    
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">LGA <span class="text-danger">*</span></label>
                                                <select v-model="lgaCode" class="form-control" id="">
                                                    
                                                    <option v-for="sub in alllga" :value="sub.lgaCode">{{sub.lgaName}}</option>
                                                    
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">Contact Address <span class="text-danger">*</span></label>
                                                <textarea class="form-control" v-model="contactAddress" cols="30" rows="5"></textarea>
                                            </div>
                                        </div>

                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">Password <span class="text-danger">*</span></label>
                                                <input class="form-control" type="password" v-model="password" autocomplete="nope">
                                            </div>
                                        </div>

                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">Confirm Password <span class="text-danger">*</span></label>
                                                <input class="form-control" type="password" v-model="confirmPassword" autocomplete="nope">
                                                
                                            </div>
                                        </div>

                                    </div>

                                    <button class="btn btn-outline-success">Create</button>
                                </form>
                                <!-- <button class="btn btn-primary">Cancel</button> -->
                                

                            </div>
                        </div>


                        <div class="card pt-4 pb-3 pl-3 pr-3" v-if="isHiddens">
                            <div class="card-body">

                                <div class="alert alert-success" v-if="message.length">
                                    <strong v-for="msg in message">{{ msg }}</strong>
                                </div>
                                <form @submit.prevent="handleCoOpCustomer">
                                    <div class="row">

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Company Name <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="businessDetails.companyName">
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">Company Email <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="businessDetails.companyEmailAddress">
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">Company Phone Number <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="businessDetails.companyPhoneNumber">
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">Company RC Number <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="businessDetails.companyRCNumber">
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">Company TIN <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="businessDetails.companyTIN">
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Company Address <span class="text-danger">*</span></label>
                                                <textarea class="form-control" v-model="businessDetails.companyAddress" id="" cols="30" rows="10"></textarea>
                                            </div>
                                        </div>
                                    
                                    </div>

                                    <div class="row pt-5">
                                        <div class="col-md-12">
                                            <h3 style="font-size: 16px;">Your personal details</h3><hr>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">First Name <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="adminDetails.firstName">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Middle Name</label>
                                                <input class="form-control" type="text" v-model="adminDetails.middleName">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Last Name <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="adminDetails.lastName">
                                            </div>
                                        </div>

                                        <div class="col-md-4 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">Email Address <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="adminDetails.emailAddress">
                                            </div>
                                        </div>
                                    
                                        <div class="col-md-4 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">Mobile Number <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="adminDetails.phoneNumber">
                                            </div>
                                        </div>

                                        <div class="col-md-4 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">Mobile Number 2 (optional)</label>
                                                <input class="form-control" type="text" v-model="adminDetails.phoneNumber2">
                                            </div>
                                        </div>
                                    
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">BVN <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="adminDetails.bvn">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">NIN <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="adminDetails.nin">
                                                <div class="text-right">
                                                    <span style="font-weight: 600; font-size: 12px;">Dial *346# to get your NIN</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">TIN <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="adminDetails.customerTin">
                                            </div>
                                        </div>

                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">State <span class="text-danger">*</span></label>
                                                <select v-model="adminDetails.stateCode" @change="onChange($event)" class="form-control">
                                                    
                                                    <option v-for="org in allstate" :value="org.stateCode">{{org.stateName}}</option>
                                                    
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">LGA <span class="text-danger">*</span></label>
                                                <select v-model="adminDetails.lgaCode" class="form-control" id="">
                                                    
                                                    <option v-for="sub in alllga" :value="sub.lgaCode">{{sub.lgaName}}</option>
                                                    
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">Contact Address <span class="text-danger">*</span></label>
                                                <textarea class="form-control" v-model="adminDetails.contactAddress" cols="30" rows="5"></textarea>
                                            </div>
                                        </div>

                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">Password <span class="text-danger">*</span></label>
                                                <input class="form-control" type="password" v-model="adminDetails.password" autocomplete="nope">
                                            </div>
                                        </div>

                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <label class="control-label">Confirm Password <span class="text-danger">*</span></label>
                                                <input class="form-control" type="password" v-model="adminDetails.confirmPassword" autocomplete="nope">
                                                
                                            </div>
                                        </div>
                                    </div>

                                    <button class="btn btn-outline-success mt-4">Create</button>
                                </form>
                                <!-- <button class="btn btn-primary">Cancel</button> -->
                                

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
    .cus{
        width: 100%;
        height: 100%;
        padding: 40px 80px;
        border-radius: 20px;
        border: 1px solid #f3f3f3;
    }

    .cus:hover{
        border: 1px solid green;
        border-radius: 20px;
    }

    .cus p{
        min-height: 70px;
    }

    .cus button{
        padding: 12px 20px !important;
        border-radius: 25px;
    }

    .bor{
        border-radius: 20px !important;
    }
</style>