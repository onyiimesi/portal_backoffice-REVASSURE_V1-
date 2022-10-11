<script>
    import axios from "axios";

    export default{
        name: 'listsuborganization',
        
        data(){
            return{
                name: '',
                // allorg: [],

                search: '',
                showsearch: false,
                caris: [],

                role: '',

                subsearch: '',
                showsubsearch: false,
                cariss: [],

                allorg: [],

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


            this.role = localStorage.getItem('role');

            const result = await axios.get('api/SubOrganisation/suborganizations/'+this.customerDetails.organizationCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.allorg = result.data.result;
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
                            <h4 class="mb-0">Sub-Organizations <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} // </span><span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                    <li class="breadcrumb-item active">Sub-Organizations</li>
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- end page title -->

                  
                <div class="row" v-if="role === 'PortalAdmin' || role === '0' ">
                    <div class="col-12">
                        <div class="card" v-if="showsearch == true">
                            <div class="card-body table-responsive">
                                <!-- <div>
                                    <form @submit.prevent="searchOrg">
                                        <div class="row">
                                            <div class="col-md-6">

                                            </div>
                                            <div class="col-md-6">
                                                <div class="d-flex">
                                                    
                                                    <input class="form-control mr-3" type="text" v-model="search" placeholder="Enter Organisation Code">

                                                    <button class="btn btn-success ">Search</button>
                                                </div>
                                            </div>

                                            
                                        </div>
                                    </form>
                                </div><hr> -->
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>Sub-Organization Code</th>
                                        <th>Sub-Organization Name</th>
                                        <th>Organization Code</th>
                                        <th>Action</th>
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                    
                                    <tr v-for="cari in caris" :key="cari.id">
                                        <td>{{cari.subOrganisationCode}}</td>
                                        <td>{{cari.subOrganisationName}}</td>
                                        <td>{{cari.organisationCode}}</td>
                                        <td>
                                            <router-link :to="'/edit-org/'+cari.id"><button class="btn btn-success mr-2">Edit</button></router-link>
                                        </td>
                                        <!-- <td>61</td> -->
                                    </tr>
                                    <!-- <tr class="text-center">
                                        <td colspan="7"><h3 style="color: red;">Customer Not Found!</h3></td>
                                    </tr> -->
                                    </tbody>
                                </table>
                            </div>
                        </div><hr>

                        <div class="card" v-if="showsearch == false">
                            <div class="card-body table-responsive">
                                <!-- <div>
                                    <form @submit.prevent="searchOrg">
                                        <div class="row">
                                            <div class="col-md-6">

                                            </div>
                                            <div class="col-md-6">
                                                <div class="d-flex">
                                                    
                                                    <input class="form-control mr-3" type="text" v-model="search" placeholder="Enter Organisation Code">

                                                    <button class="btn btn-success ">Search</button>
                                                </div>
                                            </div>

                                            
                                        </div>
                                    </form>
                                </div><hr> -->
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>Sub-Organization Code</th>
                                        <th>Sub-Organization Name</th>
                                        <th>Organization Code</th>
                                        <!-- <th>Action</th> -->
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                    <tr v-for="cari in caris" :key="cari.id">
                                        <td>{{cari.subOrganisationCode}}</td>
                                        <td>{{cari.subOrganisationName}}</td>
                                        <td>{{cari.organisationCode}}</td>
                                        <!-- <td>
                                            <router-link :to="'/edit-org/'+cari.id"><button class="btn btn-success mr-2">Edit</button></router-link>
                                        </td> -->
                                        <!-- <td>61</td> -->
                                    </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div> <!-- end col -->
                </div> <!-- end row -->

                

                <div class="row" v-if="role === 'PortalAdmin' || role === 'org-admin' || role === '0' ">
                    <div class="col-12">
                        <div class="card" v-if="showsubsearch == true">
                            <div class="card-body table-responsive">
                                <!-- <div>
                                    <form @submit.prevent="searchSubOrg">
                                        <div class="row">
                                            <div class="col-md-6">

                                            </div>
                                            <div class="col-md-6">
                                                <div class="d-flex">
                                                    
                                                    <input class="form-control mr-3" type="text" v-model="subsearch" placeholder="Enter Sub-Organisation Code">

                                                    <button class="btn btn-success ">Search</button>
                                                </div>
                                            </div>

                                            
                                        </div>
                                    </form>
                                </div><hr> -->
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>Sub-Organization Code</th>
                                        <th>Sub-Organization Name</th>
                                        <th>Organization Code</th>
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
                                            <router-link :to="'/edit-suborg/'+this.cariss.data.result.subOrganisationCode"><button class="btn btn-outline-success mr-2">Edit</button></router-link>
                                        </td>
                                        <!-- <td>61</td> -->
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="card" v-if="showsubsearch == false">
                            <div class="card-body table-responsive">
                                <div class="mb-4 text-right" v-if="role === 'org-admin' ">
                                    <router-link class="btn btn-outline-success" to="/create-sub-organization"><i class="fa fa-plus"></i> Create Sub-Organization</router-link>
                                </div>
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <!-- <th>Organisation Code</th> -->
                                        <th>Sub-Organization Code</th>
                                        <th>Sub-Organization Name</th>
                                        <th>Action</th>
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                    <tr v-for="sub in allorg" :key="sub.id">
                                        <!-- <td>{{sub.organisationCode}}</td> -->
                                        <td>{{sub.subOrganisationCode}}</td>
                                        <td>{{sub.subOrganisationName}}</td>
                                        <td>
                                            <!-- <router-link :to="'/edit-suborg/'+sub.subOrganisationCode"><button class="btn btn-success mr-2">Edit</button></router-link> -->
                                            <button class="btn btn-outline-success mr-2" data-toggle="modal" :data-target="'#bs-example-modal-lg-' + sub.subOrganisationCode">View</button>
                                        </td>
                                        <!-- <td>61</td> -->


                                        <div class="modal fade" :id="'bs-example-modal-lg-' + sub.subOrganisationCode" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    
                                                    <div class="modal-header">
                                                        <h5 id="myLargeModalLabel" class="modal-title mt-0">View Sub-Organization</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="row">
                                                            <div class="col-6 col-md-6 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Sub-Organisation Code</label>
                                                                    <h5>{{sub.subOrganisationCode}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-6 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Sub-Organisation Name</label>
                                                                    <h5>{{sub.subOrganisationName}}</h5>
                                                                </div>
                                                            </div>

                                                        </div><hr>
                                                    
            
                                                        <router-link :to="'/edit-suborg/'+sub.subOrganisationCode"><button class="btn btn-outline-success" data-dismiss="modal">Edit Sub-Organization</button></router-link>
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