<script>
    import axios from "axios"

    export default{
        name: 'customerdetails',
        
        data(){
            return{
                errors: [],
                message: [],

                invoice: [],

                customerDetails: {

                    customerCode: '',
                    fullNames: '',
                    id: '',
                    fullNames: '',
                },

                role:  '',

                customerDet: {

                    emailAddress: '',
                    subOrganisationCode: '',
                    organizationCode: '',
                    firstName: '',
                    lastName: '',
                    middleName: '',
                    gender: '',
                    unit: '',
                },

                loaderDiv: '',
                mainDiv: 'd-none',

                roles: 'billing-oficer',
                roless: 'revenue-officer',
                
            }
        },

        async mounted(){

            this.role = localStorage.getItem('role');

            if(this.roles != this.role && this.roless != this.role){
                localStorage.removeItem('token');
                this.$router.push('/');
            }

            const resul = await axios.get('api/Users/profile', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.customerDet = resul.data.result;

            const result = await axios.get('api/Customer/customer/'+this.$route.params.customerCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.customerDetails = result.data.result;
            this.loaderDiv = "d-none";
            this.mainDiv = "";

            const results = await axios.get('api/Invoice/customerinvoices/'+this.$route.params.customerCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.invoice = results.data.result;
        },

        computed:{
            convertDate(date) {
                let n = 0; return date.replace(/_+/g, () => "// ::"[n++]);
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
                              <h4 class="mb-0">Customer Details <br> <span style="font-size: 14px;font-weight: 500;">{{customerDet.organizationCode}} //  {{customerDet.subOrganisationCode}} //</span> <span style="font-size: 14px;font-weight: 500;">{{customerDet.lastName}} {{customerDet.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">Customer Details</li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
                  <!-- end page title -->

                    <div class="row mb-4">
                        <div class="col-md-4">
                            <div class="card" v-if="this.role == 'billing-oficer'">
                                <div class="card-body">
                                    <div class="mb-3">
                                        <router-link :to="'/create-user-bill/'+customerDetails.id" style=";font-weight: bold;font-size: 13px;text-transform: uppercase;" class="btn btn-outline-success">Create Bill</router-link>
                                    </div>

                                    <div class="mb-3">
                                        <router-link :to="'/customer-details/'+customerDetails.id" style=";font-weight: bold;font-size: 13px;text-transform: uppercase;" class="btn btn-outline-success">Issue Rebate</router-link>
                                    </div>

                                    <div class="mb-1">
                                        <router-link :to="'/update-details/'+customerDetails.id" style=";font-weight: bold;font-size: 13px;text-transform: uppercase;" class="btn btn-outline-success">Update Deatails</router-link>
                                    </div>
                                </div>
                            </div>

                            <div class="card mb-4"> 
                                <div class="card-body">
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
                                    <div>
                                        <label for="">Customer Number</label>
                                        <h3 style="font-size: 20px;">
                                            {{customerDetails.customerCode}}
                                        </h3>
                                    </div><hr>

                                    <div>
                                        <label for="">Full Name</label>
                                        <h3 style="font-size: 20px;">{{customerDetails.firstname}} {{customerDetails.lastname}}</h3>
                                    </div><hr>

                                    <div>
                                        <label for="">Address</label>
                                        <h3 style="font-size: 20px;">{{customerDetails.contactAddress}}</h3>
                                    </div><hr>
                                    
                                    <div>
                                        <label for="">Contact Details</label>
                                        <h3 style="font-size: 20px;">
                                            {{customerDetails.emailAddress}} <br>{{customerDetails.mobileNumber1}}
                                        </h3>
                                    </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="col-md-8">
                            <div class="card">
                                <div class="card-header bg-white border-bottom">
                                    <h4 class="text-dark">Recent Bills</h4>
                                </div>
                                <div class="card-body table-responsive">
                                    <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                        <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>#Invoice</th>
                                            <th>Invoice Date</th>                                         
                                            <th>Amount Due</th>
                                            <th>Payment Mode</th>
                                            <th>Action</th>
                                            <!-- <th>BALANCE</th> -->
                                        </tr>
                                        </thead>


                                        <tbody>
                                        <tr v-for="list in invoice">
                                            <td>{{list.id}}</td>
                                            <td>{{list.invoiceCode}}</td>
                                            <td>{{list.invoiceDate}}</td>
                                            <td>{{list.invoiceAmount}}</td>
                                            <td>25,000</td>
                                            <td><button class="btn btn-outline-success btn-sm">View Details</button></td>
                                        </tr>
                                        <!-- <tr class="text-center">
                                            <td colspan="7"><h3 style="color: red;">Customer Not Found!</h3></td>
                                        </tr> -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="card">
                                <div class="card-header bg-white border-bottom">
                                    <h4 class="text-dark">Recent Payments</h4>
                                </div>
                                <div class="card-body table-responsive">
                                    <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                        <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>#Invoice</th>
                                            <th>Payment Date</th>
                                            <th>Amount Paid</th>
                                            <th>Payment Mode</th>
                                            <th>Action</th>
                                            <!-- <th>BALANCE</th> -->
                                        </tr>
                                        </thead>


                                        <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Cash</td>
                                            <td>22/04/22</td>
                                            <td>35,000</td>
                                            <td>In-00921</td>
                                            <td><button class="btn btn-outline-success btn-sm">View Details</button></td>
                                        </tr>
                                        <!-- <tr class="text-center">
                                            <td colspan="7"><h3 style="color: red;">Customer Not Found!</h3></td>
                                        </tr> -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>

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