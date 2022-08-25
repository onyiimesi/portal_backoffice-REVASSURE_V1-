<script>
    import axios from 'axios'

    export default{
        name: 'updatecustomer',

        data(){
            return{
                errors: [],
                message: [],

                allstate: [],

                details: { 

                    id: '',
                    fullNames: '',
                    mobileNumber1: '',
                    mobileNumber2: '',
                    emailAddress: '',
                    bvn: '',
                    nin: '',
                    contactAddress: '',
                    lgaCode: '',
                    stateCode: '',
                    customerTin: '',
                }
                
            }
        }, 

        async mounted(){

            const resul = await axios.get('api/State/allstate', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.allstate = resul.data.result;

            const result = await axios.get('api/Customer/details/'+this.$route.params.id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.details = result.data.result;
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

            async updateCustomer(){

                this.errors = [];
                this.message = [];

                if (!this.details.fullNames) {
                    this.errors.push("Full Name required.");
                }

                if (!this.details.mobileNumber1) {
                    this.errors.push("Mobile Number required.");
                }
                if (!this.details.mobileNumber2) {
                    this.errors.push("Mobile Number 2 required.");
                }
                if (!this.details.emailAddress) {
                    this.errors.push("Email Adrress required.");
                }
                if (!this.details.bvn) {
                    this.errors.push("BVN required.");
                }
                if (!this.details.nin) {
                    this.errors.push("NIN required.");
                }
                if (!this.details.contactAddress) {
                    this.errors.push("Contact Address required.");
                }
                if (!this.details.lgaCode) {
                    this.errors.push("LGA Code required.");
                }
                if (!this.details.stateCode) {
                    this.errors.push("State Code required.");
                }
                if (!this.details.customerTin) {
                    this.errors.push("TIN Number required.");
                }
                
                const response = await axios.put('api/Customer/editcustomer', {

                    id: this.details.id,
                    fullNames: this.details.fullNames,
                    mobileNumber1: this.details.mobileNumber1,
                    mobileNumber2: this.details.mobileNumber2,
                    emailAddress: this.details.emailAddress,
                    bvn: this.details.bvn,
                    nin: this.details.nin,
                    contactAddress: this.details.contactAddress,
                    lgaCode: this.details.lgaCode,
                    stateCode: this.details.stateCode,
                    customerTin: this.details.customerTin,
                    
                }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },);
                

                if (response) {
                    console.log(response);
                    this.message.push(response.data.message);

                }else{
                    this.errors.push("Incorrect Parameter");
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
                              <h4 class="mb-0">Update Details</h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">Update Details</li>
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
                                <form @submit.prevent="updateCustomer">
                                    <input class="form-control" type="hidden" v-model="details.id">
                                    <div class="row">
                                        

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">Full Name</label>
                                                <input class="form-control" type="text" v-model="details.fullNames">
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">Customer Mobile Number</label>
                                                <input class="form-control" type="text" v-model="details.mobileNumber1">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">Customer Mobile Number 2</label>
                                                <input class="form-control" type="text" v-model="details.mobileNumber2">
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">Email Address</label>
                                                <input class="form-control" type="text" v-model="details.emailAddress">
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">
                                    
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">BVN</label>
                                                <input class="form-control" type="text" v-model="details.bvn">
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">NIN</label>
                                                <input class="form-control" type="text" v-model="details.nin">
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">
                                        
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">State Code</label>
                                                <!-- <input class="form-control" type="text" v-model="details.stateCode"> -->

                                                <select v-model="details.stateCode" @change="onChange($event)" class="form-control">
                                                    <option>{{details.stateCode}}</option>
                                                    <option v-for="org in allstate" :value="org.stateCode">{{org.stateCode}}</option>
                                                    
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">LGA Code</label>
                                                <!-- <input class="form-control" type="text" v-model="details.lgaCode"> -->

                                                <select v-model="details.lgaCode" class="form-control" id="">
                                                    <option>{{details.lgaCode}}</option>
                                                    <option v-for="sub in alllga" :value="sub.lgaCode">{{sub.lgaCode}}</option>
                                                    
                                                </select>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">Contact Address</label>
                                                <input class="form-control" type="text" v-model="details.contactAddress">
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">TIN Number</label>
                                                <input class="form-control" type="text" v-model="details.customerTin">
                                            </div>
                                        </div>

                                    </div>

                                    <button class="btn btn-success mr-4 float-left">Update Customer</button>
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