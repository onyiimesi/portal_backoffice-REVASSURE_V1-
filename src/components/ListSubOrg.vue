<script>
    import axios from "axios";

    export default{
        name: 'listsuborganization',
        
        data(){
            return{
                name: '',
                // units: [],

                search: '',
                showsearch: false,
                caris: [],

                role: '',

                subsearch: '',
                showsubsearch: false,
                cariss: [],

                units: [],

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
                roles: 'org-admin',
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


            this.role = localStorage.getItem('role');

            const result = await axios.get('api/SubOrganisation/suborganizations/'+this.customerDetails.organizationCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.units = result.data.result;
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

        methods: {
            async searchOrg(){
                await axios.get('api/SubOrganisation/suborganizations/'+this.search, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },)
                .then(res => {
                    this.caris = res.data.result;
                    this.search = ''; 
                    this.showsearch = true;
                })
                .catch(err => {
                    console.log(err);
                })
            },

            async searchSubOrg(){
                await axios.get('api/SubOrganisation/details/'+this.subsearch, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },)
                .then(res => {
                    this.cariss = res;
                    setTimeout(() => {
                    $("#datatable1").DataTable({
                        lengthMenu: [
                        [5,10, 25, 50, -1],
                        [5,10, 25, 50, "All"],
                        ],
                        pageLength: 25,
                        retrieve: true,
                    });
                    });
                    this.subsearch = ''; 
                    this.showsubsearch = true;

                })
                .catch(err => {
                    console.log(err);
                })

                
            },
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
                            <h4 class="mb-0">Units <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} // </span><span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                    <li class="breadcrumb-item active">Units</li>
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- end page title -->

                <div class="row" v-if="role === 'PortalAdmin' || role === 'org-admin' || role === '0' ">
                    <div class="col-12">
                        

                        <div class="card">
                            <div class="card-body">
                                <h5>Search Unit</h5><hr>
                                <form @submit.prevent="searchSubOrg">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <input class="form-control mb-3" type="text" placeholder="Enter Unit code" v-model="subsearch">
                                            <button class="btn btn-outline-success">Search</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="card" v-if="showsubsearch == true">
                            <div class="card-body table-responsive">
                                <table id="datatable1" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>Unit Code</th>
                                        <th>Unit</th>
                                        <th>Organisation Code</th>
                                        <th>Action</th>
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>
                                    <tbody>
                                    
                                    <tr>
                                        
                                        <td>{{this.cariss.data.result.subOrganisationCode}}</td>
                                        <td>{{this.cariss.data.result.subOrganisationName}}</td>
                                        <td>{{this.cariss.data.result.organisationCode}}</td>
                                        <td>
                                            <router-link :to="'/view-unit/'+this.cariss.data.result.subOrganisationCode"><button class="btn btn-outline-success mr-2">View</button></router-link>
                                        </td>
                                        <!-- <td>61</td> -->
                                    </tr>
                                    </tbody>
                                </table>
                                <a href="/list-unit"><button class="btn btn-outline-success">Go Back</button></a>
                            </div>
                        </div>

                        <div class="card" v-if="showsubsearch == false">
                            <div class="card-body table-responsive">
                                <div class="mb-4 text-right" v-if="role === 'org-admin' ">
                                    <router-link class="btn btn-outline-success" to="/create-unit"><i class="fa fa-plus"></i> Create Unit</router-link>
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
                                            <!-- <th>Organisation Code</th> -->
                                            <th>Unit Code</th>
                                            <th>Unit</th>
                                            <th>Action</th>
                                            <!-- <th>BALANCE</th> -->
                                        </tr>
                                    </thead>


                                    <tbody>
                                        <tr v-for="sub in units" :key="sub.id">
                                            <!-- <td>{{sub.organisationCode}}</td> -->
                                            <td>{{sub.subOrganisationCode}}</td>
                                            <td>{{sub.subOrganisationName}}</td>
                                            <td>
                                                <!-- <button class="btn btn-outline-success mr-2" data-toggle="modal" :data-target="'#bs-example-modal-lg-' + sub.subOrganisationCode">View</button> -->

                                                <router-link :to="'/view-unit/'+sub.subOrganisationCode"><button class="btn btn-outline-success">View</button></router-link>
                                            </td>
                                            <!-- <td>61</td> -->
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