<script>
    import axios from "axios";

    export default{
        name: 'viewinvoices',
        
        data(){
            return{
                name: '',
                allinvoice: [],
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


            const result = await axios.get('api/Invoice/'+this.customerDetails.organizationCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.allinvoice = result.data.result;
            setTimeout(() => {
            $("#datatable").DataTable({
                lengthMenu: [
                [5,10, 25, 50, -1],
                [5,10, 25, 50, "All"],
                ],
                pageLength: 10,
            });
            });
            

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
                              <h4 class="mb-0">View Bills <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} //</span> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">View Bills</li>
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
                                <div class="mb-4 text-right" v-if="role === 'billing-oficer' ">
                                    <router-link class="btn btn-outline-success" to="/create-bill"><i class="fa fa-plus"></i> Create Bill</router-link>
                                </div>
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>#Invoice</th>
                                        <!-- <th>ORGANISATION CODE</th>
                                        <th>SUB-ORGANISATION TYPE</th> -->
                                        <th>Customer Number</th>
                                        <th>Currency</th>
                                        <th>Amount</th>
                                        <th>Payment Status</th>
                                        <th>Action</th>
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
                                            <button class="btn btn-outline-success mr-2" data-toggle="modal" :data-target="'#bs-example-modal-lg-' + item.invoiceCode">View</button>
                                        </td>
                                        <!-- <td>61</td> -->

                                        <div class="modal fade" :id="'bs-example-modal-lg-' + item.invoiceCode" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered modal-lg">
                                                <div class="modal-content">
                                                    
                                                    <div class="modal-header">
                                                        <h5 id="myLargeModalLabel" class="modal-title mt-0">View Invoice</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="row">
                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Invoice Code</label>
                                                                    <h5>{{item.invoiceCode}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Customer Code</label>
                                                                    <h5>{{item.customerCode}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Curency Code</label>
                                                                    <h5>{{item.currencyCode}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Amount</label>
                                                                    <h5>{{item.invoiceAmount}}</h5>
                                                                </div>
                                                            </div>

                                                            
                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Status</label>
                                                                    <h5>{{item.paymentStatus}}</h5>
                                                                </div>
                                                            </div>

                                                        </div><hr>
                                                    
                                                        <router-link :to="'/bills/'+item.invoiceCode"><button class="btn btn-outline-success" data-dismiss="modal">View Invoice</button></router-link>
                                                    </div>
                                                    
                                                </div><!-- /.modal-content -->
                                                
                                            </div><!-- /.modal-dialog -->
                                        </div>
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