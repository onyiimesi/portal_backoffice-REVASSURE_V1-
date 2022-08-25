<script>
    import axios from "axios";

    export default{
        data(){
            return{
                search: '',
                allcustomer: [],

                showsearch: false,
                caris: []
            }
        },

        async mounted(){
            const result = await axios.get('api/Customer/allcustomer', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.allcustomer = result.data.result;

        },

        methods: {
            async searchCustomer(){
                await axios.get('api/Customer/search?search='+this.search, {
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
                              <h4 class="mb-0">Customer Search</h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">Customer Search</li>
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
                                    <form @submit.prevent="searchCustomer">
                                        <div class="row">
                                            <div class="col-md-6">

                                            </div>
                                            <div class="col-md-6">
                                                <div class="d-flex">
                                                    
                                                    <input class="form-control mr-3" type="text" v-model="search" placeholder="Enter NIN or BVN or Fullname">

                                                    <button class="btn btn-success ">Search</button>
                                                </div>
                                            </div>

                                            
                                        </div>
                                    </form>
                                </div><hr>
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>CUSTOMER CODE</th>
                                        <th>CUSTOMER TYPE</th>
                                        <th>CUSTOMER NAME</th>
                                        <th>NATIONAL IDENTITY NUMBER</th>
                                        <th>MOBILE NUMBER</th>
                                        <th>STATE CODE</th>
                                        <th>ACTION</th>
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                    <tr v-if="!caris.length" class="text-center">
                                        <td colspan="7"><h3 style="color: red;">Customer Not Found!</h3></td>
                                    </tr>
                                    <tr v-for="cari in caris" :key="cari.id">
                                        <td>{{cari.customerCode}}</td>
                                        <td v-if="cari.customerTYpe == 10">
                                            Individual
                                        </td>
                                        <td v-if="cari.customerTYpe == 11">
                                            Corporate
                                        </td>
                                        <td>{{cari.firstname}} {{cari.lastname}}</td>
                                        <td>{{cari.nin}}</td>
                                        <td>{{cari.mobileNumber1}} {{cari.mobileNumber2}}</td>
                                        <td>{{cari.stateCode}}</td>
                                        <td>
                                            <router-link :to="'/customer-details/'+cari.id"><button class="btn btn-success btn-sm mr-2">View Profile</button></router-link>
                                        </td>
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
                                <div>
                                    <form @submit.prevent="searchCustomer">
                                        <div class="row">
                                            <div class="col-md-6">

                                            </div>
                                            <div class="col-md-6">
                                                <div class="d-flex">
                                                    
                                                    <input class="form-control mr-3" type="text" v-model="search" placeholder="Enter NIN or BVN or Fullname">

                                                    <button class="btn btn-success ">Search</button>
                                                </div>
                                            </div>

                                            
                                        </div>
                                    </form>
                                </div><hr>
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>CUSTOMER CODE</th>
                                        <!-- <th>CUSTOMER TYPE</th> -->
                                        <th>CUSTOMER NAME</th>
                                        <th>NATIONAL IDENTITY NUMBER</th>
                                        <th>MOBILE NUMBER</th>
                                        <th>STATE CODE</th>
                                        <th>ACTION</th>
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                    <tr v-for="item in allcustomer" :key="item.id">
                                        <td>{{item.customerCode}}</td>
                                        <!-- <td v-if="item.customerTYpe == 10">
                                            Individual
                                        </td>
                                        <td v-if="item.customerTYpe == 11">
                                            Corporate
                                        </td> -->
                                        <td>{{item.firstname}} {{item.lastname}}</td>
                                        <td>{{item.nin}}</td>
                                        <td>{{item.mobileNumber1}} {{item.mobileNumber2}}</td>
                                        <td>{{item.stateCode}}</td>
                                        <td>
                                            <router-link :to="'/customer-details/'+item.id"><button class="btn btn-success btn-sm mr-2">View Profile</button></router-link>
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