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

                role: null,

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
                            <h4 class="mb-0">View Sub-Organisations</h4>

                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                    <li class="breadcrumb-item active">View Sub-Organisations</li>
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
                                <div>
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
                                </div><hr>
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>Sub-Organisation Code</th>
                                        <th>Sub-Organisation Name</th>
                                        <th>Organisation Code</th>
                                        <th>Action</th>
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                    
                                    <tr v-for="cari in caris" :key="cari.id">
                                        <td>{{cari.subOrganisationCode}}</td>
                                        <td>{{cari.subOrganisation1}}</td>
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
                                <div>
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
                                </div><hr>
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>Sub-Organisation Code</th>
                                        <th>Sub-Organisation Name</th>
                                        <th>Organisation Code</th>
                                        <!-- <th>Action</th> -->
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                    <tr v-for="cari in caris" :key="cari.id">
                                        <td>{{cari.subOrganisationCode}}</td>
                                        <td>{{cari.subOrganisation1}}</td>
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
                                        <th>Sub-Organisation Code</th>
                                        <th>Sub-Organisation Name</th>
                                        <th>Organisation Code</th>
                                        <th>Action</th>
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>
                                    <tbody>
                                    
                                    <tr>
                                        
                                        <td>{{this.cariss.data.result.subOrganisationCode}}</td>
                                        <td>{{this.cariss.data.result.subOrganisation1}}</td>
                                        <td>{{this.cariss.data.result.organisationCode}}</td>
                                        <td>
                                            <router-link :to="'/edit-suborg/'+this.cariss.data.result.id"><button class="btn btn-success mr-2">Edit</button></router-link>
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
                                        <th>Organisation Code</th>
                                        <th>Sub-Organisation Code</th>
                                        <th>Sub-Organisation Name</th>
                                        <th>Action</th>
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                    <tr v-for="sub in allorg" :key="sub.id">
                                        <td>{{sub.organisationCode}}</td>
                                        <td>{{sub.subOrganisationCode}}</td>
                                        <td>{{sub.subOrganisation1}}</td>
                                        <td>
                                            <router-link :to="'/edit-suborg/'+sub.id"><button class="btn btn-success mr-2">Edit</button></router-link>
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