<script>
    import axios from "axios";

    export default{
        name: 'viewcustomers',
        
        data(){
            return{
                name: '',
                allcustomer: [],

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

            const result = await axios.get('api/Customer/allcustomer', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.allcustomer = result.data.result;
            setTimeout(() => {
            $("#datatable").DataTable({
                lengthMenu: [
                [5,10, 25, 50, -1],
                [5,10, 25, 50, "All"],
                ],
                pageLength: 10,
                language: {
                    searchPlaceholder: "Enter NIN, BVN or Full Name"
                }
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
                              <h4 class="mb-0">Customers <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} //</span> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">Customers</li>
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
                                    <router-link class="btn btn-outline-success" to="/create-customer"><i class="fa fa-plus"></i> Create Customer</router-link>
                                </div>
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>Customer Code</th>
                                        <!-- <th>CUSTOMER TYPE</th> -->
                                        <th>Customer Name</th>
                                        <th>Mobile Number</th>
                                        <th>Action</th>
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                    <tr v-for="item in allcustomer" :key="item.id">
                                        <td>{{item.customerCode}}</td>
                                        <!-- <td v-if="item.customerTYpe == 10">
                                            Individual
                                        </td>
                                        <td v-if="item.customerTYpe == 11">
                                            Corporate
                                        </td> -->
                                        <td>{{item.firstname}} {{item.lastname}}</td>
                                        <td>{{item.mobileNumber1}}</td>
                                        <td>
                                            <button class="btn btn-outline-success mr-2" data-toggle="modal" :data-target="'#bs-example-modal-lg-' + item.customerCode">View</button>
                                        </td>
                                        
                                        
                                        <div class="modal fade" :id="'bs-example-modal-lg-' + item.customerCode" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered modal-lg">
                                                <div class="modal-content">
                                                    
                                                    <div class="modal-header">
                                                        <h5 id="myLargeModalLabel" class="modal-title mt-0">Customer Information</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="row">
                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Customer Code</label>
                                                                    <h5>{{item.customerCode}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Customer Name</label>
                                                                    <h5>{{item.firstname}} {{item.lastname}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Email Address</label>
                                                                    <h5>{{item.emailAddress}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Phone Number</label>
                                                                    <h5>{{item.mobileNumber1}}</h5>
                                                                </div>
                                                            </div>
                                                        
                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Phone Number (2)</label>
                                                                    <h5>{{item.mobileNumber2}}</h5>
                                                                </div>
                                                            </div>

                                                            
                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Address</label>
                                                                    <h5>{{item.contactAddress}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">State</label>
                                                                    <h5>{{item.stateCode}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">LGA</label>
                                                                    <h5>{{item.lgaCode}}</h5>
                                                                </div>
                                                            </div>

                                                        </div><hr>

                                                        <router-link :to="'/customer-details/'+item.customerCode"><button type="button" class="btn btn-outline-success" data-dismiss="modal">View Profile</button></router-link>
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