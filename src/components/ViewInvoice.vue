<script>
    import axios from "axios";

    export default{
        name: 'viewinvoices',
        
        data(){
            return{
                name: '',
                allinvoice: [],

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
            const resul = await axios.get('api/Users/profile', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.customerDetails = resul.data.result;


            const result = await axios.get('api/Invoice/orginvoices?organizationcode='+this.customerDetails.organizationCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.allinvoice = result.data.result;

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
                              <h4 class="mb-0">View Invoices</h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">View Invoices</li>
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

                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>INVOICE CODE</th>
                                        <!-- <th>ORGANISATION CODE</th>
                                        <th>SUB-ORGANISATION TYPE</th> -->
                                        <th>CUSTOMER CODE</th>
                                        <th>CURRENCY CODE</th>
                                        <th>AMOUNT</th>
                                        <th>PAYMENT STATUS</th>
                                        <th>ACTION</th>
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                    <tr v-for="item in allinvoice" :key="item.id">
                                        <td>{{item.invoiceCode}}</td>
                                        <!-- <td>{{item.organisationCode}}</td>
                                        <td>{{item.subOrganisationCode}}</td> -->
                                        <td>{{item.customerCode}}</td>
                                        <td>{{item.currencyCode}}</td>
                                        <td>{{item.invoiceAmount}}</td>
                                        <td>{{item.paymentStatus}}</td>
                                        
                                        <td>
                                            <router-link :to="'/invoices/'+item.invoiceCode"><button class="btn btn-success btn-sm mr-2">View</button></router-link>
                                        </td>
                                        <!-- <td>61</td> -->
                                    </tr>
                                    </tbody>
                                </table>

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