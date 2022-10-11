<script>
    import axios from "axios";

    export default{
        name: 'listlga',
        
        data(){
            return{
                search: '',
                showsearch: false,
                caris: [],

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
            }
        },

        async mounted(){

            this.role = localStorage.getItem('role');

            const resu = await axios.get('api/Users/profile', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.customerDetails = resu.data.result;

        },

        methods: {
            async searchLGA(){
                await axios.get('api/Lga/alllgas/'+this.search, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },)
                .then(res => {
                    this.caris = res.data.result;
                    setTimeout(() => {
                    $("#datatable").DataTable({
                        lengthMenu: [
                        [5,10, 25, 50, -1],
                        [5,10, 25, 50, "All"],
                        ],
                        pageLength: 10,
                    });
                    });
                    this.search = ''; 
                    this.showsearch = true;
                })
                .catch(err => {
                    console.log(err);
                })
            }
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
                              <h4 class="mb-0">LGA <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} //</span> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">LGA</li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
                  <!-- end page title -->

                  
                  <div class="row">
                    <div class="col-md-12">
                        <div class="card" v-if="showsearch == true">
                            <div class="card-body table-responsive">
                                <div>
                                    <form @submit.prevent="searchLGA">
                                        <div class="row">
                                            <div class="col-md-6">

                                            </div>
                                            <div class="col-md-6">
                                                <div class="d-flex">
                                                    
                                                    <input class="form-control mr-3" type="text" v-model="search" placeholder="Enter State Code">

                                                    <button class="btn btn-outline-success ">Search</button>
                                                </div>
                                            </div>

                                            
                                        </div>
                                    </form>
                                </div><hr>
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>LGA CODE</th>
                                        <th>LGA NAME</th>
                                        <th>ACTION</th>
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                    <tr v-for="cari in caris" :key="cari.id">
                                        <td>{{cari.lgaCode}}</td>
                                        <td>{{cari.lgaName}}</td>
                                        <td>
                                            <button class="btn btn-outline-success mr-2" data-toggle="modal" :data-target="'#bs-example-modal-lg-' + cari.id">View</button>
                                        </td>

                                        <div class="modal fade" :id="'bs-example-modal-lg-' + cari.id" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    
                                                    <div class="modal-header">
                                                        <h5 id="myLargeModalLabel" class="modal-title mt-0">View LGA</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="row">
                                                            <div class="col-md-6 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">LGA Code</label>
                                                                    <h5>{{cari.lgaCode}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-6 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">LGA Name</label>
                                                                    <h5>{{cari.lgaName}}</h5>
                                                                </div>
                                                            </div>

                                                        </div><hr>

                                                        <router-link :to="'/edit-lga/'+cari.lgaCode"><button class="btn btn-outline-success" data-dismiss="modal">Edit</button></router-link>
                                                    </div>
                                                    
                                                </div><!-- /.modal-content -->
                                                
                                            </div><!-- /.modal-dialog -->
                                        </div>
                                    </tr>
                                    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        

                        <div class="card" v-if="showsearch == false">
                            <div class="card-body table-responsive">
                                <div>
                                    <form @submit.prevent="searchLGA">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="mb-4" v-if="role === 'revenue-officer' ">
                                                    <router-link class="btn btn-outline-success" to="/create-lga"><i class="fa fa-plus"></i> Create LGA</router-link>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="d-flex">
                                                    
                                                    <input class="form-control mr-3" type="text" v-model="search" placeholder="Enter State Code">

                                                    <button class="btn btn-outline-success ">Search</button>
                                                </div>
                                            </div>

                                            
                                        </div>
                                    </form>
                                </div><hr>
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>LGA Code</th>
                                        <th>LGA Name</th>
                                        <th>Action</th>
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                    
                                    <tr v-for="cari in caris" :key="cari.id">
                                        <td>{{cari.lgaCode}}</td>
                                        <td>{{cari.lgaName}}</td>
                                        <td>
                                            <router-link :to="'/customer-details/'+cari.id"><button class="btn btn-outline-success btn-sm mr-2">Edit</button></router-link>
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