<script>
    import axios from 'axios'

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
                
            }
        }, 

        async mounted(){

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
                

                if (!this.firstname) {
                    this.errors.push("First Name required.");
                }

                if (!this.lastname) {
                    this.errors.push("Last Name required.");
                }

                if (!this.mobileNumber1) {
                    this.errors.push("Mobile Number required.");
                }

                if (!this.emailAddress) {
                    this.errors.push("Email Adrress required.");
                }
                if (!this.bvn) {
                    this.errors.push("BVN required.");
                }
                if (!this.nin) {
                    this.errors.push("NIN required.");
                }
                if (!this.contactAddress) {
                    this.errors.push("Contact Address required.");
                }
                if (!this.lgaCode) {
                    this.errors.push("LGA Code required.");
                }
                if (!this.stateCode) {
                    this.errors.push("State Code required.");
                }
                if (!this.customerType) {
                    this.errors.push("Customer Type required.");
                }
                if (!this.customerTin) {
                    this.errors.push("TIN Number required.");
                }
                
                const response = await axios.post('api/Customer/addcustomer', {

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
                });
                

                if (response) {
                    console.log(response);
                    this.message.push(response.data.message);

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
                              <h4 class="mb-0">Create Customer</h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
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
                                    
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">First Name</label>
                                                <input class="form-control" type="text" v-model="firstname">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Last Name</label>
                                                <input class="form-control" type="text" v-model="lastname">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Middle Name (optional)</label>
                                                <input class="form-control" type="text" v-model="middlename">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                    
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Customer Mobile Number</label>
                                                <input class="form-control" type="text" v-model="mobileNumber1">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Customer Mobile Number 2 (optional)</label>
                                                <input class="form-control" type="text" v-model="mobileNumber2">
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
                                                <label class="control-label">BVN</label>
                                                <input class="form-control" type="text" v-model="bvn">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">NIN</label>
                                                <input class="form-control" type="text" v-model="nin">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Contact Address</label>
                                                <input class="form-control" type="text" v-model="contactAddress">
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">
                                        
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">State Code</label>
                                                <select v-model="stateCode" @change="onChange($event)" class="form-control">
                                                    
                                                    <option v-for="org in allstate" :value="org.stateCode">{{org.stateCode}}</option>
                                                    
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">LGA Code</label>
                                                <select v-model="lgaCode" class="form-control" id="">
                                                    
                                                    <option v-for="sub in alllga" :value="sub.lgaCode">{{sub.lgaCode}}</option>
                                                    
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Customer Type</label>
                                                <select v-model="customerType" class="form-control" id="">
                                                    <option value="10">Individual</option>
                                                    <option value="11">Cooperate</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">TIN Number</label>
                                                <input class="form-control" type="text" v-model="customerTin">
                                            </div>
                                        </div>
                                    </div>

                                    <button class="btn btn-success mr-4 float-left">Create Customer</button>
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