<script>
    import axios from "axios";

    export default{
        name: 'listorganization',
        
        data(){
            return{
                name: '',

                allorg: [],

                allorgs: [],

                search: '',
                showsearch: false,

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
            }
        },

        async mounted(){
            this.role = localStorage.getItem('role');

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
            this.showpar = false;
            this.showsearch = false;

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
                              <h4 class="mb-0">Organizations <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}}</span> // <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span> </h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">Organizations</li>
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
                                <div class="mb-4">
                                    <form>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="mb-2 float-left">
                                                    <label for="">Choose Parent Organization</label>
                                                    <select @change="onChange($event)" v-model="organisationCode" class="form-control" style="width: 200px; !important">
                                                        <option v-for="org in allorg" :value="org.organisationCode">{{org.organisationCode}}</option>
                                                    </select>
                                                </div>
                                            
                                                <div class="mt-3 float-right" v-if="role === '0' || role === 'portal-admin' ">
                                                    <router-link to="/create-organization"><button class="btn btn-outline-success"><i class="fa fa-plus"></i> Create Organization</button></router-link>
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
                                            <th>Organization Code</th>
                                            <th>Organization Name</th>
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
                                                <router-link :to="'/edit-org/'+item.organisationCode"><button class="btn btn-outline-success mr-2" data-toggle="modal" data-target=".bs-example-modal-center">Edit</button></router-link>
                                            </td>
                                            <!-- <td>61</td> -->
                                        </tr>
                                        </tbody>
                                    </table>
                                    
                                    <a href="/list-organization"><button class="btn btn-outline-success">Go Back</button></a>
                                </div>

                                <div v-if="this.showpar == true && this.showsearch == false">
                                    <table class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                        <thead>
                                        <tr>
                                            <th>Parent Code</th>
                                            <th>Organization Code</th>
                                            <th>Organization Name</th>
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
                                                <router-link :to="'/edit-org/'+item.organisationCode"><button class="btn btn-outline-success mr-2">Edit</button></router-link>
                                            </td>
                                            <!-- <td>61</td> -->
                                        </tr>
                                        </tbody>
                                    </table>
                                    <a href="/list-organization"><button class="btn btn-outline-success">Go Back</button></a>
                                </div>

                                <div v-if="this.showpar == false">
                                    <table id="datatable" class="table table-border-success table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                        <thead>
                                        <tr>
                                            <th>Parent Code</th>
                                            <th>Organization Code</th>
                                            <th>Organization Name</th>
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
                                                <button class="btn btn-outline-success mr-2" data-toggle="modal" :data-target="'#bs-example-modal-lg-' + item.organisationCode">View</button>
                                            </td>
                                            

                                            <div class="modal fade" :id="'bs-example-modal-lg-' + item.organisationCode" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                                <div class="modal-dialog modal-dialog-centered modal-lg">
                                                    <div class="modal-content">
                                                        
                                                        <div class="modal-header">
                                                            <h5 id="myLargeModalLabel" class="modal-title mt-0">View Organization</h5>
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <div class="row">
                                                                <div class="col-6 col-md-4 mb-4">
                                                                    <div class="form-group">
                                                                        <label class="control-label">Organisation Name</label>
                                                                        <h5>{{item.organisationName}}</h5>
                                                                    </div>
                                                                </div>

                                                                <div class="col-6 col-md-4 mb-4">
                                                                    <div class="form-group">
                                                                        <label class="control-label">Email Address</label>
                                                                        <h5>{{item.organisationEmail}}</h5>
                                                                    </div>
                                                                </div>

                                                                <div class="col-6 col-md-4 mb-4">
                                                                    <div class="form-group">
                                                                        <label class="control-label">Phone Number</label>
                                                                        <h5>{{item.organisationPhoneNumber}}</h5>
                                                                    </div>
                                                                </div>

                                                                <div class="col-6 col-md-4 mb-4">
                                                                    <div class="form-group">
                                                                        <label class="control-label">Office Address</label>
                                                                        <h5>{{item.organisationAddress}}</h5>
                                                                    </div>
                                                                </div>

                                                                <div class="col-6 col-md-4 mb-4">
                                                                    <div class="form-group">
                                                                        <label class="control-label">Website</label>
                                                                        <h5>{{item.organisationWebsite}}</h5>
                                                                    </div>
                                                                </div>

                                                            </div><hr>
                                                        
                                                        
                                                            <router-link :to="'/edit-org/'+item.organisationCode"><button type="button" class="btn btn-outline-success" data-dismiss="modal">Edit Organization</button></router-link>
                                                        </div>
                                                        
                                                    </div><!-- /.modal-content -->
                                                    
                                                </div><!-- /.modal-dialog -->
                                            </div>
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
<style>
    .modal-footer button{
        float: left !important;
        margin: 0 0 0 200px !important;
    }
</style>