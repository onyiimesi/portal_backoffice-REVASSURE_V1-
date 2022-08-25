<script>
    import axios from "axios"

    export default{
        name: 'customerdetails',
        
        data(){
            return{
                errors: [],
                message: [],

                customerDetails: {

                    customerCode: '',
                    fullNames: '',
                    id: '',
                    fullNames: '',
                }
                
                
            }
        },

        async mounted(){

            const result = await axios.get('api/Customer/details/'+this.$route.params.id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            // console.log(this.$route.params.bankCode)
            // console.log(result);
            this.customerDetails = result.data.result;
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
                              <h4 class="mb-0">Customer Details</h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">Customer Details</li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
                  <!-- end page title -->

                    <div class="row mb-4">
                        <div class="col-md-8">
                            <div class="card"> 
                                <div class="card-body">
                                    <h3 class="pb-4">{{customerDetails.firstname}} {{customerDetails.lastname}}</h3>

                                    <h5 class="pb-3" style="font-size: 18px;">{{customerDetails.contactAddress}}</h5>
                                    <p class="pb-3" style="font-size: 16px;">
                                        {{customerDetails.customerCode}}
                                    </p>
                                    <p class="pb-3" style="font-size: 16px;">
                                        {{customerDetails.mobileNumber1}} - {{customerDetails.emailAddress}}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <div class="mb-3">
                                        <router-link :to="'/create-user-invoice/'+customerDetails.id" style="color: #000;font-weight: bold;font-size: 14px;text-transform: uppercase;">Create Invoice</router-link>
                                    </div>

                                    <div class="mb-3">
                                        <router-link :to="'/customer-details/'+customerDetails.id" style="color: #000;font-weight: bold;font-size: 14px;text-transform: uppercase;">Issue Rebate</router-link>
                                    </div>

                                    <div class="mb-1">
                                        <router-link :to="'/update-details/'+customerDetails.id" style="color: #000;font-weight: bold;font-size: 14px;text-transform: uppercase;">Update Deatails</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-4">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-header bg-primary">
                                    <h3 class="text-white">Payments</h3>
                                </div>
                                <div class="card-body table-responsive">
                                    <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                        <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>INVOICE CODE</th>
                                            <th>PAYMENT DATE</th>
                                            <th>AMOUNT PAID</th>
                                            <th>PAYMENT MODE</th>
                                            <th>ACTION</th>
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
                                            <td><button class="btn btn-success">View Details</button></td>
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

                    <div class="row mb-4">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-header bg-primary">
                                    <h3 class="text-white">Invoices</h3>
                                </div>
                                <div class="card-body table-responsive">
                                    <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                        <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>INVOICE CODE</th>
                                            <th>INVOICE DATE</th>                                         
                                            <th>AMOUNT DUE</th>
                                            <th>PAYMENT MODE</th>
                                            <th>ACTION</th>
                                            <!-- <th>BALANCE</th> -->
                                        </tr>
                                        </thead>


                                        <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Cash</td>
                                            <td>22/04/22</td>
                                            <td>35,000</td>
                                            <td>25,000</td>
                                            <td><button class="btn btn-success">View Details</button></td>
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