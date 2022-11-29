<script>
    import axios from "axios";

    export default{
        name: 'viewbanks',
        
        data(){
            return{
                name: '',
                allbanks: [],

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

                loaderDiv: '',
                mainDiv: 'd-none',

                roless: 'revenue-officer',
            }
        },

        async mounted(){

            this.role = localStorage.getItem('role');

            if(this.roless != this.role){
                localStorage.removeItem('token');
                this.$router.push('/');
            }

            const resu = await axios.get('api/Users/profile', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.customerDetails = resu.data.result;

            const result = await axios.get('/api/Bank/allbanks', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.allbanks = result.data.result;
            this.loaderDiv = "d-none";
            this.mainDiv = "";
            setTimeout(() => {
            $("#datatable").DataTable({
                lengthMenu: [
                [5,10, 25, 50, -1],
                [5,10, 25, 50, "All"],
                ],
                pageLength: 25,
                retrieve: true,
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
                              <h4 class="mb-0">View Banks <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} //</span> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">View Banks</li>
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
                                    <router-link class="btn btn-outline-success" to="/create-bank"><i class="fa fa-plus"></i> Create Bank</router-link>
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
                                        <th>Action</th>
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                    <tr v-for="item in allbanks" :key="item.bankCode">
                                        <td>{{item.bankCode}}</td>
                                        <td>{{item.bankName}}</td>
                                        <td>
                                            <router-link :to="'/edit-bank/'+item.bankCode"><button class="btn btn-outline-success">Edit Bank</button></router-link>
                                        </td>
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