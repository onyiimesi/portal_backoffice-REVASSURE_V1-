<script>
    import axios from 'axios'
    import { useToast } from "vue-toastification";

    export default{
        name: 'createcustomerindividual',

        data(){
            return{
                errors: [],
                message: [],

                allstate: [],
                alllga: [],

                customerCode: '',
                fullNames: '',
                mobileNumber1: '',
                mobileNumber2: '',
                emailAddress: '',
                bvn: '',
                nin: '',
                contactAddress: '',
                lgaCode: '',
                stateCode: '',
                customerType: '',
                customerTin: '',
                firstname: '',
                lastname: '',
                middlename: '',

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

                role: '',
                
            }
        }, 

        async mounted(){

            this.role = localStorage.getItem('role');

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

            async handleCustomer(){
                this.errors = [];
                this.message = [];
                const toast = useToast()

                if (!this.firstname) {
                    toast.error("First Name required.");
                }

                if (!this.lastname) {
                    toast.error("Last Name required.");
                }
                if (this.lastname.length < 4) {
                    toast.error("The field lastname must have a minimum length of '4'");
                }

                if (!this.mobileNumber1) {
                    toast.error("Mobile Number required.");
                }

                if (!this.emailAddress) {
                    toast.error("Email Adrress required.");
                }
                if (!this.bvn) {
                    toast.error("BVN required.");
                }
                if (this.bvn.length < 10) {
                    toast.error("The field Bvn must have a minimum length of '10'.");
                }
                if (!this.nin) {
                    toast.error("NIN required.");
                }
                if (this.nin.length < 10) {
                    toast.error("The field NIN must have a minimum length of '10'.");
                }
                if (!this.contactAddress) {
                    toast.error("Contact Address required.");
                }
                if (!this.lgaCode) {
                    toast.error("LGA Code required.");
                }
                if (!this.stateCode) {
                    toast.error("State Code required.");
                }
                if (!this.customerType) {
                    toast.error("Customer Type required.");
                }else{

                    await axios.post('api/Customer/addcustomer', {

                    mobileNumber1: this.mobileNumber1,
                    mobileNumber2: this.mobileNumber2,
                    emailAddress: this.emailAddress,
                    bvn: this.bvn,
                    nin: this.nin,
                    contactAddress: this.contactAddress,
                    lgaCode: this.lgaCode,
                    stateCode: this.stateCode,
                    customerType: this.customerType,
                    customerTin: this.customerTin,
                    firstname: this.firstname,
                    lastname: this.lastname,
                    middlename: this.middlename,

                    }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                        "Access-Control-Allow-Origin": true
                    }
                    }).then(response => { 
                        toast.success(response.data.message);
                        
                        this.mobileNumber1 = "";
                        this.mobileNumber2 = "";
                        this.emailAddress = "";
                        this.bvn = "";
                        this.nin = "";
                        this.contactAddress = "";
                        this.lgaCode = "";
                        this.stateCode = "";
                        this.customerType = "";
                        this.customerTin = "";
                        this.firstname = "";
                        this.lastname = "";
                        this.middlename = "";
                    })
                    .catch(error => {
                        if(error.response.data.title){
                            toast.error(error.response.data.title);
                        }
                        
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
                                <form @submit.prevent="handleCustomer">
                                    <div class="row">

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Customer Type <span class="text-danger">*</span></label>
                                                <select v-model="customerType" class="form-control" id="">
                                                    <option value="10">Individual</option>
                                                    <option value="11">Cooperate</option>
                                                </select>
                                            </div>
                                        </div>
                                    
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">First Name <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="firstname">
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Middle Name (optional)</label>
                                                <input class="form-control" type="text" v-model="middlename">
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Last Name <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="lastname">
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Email Address <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="emailAddress">
                                            </div>
                                        </div>
                                    
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Mobile Number <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="mobileNumber1">
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Mobile Number 2 (optional)</label>
                                                <input class="form-control" type="text" v-model="mobileNumber2">
                                            </div>
                                        </div>
                                    
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">BVN <span class="text-danger">*</span></label>
                                                <input class="form-control" type="number" v-model="bvn">
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">NIN <span class="text-danger">*</span></label>
                                                <input class="form-control" type="number" v-model="nin">
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">TIN Number</label>
                                                <input class="form-control" type="text" v-model="customerTin">
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">State <span class="text-danger">*</span></label>
                                                <select v-model="stateCode" @change="onChange($event)" class="form-control">
                                                    
                                                    <option v-for="org in allstate" :value="org.stateCode">{{org.stateName}}</option>
                                                    
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">LGA <span class="text-danger">*</span></label>
                                                <select v-model="lgaCode" class="form-control" id="">
                                                    
                                                    <option v-for="sub in alllga" :value="sub.lgaCode">{{sub.lgaName}}</option>
                                                    
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Contact Address <span class="text-danger">*</span></label>
                                                <textarea class="form-control" v-model="contactAddress" cols="30" rows="5"></textarea>
                                            </div>
                                        </div>

                                    </div>

                                    <button class="btn btn-outline-success mt-4">Create Customer</button>
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

</style>