<script>
    import axios from "axios";

    export default{
        name: 'listunits',
        
        data(){
            return{
                name: '',
                // allorg: [],

                search: '',
                showsearch: false,
                caris: [],
                role: null,

                subsearch: '',
                showsubsearch: false,
                cariss: [],
            }
        },

        async mounted(){
            this.role = localStorage.getItem('role');
        },

        methods: {
            async searchUnit(){
                await axios.get('api/Units/details/'+this.search, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },)
                .then(res => {
                    this.caris = res;
                    this.search = ''; 
                    this.showsearch = true;
                })
                .catch(err => {
                    console.log(err);
                })
            },

            async searchSubOrg(){
                await axios.get('api/Units/units/'+this.subsearch, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },)
                .then(res => {
                    this.cariss = res.data.result;
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
                            <h4 class="mb-0">View Units</h4>

                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                    <li class="breadcrumb-item active">View Units</li>
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- end page title -->

                  
                <div class="row mb-4" v-if="role === 'PortalAdmin' || role === '0' ">
                    <div class="col-12">
                        <div class="card" v-if="showsearch == true">
                            <div class="card-body table-responsive">
                                <div>
                                    <form @submit.prevent="searchOrg">
                                        <div class="row">
                                            <div class="col-md-6">

                                            </div>
                                            <div class="col-md-6">
                                                <div class="d-flex">
                                                        
                                                    <input class="form-control mr-3" type="text" v-model="search" placeholder="Enter Unit Code">

                                                    <button class="btn btn-success ">Search</button>
                                                </div>
                                            </div>

                                            
                                        </div>
                                    </form>
                                </div><hr>
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>Unit Code</th>
                                        <th>Unit Name</th>
                                        <th>Sub-Organisation Code</th>
                                        <th>Sub-Organisation Name</th>
                                        <th>Action</th>
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                        
                                        <tr>
                                            <td>{{this.caris.data.result.unitCode}}</td>
                                            <td>{{this.caris.data.result.unitName}}</td>
                                            <td>{{this.caris.data.result.subOrganisationCode}}</td>
                                            <td>{{this.caris.data.result.organisationCode}}</td>
                                            <td>
                                                <router-link :to="'/edit-org/'+this.caris.data.result.unitID"><button class="btn btn-success mr-2">Edit</button></router-link>
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
                                <div>
                                    <form @submit.prevent="searchUnit">
                                        <div class="row">
                                            <div class="col-md-6">

                                            </div>
                                            <div class="col-md-6">
                                                <div class="d-flex">
                                                    
                                                    <input class="form-control mr-3" type="text" v-model="search" placeholder="Enter Unit Code">

                                                    <button class="btn btn-success ">Search</button>
                                                </div>
                                            </div>

                                            
                                        </div>
                                    </form>
                                </div><hr>
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>Unit Code</th>
                                        <th>Unit Name</th>
                                        <th>Sub-Organisation Code</th>
                                        <th>Sub-Organisation Name</th>
                                        <th>Action</th>
                                        <!-- <th>Action</th> -->
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                        <tr v-for="cari in caris" :key="cari.id">
                                            <td>{{cari.unitCode}}</td>
                                            <td>{{cari.unitName}}</td>
                                            <td>{{cari.subOrganisationCode}}</td>
                                            <td>{{cari.organisationCode}}</td>
                                            <td>
                                                <router-link :to="'/edit-unit/'+cari.id"><button class="btn btn-success mr-2">Edit</button></router-link>
                                            </td>
                                            <!-- <td>61</td> -->
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div> <!-- end col -->
                </div> <!-- end row -->

                <div class="row" v-if="role === 'PortalAdmin' || role === 'OrgAdmin' || role === '0' ">
                    <div class="col-12">
                        <div class="card" v-if="showsubsearch == true">
                            <div class="card-body table-responsive">
                                <div>
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
                                </div><hr>
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>Unit Code</th>
                                        <th>Unit Name</th>
                                        <th>Sub-Organisation Code</th>
                                        <th>Organisation Code</th>
                                        <th>Action</th>
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                    
                                        <tr v-for="item in cariss" :key="item.unitID">
                                            <!-- <td>{{this.cariss}}</td> -->
                                            <td>{{item.unitCode}}</td>
                                            <td>{{item.unitName}}</td>
                                            <td>{{item.subOrganisationCode}}</td>
                                            <td>{{item.organisationCode}}</td>
                                            <td>
                                                <router-link :to="'/edit-unit/'+item.unitID"><button class="btn btn-success mr-2">Edit</button></router-link>
                                            </td>
                                            <!-- <td>61</td> -->
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div><hr>

                        <div class="card" v-if="showsubsearch == false">
                            <div class="card-body table-responsive">
                                <div>
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
                                </div><hr>
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>Unit Code</th>
                                        <th>Unit Name</th>
                                        <th>Sub-Organisation Code</th>
                                        <th>Organisation Code</th>
                                        <th>Action</th>
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                        <tr v-for="item in cariss" :key="item.unitID">
                                            <td>{{item.unitCode}}</td>
                                            <td>{{item.unitName}}</td>
                                            <td>{{item.subOrganisationCode}}</td>
                                            <td>{{item.organisationCode}}</td>
                                            <td>
                                                <router-link :to="'/edit-org/'+item.unitID"><button class="btn btn-success mr-2">Edit</button></router-link>
                                            </td>
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