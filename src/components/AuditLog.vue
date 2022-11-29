<script>
    import axios from "axios";
    import { useToast } from "vue-toastification";
    import moment from 'moment'

    export default{
        name: 'listorganization',
        
        data(){
            return{
                name: '',

                audit: [],

                search: '',
                showsearch: false,

                searchs: '',
                showsearchs: false,
                caris: [],
                filter: [],

                showpar: false,

                role: '',
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

                modules: [],
                userEmail: '',
                action: '',
                startDate: '',
                endDate: '',

                loaderDiv: '',
                mainDiv: 'd-none',

                roles: '0',
                roless: 'portal-admin',
            }
        },

        async mounted(){
            this.role = localStorage.getItem('role');

            if(this.roles != this.role){
                localStorage.removeItem('token');
                this.$router.push('/');
            }

            const resultss = await axios.get('api/Users/profile',{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.customerDetails = resultss.data.result;
            
            const result = await axios.get('api/Audit/recent', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.audit = result.data.result;
            this.loaderDiv = "d-none";
            this.mainDiv = "";
            this.showpar = false;
            this.showsearch = false;

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

            const results = await axios.get('api/Modules/modules', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.modules = results.data.result;
            
        },

        methods: {
            dateTime(value) {
                return moment(value).format('MMMM Do YYYY, h:mm:ss a');
            },

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

            async searchLog(){
                const toast = useToast()

                if(!this.search){
                    toast.error("Field can't be empty")
                }else{

                    await axios.get('api/Audit/user/'+this.search, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    },)
                    .then(res => {
                        this.caris = res.data.result;

                        
                        setTimeout(() => {
                        $("#datatable3").DataTable({
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
                        
                        
                    })

                }

            },

            async searchLogFilter(){
                const toast = useToast()

                if(!this.userEmail){
                    toast.error("Email field can't be empty")
                }
                
                if(!this.action){
                    toast.error("Action field can't be empty")
                }
                
                if(!this.startDate){
                    toast.error("Specify a start date")
                }
                
                if(!this.endDate){
                    toast.error("Specify an end date")
                }else{
                    await axios.post('api/Audit/search', {
                        userEmail: this.userEmail,
                        action: this.action,
                        startDate: this.startDate,
                        endDate: this.endDate,
                        
                    }, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    },)
                    .then(res => {
                       
                        this.filter = res.data.result;

                        $('#datatable3').dataTable().fnDestroy();
                        setTimeout(() => {
                        $("#datatable3").DataTable({
                            lengthMenu: [
                            [5,10, 25, 50, -1],
                            [5,10, 25, 50, "All"],
                            ],
                            pageLength: 25,
                            retrieve: true,
                        });
                        });
                        this.searchs = ''; 
                        this.showsearchs = true;
                    })
                    .catch(err => {
                        this.eee = err.response.data.errors;
                        
                        
                    })
                }
                

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
                                <h5>Search Log</h5><hr>
                                <div class="row">
                                    <!-- <div class="col-md-6 border-right pl-4 pr-4 mb-4">
                                        <form @submit.prevent="searchLog">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <label for="">User Email</label>
                                                    <input class="form-control mb-3" type="text" placeholder="Enter User Email" v-model="search">
                                                    <button class="btn btn-outline-success">Search</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div> -->

                                    <div class="col-md-12 pl-4 pr-4">
                                        <form @submit.prevent="searchLogFilter">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    
                                                    
                                                    <!-- <select v-model="action" class="form-control mb-3">
                                                        <option v-for="mod in modules" :value="mod.modCode">
                                                            {{mod.modName}}
                                                        </option>
                                                    </select> -->
                                                    <div class="row">
                                                        <div class="col-md-3">
                                                            <label for="">User Email</label>
                                                            <input class="form-control mb-3" type="text" placeholder="Enter User Email" v-model="userEmail">
                                                        </div>
                                                        <div class="col-md-3">
                                                            <label for="">Action</label>
                                                            <input class="form-control mb-3" type="text" placeholder="Enter Action" v-model="action">
                                                        </div>
                                                    
                                                        <div class="col-md-3">
                                                            <label for="">Start Date</label>
                                                            <input type="datetime-local" class="form-control mb-3" v-model="startDate"> 
                                                        </div>
                                                        <div class="col-md-3">
                                                            <label for="">End Date</label>
                                                            <input type="datetime-local" class="form-control mb-3" v-model="endDate">
                                                        </div>
                                                    </div>
                                                    <button class="btn btn-outline-success">Search</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body table-responsive">

                                <div v-if="this.showsearch == true">
                                    <table id="datatable3" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Email</th>
                                            <th>Action</th>
                                            <th>IP Address</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>


                                        <tbody>
                                            
                                            <tr v-for="(item, count) in caris">
                                                <td>{{count + 1}}</td>
                                                <td>{{item.createdBy}}</td>
                                                <td>{{item.action}}</td>
                                                <td>{{item.clientIP}}</td>
                                                <td>{{ dateTime(item.created) }}</td>
                                                <td><router-link class="btn btn-outline-success" :to="'/view-log/'+item.id">View</router-link></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                    <a href="/audit-log"><button class="btn btn-outline-success">Go Back</button></a>
                                </div>

                                <div v-if="this.showsearchs == true">
                                    <table id="datatable3" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Email</th>
                                            <th>Action</th>
                                            <th>IP Address</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>


                                        <tbody>
                                            <tr v-if="!filter.length" class="text-center">
                                                <td colspan="7"><h5 style="color: red;">No data available!</h5></td>
                                            </tr>
                                            <tr v-for="(item, count) in filter">
                                                <td>{{count + 1}}</td>
                                                <td>{{item.createdBy}}</td>
                                                <td>{{item.action}}</td>
                                                <td>{{item.clientIP}}</td>
                                                <td>{{ dateTime(item.created) }}</td>
                                                <td><router-link class="btn btn-outline-success" :to="'/view-log/'+item.id">View</router-link></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                    <a href="/audit-log"><button class="btn btn-outline-success">Go Back</button></a>
                                </div>

                                <div v-if="this.showsearch == false && this.showsearchs == false">
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
                                            <th>#</th>
                                            <th>User Email</th>
                                            <th>Action</th>
                                            <th>Date</th>
                                            <th>IP Address</th>
                                            <th></th>
                                        </tr>
                                        </thead>


                                        <tbody>
                                        <div>
                                            
                                        </div>
                                        <tr v-for="(item, count) in audit">
                                            <td>{{count + 1}}</td>
                                            <td>{{item.createdBy}}</td>
                                            <td>{{item.action}}</td>
                                            <td>{{ dateTime(item.created) }}</td>
                                            <td>{{item.clientIP}}</td>
                                            <td><router-link class="btn btn-outline-success" :to="'/view-log/'+item.id">View</router-link></td>

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