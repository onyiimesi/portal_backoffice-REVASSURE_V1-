<script>

    import { mapGetters } from 'vuex';
  
    import axios from "axios"
    
    export default{
      name: 'Nav',
      name: 'dashboard',
      name: 'autologout',
  
      data: function(){
          return{

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
            roless: 'revenue-officer',
          }
      },
  
      async mounted(){
        this.role = localStorage.getItem('role');

        if(this.roles != this.role && this.roless != this.role){
            localStorage.removeItem('token');
            this.$router.push('/');
        }

        const result = await axios.get('api/Users/profile',{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
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
                              <h4 class="mb-0">Bills Payments Report <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} //</span> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">Bills Payments Report</li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
                  <!-- end page title -->

                  
                  <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <form @submit.prevent="billsreport">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">Payment Date Range</label>
                                                <input class="form-control mb-4" type="date">

                                                <label class="control-label">Bill Number</label>
                                                <input class="form-control" type="text" placeholder="Bill Number">
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="control-label">Payer ID</label>
                                                <input class="form-control mb-4" type="text" placeholder="Payer ID">

                                                <label class="control-label">Invoice Number</label>
                                                <input class="form-control" type="text" placeholder="Invoice Number">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <button class="btn btn-outline-success">Search</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body table-responsive">
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>Customer Name</th>
                                        <th>Bill Number</th>
                                        <th>Amount Paid</th>
                                        <th>Date Paid</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                        
                                    </tr>
                                    </thead>


                                    <tbody>
                                    <tr>
                                        <td>Jane Pricilia</td>
                                        <td>#1159</td>
                                        <td>N2,000</td>
                                        <td>2022/09/10</td>
                                        <td>Paid</td>
                                        <td><button class="btn btn-outline-success">Details</button></td>
                                    </tr>
                                    <tr>
                                        <td>Anthony josh</td>
                                        <td>#3848</td>
                                        <td>N6,000</td>
                                        <td>2022/09/18</td>
                                        <td>Paid</td>
                                        <td><button class="btn btn-outline-success">Details</button></td>
                                    </tr>
                                    <tr>
                                        <td>Mike Williams</td>
                                        <td>#3848</td>
                                        <td>N6,000</td>
                                        <td>2022/09/18</td>
                                        <td>Paid</td>
                                        <td><button class="btn btn-outline-success">Details</button></td>
                                    </tr>
                                    <tr>
                                        <td>Damilola Ade</td>
                                        <td>#3848</td>
                                        <td>N12,000</td>
                                        <td>2022/09/12</td>
                                        <td>Paid</td>
                                        <td><button class="btn btn-outline-success">Details</button></td>
                                    </tr>
                                    <tr>
                                        <td>Aisha Sambo</td>
                                        <td>#3848</td>
                                        <td>N2,600</td>
                                        <td>2022/09/07</td>
                                        <td>Paid</td>
                                        <td><button class="btn btn-outline-success">Details</button></td>
                                    </tr>
                                    <tr>
                                        <td>Johnson John</td>
                                        <td>#3848</td>
                                        <td>N23,000</td>
                                        <td>2022/09/22</td>
                                        <td>Paid</td>
                                        <td><button class="btn btn-outline-success">Details</button></td>
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