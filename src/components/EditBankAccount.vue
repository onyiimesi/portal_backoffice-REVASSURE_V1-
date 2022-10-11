<script>
    import axios from "axios"
    import { useToast } from "vue-toastification";

    export default{
        name: 'editbankaccount',
        
        data(){
            return{
                errors: [],
                message: [],

                bankAccounts: {

                    bctId: '',
                    accountName: '',
                    accountNumber: '',
                },

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
            this.role = localStorage.getItem('role');

            const resul = await axios.get('api/Users/profile', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.customerDetails = resul.data.result;

            const result = await axios.get('api/BankAccounts/details/'+this.$route.params.bctId, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.bankAccounts = result.data.result;
        },

        methods: {
            async editBankAccount(){
                
                this.errors = [];
                this.message = [];
                const toast = useToast()

                // if (!this.bankAccountctId) {
                //     this.errors.push("Bank Account ID required.");
                // }

                if (!this.accountName) {
                    toast.error("Bank Account Name required.");
                }

                if (!this.accountNumber) {
                    toast.error("Bank Account Number required.");
                }
                
                const response = await axios.put('api/BankAccounts/edit', {
                    bankAccountctId: this.bankAccounts.bankAccountctId,
                    accountName: this.bankAccounts.accountName,
                    accountNumber: this.bankAccounts.accountNumber,
                    
                }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },);
                

                if (response) {
                    
                    toast.success(response.data.message);

                }else{
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
                              <h4 class="mb-0">Edit Bank Account <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}}</span> // <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">Edit Bank Account</li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
                  <!-- end page title -->

                  
                  <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body table-responsive">
                                <div class="alert alert-danger" v-if="errors.length">
                                    <b>Please correct the following error(s):</b>
                                    <ul>
                                        <li v-for="error in errors">{{ error }}</li>
                                    </ul>
                                </div>

                                <div class="alert alert-success" v-if="message.length">
                                    <strong v-for="msg in message">{{ msg }}</strong>
                                </div>
                                <form @submit.prevent="editBankAccount">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Bank ID</label>
                                                <input class="form-control" type="text" v-model="bankAccounts.bankAccountctId">
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Bank Account Name</label>
                                                <input class="form-control" type="text" v-model="bankAccounts.accountName">
                                            </div>
                                        </div>


                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="control-label">Bank Account Number</label>
                                                <input class="form-control" type="text" v-model="bankAccounts.accountNumber">
                                            </div>
                                        </div>

                                    </div>
                                    <button class="btn btn-outline-success mt-4">Edit</button>
                                    
                                </form>

                            </div>
                        </div>
                    </div> <!-- end col -->
                </div> <!-- end row -->

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