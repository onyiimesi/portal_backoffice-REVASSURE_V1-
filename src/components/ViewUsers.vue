<script>
    import axios from "axios";

    export default{
        name: 'viewbanks',
        
        data(){
            return{
                name: '',
                allusers: [],

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

                search: '',
                showsearch: false,
                caris: []
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


            const result = await axios.get('api/Users/users', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.allusers = result.data.result;
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
            async searchUser(){
                await axios.get('api/Users/search?searchstring='+this.search, {
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
                              <h4 class="mb-0">View Users <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} //</span> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">View Users</li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
                  <!-- end page title -->

                  
                  <div class="row">
                    <div class="col-12">
                        <div class="card" v-if="showsearch == true">
                            <div class="card-body table-responsive">
                                <!-- <div>
                                    <form @submit.prevent="searchCustomer">
                                        <div class="row">
                                            <div class="col-md-6">

                                            </div>
                                            <div class="col-md-6">
                                                <div class="d-flex">
                                                    
                                                    <input class="form-control mr-3" type="text" v-model="search" placeholder="Enter Name">

                                                    <button class="btn btn-success ">Search</button>
                                                </div>
                                            </div>

                                            
                                        </div>
                                    </form>
                                </div><hr> -->
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email Address</th>
                                        <!-- <th>Organisation Code</th>
                                        <th>Sub-Organisation Code</th> -->
                                        <!-- <th>Action</th> -->
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                    <tr v-if="!caris.length" class="text-center">
                                        <td colspan="7"><h3 style="color: red;">User Not Found!</h3></td>
                                    </tr>
                                    <tr v-for="cari in caris" :key="cari.id">
                                        <td>{{cari.firstName}}</td>
                                        <td>{{cari.lastName}}</td>
                                        <td>{{cari.emailAddress}}</td>
                                        <!-- <td>{{this.customerDetails.organizationCode}}</td>
                                        <td>{{this.customerDetails.subOrganisationCode}}</td> -->
                                        <!-- <td>
                                            <router-link :to="'/customer-details/'+cari.id"><button class="btn btn-success btn-sm mr-2">View Profile</button></router-link>
                                        </td> -->
                                    </tr>
                                    <!-- <tr class="text-center">
                                        <td colspan="7"><h3 style="color: red;">Customer Not Found!</h3></td>
                                    </tr> -->
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="card" v-if="showsearch == false">
                            <div class="card-body table-responsive">
                                <div class="mb-4 text-right">
                                    <router-link class="btn btn-outline-success" to="/create-user"><i class="fa fa-plus"></i> Create User</router-link>
                                </div>
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email Address</th>
                                        <!-- <th>Organisation Code</th>
                                        <th>Sub-Organisation Code</th> -->
                                        <!-- <th>Action</th> -->
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                    <tr v-for="item in allusers" :key="item.id">
                                        <td>{{item.firstName}}</td>
                                        <td>{{item.lastName}}</td>
                                        <td>{{item.emailAddress}}</td>
                                        <!-- <td>{{this.customerDetails.organizationCode}}</td>
                                        <td>{{this.customerDetails.subOrganisationCode}}</td> -->
                                        <!-- <td>
                                            <router-link :to="'/edit-user/'+item.id"><button class="btn btn-success mr-2">Edit</button></router-link>
                                        </td> -->
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