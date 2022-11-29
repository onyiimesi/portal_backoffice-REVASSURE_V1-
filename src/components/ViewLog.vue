<script>
    import axios from "axios"
    import moment from 'moment'
   

    export default{
        name: 'editorg',
        
        data(){
            return{
                errors: [],
                message: [],

                log: {
                    request: '',
                    response: '',
                    createdBy: '',
                    created: '',
                    action: '',
                    clientIP: '',
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

                loaderDiv: '',
                mainDiv: 'd-none',
                roles: '0',
            
            }
        },

        async mounted(){

            this.role = localStorage.getItem('role');

            if(this.roles != this.role){
                localStorage.removeItem('token');
                this.$router.push('/');
            }

            const resul = await axios.get('api/Users/profile', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.customerDetails = resul.data.result;

            const result = await axios.get('api/Audit/details/'+this.$route.params.id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.log = result.data.result;
            this.loaderDiv = "d-none";
            this.mainDiv = "";

        },

        methods: {
            dateTime(value) {
                return moment(value).format('MMMM Do YYYY, h:mm:ss a');
            },
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
                              <h4 class="mb-0">View Log <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}}</span> // <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">View Log</li>
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
                                <div class="row p-2">
                                    <div class="col-md-10 table-responsive">
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
                                        <table class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                            <tbody>
                                                <tr>
                                                    <th>User Email</th>
                                                    <td>{{ log.createdBy }}</td>
                                                </tr>
                                                <tr>
                                                    <th>Action</th>
                                                    <td>{{ log.action }}</td>
                                                </tr>
                                                <tr>
                                                    <th>IP Address</th>
                                                    <td>{{ log.clientIP }}</td>
                                                </tr>
                                                <tr>
                                                    <th>Date</th>
                                                    <td>{{ dateTime(log.created) }}</td>
                                                </tr>
                                                <tr>
                                                    <th>Request</th>
                                                    <td>{{ log.request }}</td>
                                                </tr>
                                                <tr>
                                                    <th>Response</th>
                                                    <td>{{ log.response }}</td>
                                                </tr>
                                            
                                            </tbody>
                                        </table>
                                        </div>
                                    </div>      
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