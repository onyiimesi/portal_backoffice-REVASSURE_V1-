<script>
    import axios from "axios";
    import { useToast } from "vue-toastification";

    export default{
        name: 'listorganization',
        
        data(){
            return{
                name: '',

                allorg: [],

                allorgs: [],

                search: '',
                showsearch: false,
                caris: [],

                showpar: false,

                role: '',

                roles: '0',
                roless: 'portal-admin',
                parentOrganizationCode: '',

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
            }
        },

        async mounted(){
            this.role = localStorage.getItem('role');

            if(this.roles != this.role && this.roless != this.role){
                localStorage.removeItem('token');
                this.$router.push('/');
            }


            const resultss = await axios.get('api/Users/profile',{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.customerDetails = resultss.data.result;
            
            const result = await axios.get('api/Organisation/organizations', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.allorg = result.data.result;
            this.loaderDiv = "d-none";
            this.mainDiv = "";
            this.showpar = false;
            this.showsearch = false;

            $('#datatable').dataTable().fnDestroy();
            setTimeout(() => {
            $("#datatable").DataTable({
                lengthMenu: [
                [5,10, 25, 50, -1],
                [5,10, 25, 50, "All"],
                ],
                pageLength: 25,
                bFilter: false,
                retrieve: true,
            }).clear();
            });
            
        },

        methods: {


            async onChange(event) {

                const result = await axios.get('api/Organisation/organizations/'+event.target.value, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },);

                this.allorgs = result.data.result;
                this.showpar = true;
                this.showsearch = false;
                
            },

            async searchOrg(){
                const toast = useToast()

                
                await axios.get('api/Organisation/search?search='+this.search, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },)
                .then(res => {
                    this.caris = res.data.result;

                    if(this.caris.length == 0){
                        toast.error("You can only search by organisation name or organisation code")
                    }
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
                    this.search = ''; 
                    this.showsearch = true;
                })
                .catch(err => {
                    this.eee = err.response.data.errors;
                    toast.error(this.eee.search[0])
                    
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
                              <h4 class="mb-0">Organisations <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}}</span> // <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span> </h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">Organisations</li>
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
                                <h5>Search Organisation</h5><hr>
                                <form @submit.prevent="searchOrg">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <input class="form-control mb-3" type="text" placeholder="Enter Organisation code or Organisation name" v-model="search">
                                            <button class="btn btn-outline-success">Search</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body table-responsive">
                                <div class="mb-4">
                                    <form>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="mb-2 float-left">
                                                    <label for="">Choose Parent Organisation</label>
                                                    <select @change="onChange($event)" v-model="organisationCode" class="form-control" style="width: 200px; !important">
                                                        <option v-for="org in allorg" :value="org.organisationCode">{{org.organisationCode}}</option>
                                                    </select>
                                                </div>
                                            
                                                <div class="mt-3 float-right" v-if="role === '0' || role === 'portal-admin' ">
                                                    <router-link to="/create-organization"><button class="btn btn-outline-success"><i class="fa fa-plus"></i> Create Organisation</button></router-link>
                                                </div>
                                            </div>

                                            
                                        </div>
                                    </form>
                                </div>

                                <div v-if="this.showsearch == true">
                                    <table class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                        <thead>
                                        <tr>
                                            <th>Parent Code</th>
                                            <th>Organisation Code</th>
                                            <th>Organisation Name</th>
                                            <th>Email Address</th>
                                            <th>Phone Number</th>
                                            <th>Address</th>
                                            <th>Website</th>
                                            <th>Action</th>
                                            <!-- <th>BALANCE</th> -->
                                        </tr>
                                        </thead>


                                        <tbody>
                                        <tr v-for="item in caris">
                                            <td>{{item.parentOrganisationCode}}</td>
                                            <td>{{item.organisationCode}}</td>
                                            <td>{{item.organisationName}}</td>
                                            <td>{{item.organisationEmail}}</td>
                                            <td>{{item.organisationPhoneNumber}}</td>
                                            <td>{{item.organisationAddress}}</td>
                                            <td>{{item.organisationWebsite}}</td>
                                            <td>
                                                <router-link :to="'/view-organisation/'+item.organisationCode"><button type="button" class="btn btn-outline-success">View</button></router-link>
                                            </td>
                                            <!-- <td>61</td> -->
                                        </tr>
                                        </tbody>
                                    </table>
                                    
                                    <a href="/list-organisation"><button class="btn btn-outline-success">Go Back</button></a>
                                </div>

                                <div v-if="this.showpar == true && this.showsearch == false">
                                    <table class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                        <thead>
                                        <tr>
                                            <th>Parent Code</th>
                                            <th>Organisation Code</th>
                                            <th>Organisation Name</th>
                                            <th>Email Address</th>
                                            <th>Phone Number</th>
                                            <th>Address</th>
                                            <th>Website</th>
                                            <th>Action</th>
                                            <!-- <th>BALANCE</th> -->
                                        </tr>
                                        </thead>


                                        <tbody>
                                        <tr v-for="item in allorgs">
                                            <td>{{item.parentOrganisationCode}}</td>
                                            <td>{{item.organisationCode}}</td>
                                            <td>{{item.organisationName}}</td>
                                            <td>{{item.organisationEmail}}</td>
                                            <td>{{item.organisationPhoneNumber}}</td>
                                            <td>{{item.organisationAddress}}</td>
                                            <td>{{item.organisationWebsite}}</td>
                                            <td>
                                                <router-link :to="'/view-organisation/'+item.organisationCode"><button type="button" class="btn btn-outline-success">View</button></router-link>
                                            </td>
                                            <!-- <td>61</td> -->
                                        </tr>
                                        </tbody>
                                    </table>
                                    <a href="/list-organisation"><button class="btn btn-outline-success">Go Back</button></a>
                                </div>

                                <div v-if="this.showpar == false && this.showsearch == false">
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
                                    <table id="datatable" class="table table-border-success table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                        <thead>
                                        <tr>
                                            <th>Parent Code</th>
                                            <th>Organisation Code</th>
                                            <th>Organisation Name</th>
                                            <th>Email Address</th>
                                            <!-- <th>Phone Number</th>
                                            <th>Address</th>
                                            <th>Website</th> -->
                                            <th>Action</th>
                                            <!-- <th>BALANCE</th> -->
                                        </tr>
                                        </thead>


                                        <tbody>
                                        <div>
                                            
                                        </div>
                                        <tr v-for="item in allorg">
                                            
                                            <td>{{item.parentOrganisationCode}}</td>
                                            <td>{{item.organisationCode}}</td>
                                            <td>{{item.organisationName}}</td>
                                            <td>{{item.organisationEmail}}</td>
                                            <!-- <td>{{item.organisationPhoneNumber}}</td>
                                            <td>{{item.organisationAddress}}</td>
                                            <td>{{item.organisationWebsite}}</td> -->
                                            <td>
                                                <!-- <button class="btn btn-outline-success mr-2" data-toggle="modal" :data-target="'#bs-example-modal-lg-' + item.organisationCode">View</button> -->

                                                <router-link :to="'/view-organisation/'+item.organisationCode"><button type="button" class="btn btn-outline-success">View</button></router-link>
                                            </td>
                                        
                                        </tr>
                                        </tbody>
                                    </table>
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
<style>
    .modal-footer button{
        float: left !important;
        margin: 0 0 0 200px !important;
    }
</style>