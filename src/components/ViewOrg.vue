<script>

    import axios from "axios"
   

    export default{
        name: 'editorg',
        
        data(){
            return{
                errors: [],
                message: [],

                allorg: {
                    organisationCode: '',
                    organisationName: '',
                    organisationEmail: '',
                    organisationPhoneNumber: '',
                    organisationAddress: '',
                    organisationWebsite: '',
                    parentOrganisationCode: '',
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

                suborg: '',
                orgusers: '',
                loaderDiv: '',
                mainDiv: 'd-none',

                loaderDivs: '',
                mainDivs: 'd-none',

                loaderDivss: '',
                mainDivss: 'd-none',

                roles: '0',
                roless: 'portal-admin',
            
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

            this.customerDetails = resul.data.result;

            const result = await axios.get('api/Organisation/details/'+this.$route.params.organisationCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.allorg = result.data.result;
            this.loaderDiv = "d-none";
            this.mainDiv = "";

            const results = await axios.get('api/SubOrganisation/suborganizations/'+this.$route.params.organisationCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.suborg = results.data.result;
            this.loaderDivs = "d-none";
            this.mainDivs = "";
            setTimeout(() => {
            $("#datatable").DataTable({
                lengthMenu: [
                [5,10, 25, 50, -1],
                [5,10, 25, 50, "All"],
                ],
                pageLength: 5,
                retrieve: true,
            });
            });

            const resultss = await axios.get('api/Users/orgusers/'+this.$route.params.organisationCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.orgusers = resultss.data.result;
            this.loaderDivss = "d-none";
            this.mainDivss = "";
            setTimeout(() => {
            $("#datatable1").DataTable({
                lengthMenu: [
                [5,10, 25, 50, -1],
                [5,10, 25, 50, "All"],
                ],
                pageLength: 5,
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
                              <h4 class="mb-0">View Organisation <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}}</span> // <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">View Organisation</li>
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
                                <div class="row mb-5">
                                    <div class="col-md-6 mb-5">
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
                                                    <th width="200px">Name</th>
                                                    <td>{{ allorg.organisationName }}</td>
                                                </tr>
                                                <tr>
                                                    <th>Code</th>
                                                    <td>{{ allorg.organisationCode }}</td>
                                                </tr>
                                                <tr>
                                                    <th>Parent Organisation</th>
                                                    <td>{{ allorg.parentOrganisationCode }}</td>
                                                </tr>
                                                <tr>
                                                    <th>Address</th>
                                                    <td>{{ allorg.organisationAddress }}</td>
                                                </tr>
                                                <tr>
                                                    <th>Email</th>
                                                    <td>{{ allorg.organisationEmail }}</td>
                                                </tr>
                                            
                                            </tbody>
                                        </table>
                                        </div>
                                        <router-link :to="'/edit-org/'+allorg.organisationCode"><button type="button" class="btn btn-outline-success">Update</button></router-link>
                                    </div>
                                    <div class="col-md-6 mb-5">
                                        <div class="table-responsive">
                                            <table class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                            <thead>
                                            <tr>
                                                <th></th>
                                                <th>Count</th>
                                                <th>Amount</th>
                                            </tr>
                                            </thead>


                                            <tbody>
                                                <tr>
                                                    <td>Bill (NGN)</td>
                                                    <td>1,159</td>
                                                    <td>N20,000</td>
                                                </tr>

                                                <tr>
                                                    <td>Payment (NGN)</td>
                                                    <td>959</td>
                                                    <td>N120,000</td>
                                                </tr>

                                                <tr>
                                                    <td>Bill (USD)</td>
                                                    <td>559</td>
                                                    <td>$23,000</td>
                                                </tr>

                                                <tr>
                                                    <td>Payment (USD)</td>
                                                    <td>259</td>
                                                    <td>$1,000</td>
                                                </tr>

                                            
                                            </tbody>
                                        </table>
                                        </div>
                                    </div>      
                                </div>
                                
                                
                                <div class="row">
                                    
                                    <div class="col-md-6 mb-5 table-responsive">
                                        <h5 class="pb-2">Units</h5>
                                        <div :class="this.loaderDivs">
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
                                        <div :class="this.mainDivs">
                                        <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Unit</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                                <tr v-for=" (sub, count) in suborg">
                                                    <td>{{count + 1}}</td>
                                                    <td>{{sub.subOrganisationName}}</td>
                                                    <td><router-link :to="'/view-unit/'+sub.subOrganisationCode"><button class="btn btn-outline-success btn-sm">View</button></router-link></td>
                                                </tr>
                                            
                                            </tbody>
                                        </table>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <h5 class="pb-2">Users</h5>
                                        <div :class="this.loaderDivss">
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
                                        <div :class="this.mainDivss">
                                        <div class="table-responsive">
                                            <table id="datatable1" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Full name</th>
                                                <th>Email</th>
                                                
                                                <th>Action</th>
                                            </tr>
                                            </thead>


                                            <tbody>
                                                <tr v-for="(user, count) in orgusers">
                                                    <td>{{count + 1}}</td>
                                                    <td>{{user.firstName}} {{user.middleName}} {{user.lastName}}</td>
                                                    <td>{{user.emailAddress}}</td>
                                                    
                                                    <td><button class="btn btn-outline-success btn-sm">View</button></td>
                                                </tr>                                           
                                            </tbody>
                                        </table>
                                        </div>
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