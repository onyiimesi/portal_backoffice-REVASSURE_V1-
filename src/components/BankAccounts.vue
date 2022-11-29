<script>
    import axios from "axios";

    export default{
        name: 'bankaccounts',
        
        data(){
            return{
                name: '',
                bankAccounts: [],

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
                roless: 'revenue-officer',

                loaderDiv: '',
                mainDiv: 'd-none',
            }
        },

        async mounted(){
            this.role = localStorage.getItem('role');

            if(this.roless != this.role){
                localStorage.removeItem('token');
                this.$router.push('/');
            }

            const resul = await axios.get('api/Users/profile', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.customerDetails = resul.data.result;

            const result = await axios.get('api/BankAccounts/bankAccounts', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.bankAccounts = result.data.result;
            this.loaderDiv = "d-none";
            this.mainDiv = "";
            // setTimeout(() => {
            // $("#datatable").DataTable({
            //     lengthMenu: [
            //     [5,10, 25, 50, -1],
            //     [5,10, 25, 50, "All"],
            //     ],
            //     pageLength: 10,
            // });
            // });

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
                              <h4 class="mb-0">Bank Accounts <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}}</span> // <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">Bank Accounts</li>
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
                                <div class="mb-4 text-right" v-if="role === 'revenue-officer' ">
                                    <router-link class="btn btn-outline-success" to="/create-bank-account"><i class="fa fa-plus"></i> Create Bank Account</router-link>
                                </div>
                                <div :class="this.loaderDiv">
                                    <div class="ph-item">
                                        <div class="ph-col-12">
                                            <div class="ph-row">
                                                <div class="ph-col-4"></div>
                                                <div class="ph-col-8 empty"></div>
                                                <div class="ph-col-6"></div>
                                                <div class="ph-col-6 empty"></div>
                                                <div class="ph-col-12"></div>
                                                <div class="ph-col-12"></div>
                                                <div class="ph-col-12"></div>
                                                <div class="ph-col-12"></div>
                                            </div>
                                            <div class="ph-row">
                                                <div class="ph-col-4"></div>
                                                <div class="ph-col-8 empty"></div>
                                                <div class="ph-col-6"></div>
                                                <div class="ph-col-6 empty"></div>
                                                <div class="ph-col-12"></div>
                                                <div class="ph-col-12"></div>
                                                <div class="ph-col-12"></div>
                                                <div class="ph-col-12"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div :class="this.mainDiv">
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>Bank Code</th>
                                        <th>Bank Name</th>
                                        <th>Account Number</th>
                                        <th>Action</th>
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                    <tr v-for="item in bankAccounts" :key="item.bctId">
                                        <td>{{item.bctBankCode}}</td>
                                        <td>{{item.bctAccountName}}</td>
                                        <td>{{item.bctAccountNumber}}</td>
                                        <td>
                                            <router-link :to="'/edit-bank-account/'+item.bctId"><button class="btn btn-outline-success">Edit Account</button></router-link>
                                        </td>
                                        
                                        
                                        <div class="modal fade" :id="'bs-example-modal-lg-' + item.bctId" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    
                                                    <div class="modal-header">
                                                        <h5 id="myLargeModalLabel" class="modal-title mt-0">View Bank Account</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="row">
                                                            <div class="col-6 col-md-4 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Bank Code</label>
                                                                    <h5>{{item.bctBankCode}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-4 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Bank Name</label>
                                                                    <h5>{{item.bctAccountName}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-4 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Account Number</label>
                                                                    <h5>{{item.bctAccountNumber}}</h5>
                                                                </div>
                                                            </div>

                                                        </div><hr>

                                                        <router-link :to="'/edit-bank-account/'+item.bctId"><button class="btn btn-outline-success" data-dismiss="modal">Edit Account</button></router-link>
                                                    </div>
                                                    
                                                </div><!-- /.modal-content -->
                                                
                                            </div><!-- /.modal-dialog -->
                                        </div>
                                    </tr>
                                    </tbody>
                                </table>
                                </div>
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