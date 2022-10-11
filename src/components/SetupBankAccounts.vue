<script>
    import axios from 'axios'
    import { useToast } from "vue-toastification";

    export default{
        name: 'setupbankaccounts',

        data(){
            return{
                errors: [],
                message: [],

                bankCode: '',
                accountName: '',
                accountNumber: '',

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

        },

        methods: {
            async handleBankAcount(){
                this.errors = [];
                this.message = [];
                const toast = useToast()
                
                
                if (!this.bankCode) {
                    toast.error("Bank Code required.");
                }

                if (!this.accountName) {
                    toast.error("Account Name required.");
                }

                if (!this.accountNumber) {
                    toast.error("Account Number required.");
                }
                
                const response = await axios.post('api/BankAccounts/addbankaccount', {
                    bankCode: this.bankCode,
                    accountName: this.accountName,
                    accountNumber: this.accountNumber,
                    
                }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },);
                

                if (response) {
                    // console.log(response);
                    toast.success(response.data.message);

                    this.bankCode = "";
                    this.accountName = "";
                    this.accountNumber = "";

                }else {
                    toast.error("Incorrect Parameter");
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
                              <h4 class="mb-0">Create Bank Account <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} //</span> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">Create Bank Account</li>
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
                                <form @submit.prevent="handleBankAcount">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Bank Code <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="bankCode">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Account Name <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="accountName">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Account Number <span class="text-danger">*</span></label>
                                                <input class="form-control" type="text" v-model="accountNumber">
                                            </div>
                                        </div>

                                    </div>
                                    <button class="btn btn-outline-success mt-4">Create</button>
                                    
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