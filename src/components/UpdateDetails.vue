<script>
    import axios from 'axios'
    import { useToast } from "vue-toastification";

    export default{
        name: 'updatecustomer',

        data(){
            return{
                errors: [],
                message: [],

                allstate: [],

                details: { 

                    id: '',
                    firstname: '',
                    lastname: '',
                    middlename: '',
                    mobileNumber1: '',
                    mobileNumber2: '',
                    emailAddress: '',
                    bvn: '',
                    nin: '',
                    contactAddress: '',
                    lgaCode: '',
                    stateCode: '',
                    customerTin: '',
                },

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
                roles: 'billing-oficer',
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
                const toast = useToast()
                
                const response = await axios.put('api/Customer/editcustomer', {

                    id: this.details.id,
                    firstname: this.details.firstname,
                    lastname: this.details.lastname,
                    middlename: this.details.middlename,
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
                    // console.log(response);
                    toast.success(response.data.message);

                }else{
                    toast.error("Incorrect Parameter");
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
                              <h4 class="mb-0">Update Details <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} //</span> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">Update Details</li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
                  <!-- end page title -->

                  
                  <div class="row">
                    <div class="col-lg-12">
                        <div class="card pt-3 pb-3 pl-3 pr-3">
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
                                        

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">First Name</label>
                                                <input class="form-control" type="text" v-model="details.firstname">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Middle Name</label>
                                                <input class="form-control" type="text" v-model="details.middlename">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Last Name</label>
                                                <input class="form-control" type="text" v-model="details.lastname">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Email Address</label>
                                                <input class="form-control" type="text" v-model="details.emailAddress">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Mobile Number</label>
                                                <input class="form-control" type="text" v-model="details.mobileNumber1">
                                            </div>
                                        </div>
                                    
                                        

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Mobile Number 2</label>
                                                <input class="form-control" type="text" v-model="details.mobileNumber2">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">BVN</label>
                                                <input class="form-control" type="text" v-model="details.bvn">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">NIN</label>
                                                <input class="form-control" type="text" v-model="details.nin">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">TIN Number</label>
                                                <input class="form-control" type="text" v-model="details.customerTin">
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">State</label>
                                                <!-- <input class="form-control" type="text" v-model="details.stateCode"> -->

                                                <select v-model="details.stateCode" @change="onChange($event)" class="form-control">
                                                    <option>{{details.stateCode}}</option>
                                                    <option v-for="org in allstate" :value="org.stateCode">{{org.stateName}}</option>
                                                    
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">LGA</label>
                                                <!-- <input class="form-control" type="text" v-model="details.lgaCode"> -->

                                                <select v-model="details.lgaCode" class="form-control" id="">
                                                    <option>{{details.lgaCode}}</option>
                                                    <option v-for="sub in alllga" :value="sub.lgaCode">{{sub.lgaName}}</option>
                                                    
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Contact Address</label>
                                                <textarea class="form-control" v-model="details.contactAddress" cols="30" rows="5"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <button class="btn btn-outline-success mt-4">Update</button>
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