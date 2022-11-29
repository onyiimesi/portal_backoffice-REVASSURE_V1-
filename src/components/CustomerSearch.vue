<script>
    import axios from "axios";

    export default{
        data(){
            return{
                search: '',
                allcustomer: [],

                showsearch: false,
                caris: [],

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

                code: '',
                name: '',
                email: '',
                phone: '',

                roles: 'billing-oficer',
                roless: 'revenue-officer',
            }
        },

        async mounted(){

            this.role = localStorage.getItem('role');

            if(this.roles != this.role && this.roless != this.role){
                localStorage.removeItem('token');
                this.$router.push('/');
            }

            const resul = await axios.get('api/Users/profile', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.customerDetails = resul.data.result;

            const result = await axios.get('api/Customer/allcustomer', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.allcustomer = result.data.result;
            setTimeout(() => {
            $("#datatable").DataTable({
                lengthMenu: [
                [5,10, 25, 50, -1],
                [5,10, 25, 50, "All"],
                ],
                pageLength: 10,
                language: {
                    searchPlaceholder: "Enter NIN, BVN or Full Name"
                },
                retrieve: true,
            });
            });

        },

        methods: {
            async searchCustomer(){
                await axios.get('api/Customer/search?name='+this.name+'&code='+this.code+'&email='+this.email+'&phone='+this.phone, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },)
                .then(res => {
                    this.caris = res.data.result;
                    
                    $('#datatable1').dataTable().fnDestroy();
                    setTimeout(() => {
                    $("#datatable1").DataTable({
                        lengthMenu: [
                        [5,10, 25, 50, -1],
                        [5,10, 25, 50, "All"],
                        ],
                        pageLength: 10,
                        language: {
                            searchPlaceholder: "Enter NIN, BVN or Full Name"
                        },
                        retrieve: true,
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
                              <h4 class="mb-0"><span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} //</span> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">Customer Search</li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
                  <!-- end page title -->

                  
                  <div class="row">
                    <div class="col-md-4">
                        <div class="card">
                            <h5 class="pt-3 pb-3 pl-3 pr-3">Customer Search</h5>
                            <div class="card-body table-responsive border-top">
                                <form @submit.prevent="searchCustomer">
                                    <div class="mb-3">
                                        <input class="form-control mr-3" type="text" v-model="code" placeholder="Customer Code">
                                    </div>
                                    <div class="mb-3">
                                        <input class="form-control mr-3" type="text" placeholder="First Name or Last Name" v-model="name">
                                    </div>
                                    <div class="mb-3">
                                        <input class="form-control mr-3" type="email" placeholder="Email Address" v-model="email">
                                    </div>
                                    <div class="mb-3">
                                        <input class="form-control mr-3" type="text" placeholder="Phone Number" v-model="phone">
                                    </div>
                                    <div class="mb-3">
                                        <button class="btn btn-outline-success">Search</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="card" v-if="showsearch == true">
                            <div class="card-body table-responsive">
                                
                                <table id="datatable1" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>Customer Number</th>
                                        <th>Customer Name</th>
                                        <!-- <th>Customer Type</th> -->
                                        <th>Mobile Number</th>
                                        <th>Action</th>
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                    <tr v-if="!caris.length" class="text-center">
                                        <td colspan="7"><h3 style="color: red;">Customer Not Found!</h3></td>
                                    </tr>
                                    <tr v-for="cari in caris" :key="cari.id">
                                        <td>{{cari.customerCode}}</td>
                                        
                                        <td>{{cari.firstname}} {{cari.lastname}}</td>
                                        <!-- <td v-if="cari.customerTYpe == 10">
                                            Individual
                                        </td>
                                        <td v-if="cari.customerTYpe == 11">
                                            Corporate
                                        </td> -->
                                        <td>{{cari.mobileNumber1}}, {{cari.mobileNumber2}}</td>
                                        <td>
                                            <router-link :to="'/customer-details/'+cari.customerCode"><button class="btn btn-outline-success btn-sm mr-2">View</button></router-link>
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
                            <h5 class="pt-3 pb-3 pl-3 pr-3">Recent Search</h5>
                            <div class="card-body table-responsive border-top">
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>Customer Number</th>
                                        <!-- <th>CUSTOMER TYPE</th> -->
                                        <th>Customer Name</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>


                                    <tbody>
                                    <tr v-for="item in caris" :key="item.id">
                                        <td>{{item.customerCode}}</td>
                                        <!-- <td v-if="item.customerTYpe == 10">
                                            Individual
                                        </td>
                                        <td v-if="item.customerTYpe == 11">
                                            Corporate
                                        </td> -->
                                        <td>{{item.firstname}} {{item.lastname}}</td>
                                        
                                        <td>
                                            <router-link :to="'/customer-details/'+item.customerCode"><button class="btn btn-outline-success mr-2">View</button></router-link>
                                        </td>
                                        
                                        <div class="modal fade" :id="'bs-example-modal-lg-' + item.customerCode" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered modal-lg">
                                                <div class="modal-content">
                                                    
                                                    <div class="modal-header">
                                                        <h5 id="myLargeModalLabel" class="modal-title mt-0">Customer Information</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="row">
                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Customer Code</label>
                                                                    <h5>{{item.customerCode}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Customer Name</label>
                                                                    <h5>{{item.firstname}} {{item.lastname}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Email Address</label>
                                                                    <h5>{{item.emailAddress}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Phone Number</label>
                                                                    <h5>{{item.mobileNumber1}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Phone Number (2)</label>
                                                                    <h5>{{item.mobileNumber2}}</h5>
                                                                </div>
                                                            </div>

                                                            
                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Address</label>
                                                                    <h5>{{item.contactAddress}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">State</label>
                                                                    <h5>{{item.stateCode}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">LGA</label>
                                                                    <h5>{{item.lgaCode}}</h5>
                                                                </div>
                                                            </div>

                                                        </div><hr>

                                                        <router-link :to="'/customer-details/'+item.customerCode"><button type="button" class="btn btn-outline-success" data-dismiss="modal">View Profile</button></router-link>
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