<script>

  import { mapGetters } from 'vuex';

  import axios from "axios"
  
  export default{
    name: 'Nav',
    name: 'dashboard',
    name: 'autologout',

    data: function(){
        return{
            events: ['click', 'mousemove', 'mousedown', 'scroll', 'keypress', 'load'],

            warningTimer: null,

            logoutTimer: null,

            role: null,

            warningZone: false,

            customerCount: 0,

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
        this.events.forEach(function (event){
            window.addEventListener(event, this.resetTimer)
        }, this);

        this.setTimers();

        this.role = localStorage.getItem('role');

        // const response = localStorage.getItem('id');
        // console.log(response);

        const result = await axios.get('api/Users/profile',{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        this.customerDetails = result.data.result;

        const cuscount = await axios.get('api/Customer/count',{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        this.customerCount = cuscount.data.result;
    },

    destroyed(){
        this.events.forEach(function (event){
            window.removeEventListener(event, this.resetTimer)
        }, this);

        this.resetTimer();
    },

    methods:{
        setTimers: function(){
            this.warningTimer = setTimeout(this.warningMessage, 4 * 1000);
            this.logoutTimer = setTimeout(this.logoutUser, 15 * 60 * 1000);// 15 * 60 * 1000

            this.warningZone = false;
        },

        warningMessage: function(){
            this.warningZone = true;
        },

        logoutUser: function(){
            localStorage.removeItem('token');
            
            this.$router.push('/');
        },

        resetTimer: function(){
            clearTimeout(this.warningTimer);
            clearTimeout(this.logoutTimer);

            this.setTimers();
        },
    },

    computed: {
        ...mapGetters(['settoken'])
    }


  }
</script>
<template>
  


  <!-- Begin page -->
  <div id="layout-wrapper">
      
      <div class="main-content">

          <div class="page-content">
              <div class="container-fluid">

                  <!-- start page title -->
                  <div class="row">
                      <div class="col-12">
                          <div class="page-title-box d-flex align-items-center justify-content-between">
                              <h4 class="mb-0"><span>{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} //</span> <span>{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>
                          </div>
                      </div>
                      
                  </div>
                  <!-- end page title -->

                    <div class="row menu_arrange">

                        <!-- <div class="col-6 col-md-3" v-if="role === 'revenue-officer' ">
                            <router-link to="/search-items"><div class="card border border-warning pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-folder-open-outline text-warning"></i>
                                <span class="text-dark">Search Items</span>
                            </div></router-link>
                        </div> -->

                        <div class="col-6 col-md-3" v-if="role === '0' || role === 'portal-admin' ">
                            <router-link to="/list-organization"><div class="card border border-success pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-office-building text-success"></i>
                                <span class="text-dark">Manage Organization</span>
                            </div></router-link>
                        </div>

                        <div class="col-6 col-md-3" v-if="role === 'org-admin' ">
                            <router-link to="/list-sub-organization"><div class="card border border-primary pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-office-building text-primary"></i>
                                <span class="text-dark">Manage Sub-Organization</span>
                            </div></router-link>
                        </div>

                        <div class="col-6 col-md-3" v-if="role === 'org-admin' ">
                            <router-link to="/view-users"><div class="card border border-primary pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-account-multiple text-primary"></i>
                                <span class="text-dark">Manage Users</span>
                            </div></router-link>
                        </div>

                    </div>

                    <div class="row menu_arrange" v-if="role === 'billing-oficer' ">
                        <div class="col-md-8 border-right mb-4">
                            <div class="row">
                                <div class="col-6 col-md-4" v-if="role === 'billing-oficer'">
                                    <router-link to="/search-transactions"><div class="card border border-info pt-3 pb-4 pl-2 pr-2 text-center">
                                        <i class="mdi mdi-search-web text-info"></i>
                                        <span class="text-dark">Search Transactions</span>
                                    </div></router-link>
                                </div>

                                <div class="col-6 col-md-4" v-if="role === 'billing-oficer' ">
                                    <router-link to="/view-bills"><div class="card border border-info pt-3 pb-4 pl-2 pr-2 text-center">
                                        <i class="mdi mdi-receipt text-info"></i>
                                        <span class="text-dark">Manage Bills</span>
                                    </div></router-link>
                                </div>

                                <div class="col-6 col-md-4" v-if=" role === 'billing-oficer' ">
                                    <router-link to="/customer-search"><div class="card border border-info pt-3 pb-4 pl-2 pr-2 text-center">
                                        <i class="mdi mdi-account-search text-info"></i>
                                        <span class="text-dark">Customer Search</span>
                                    </div></router-link>
                                </div>

                                <div class="col-6 col-md-4" v-if=" role === 'billing-oficer' ">
                                    <router-link to="/view-customers"><div class="card border border-info pt-3 pb-4 pl-2 pr-2 text-center">
                                        <i class="mdi mdi-account-multiple text-info"></i>
                                        <span class="text-dark">Manage Customers</span>
                                    </div></router-link>
                                </div>

                                <div class="col-6 col-md-4" v-if="role === 'billing-oficer' ">
                                    <router-link to="/payments"><div class="card border border-info pt-3 pb-4 pl-2 pr-2 text-center">
                                        <i class="mdi mdi-credit-card text-info"></i>
                                        <span class="text-dark">Manage Payments</span>
                                    </div></router-link>
                                </div>

                                <div class="col-6 col-md-4" v-if="role === 'billing-oficer' ">
                                    <router-link to="/reports"><div class="card border border-info pt-3 pb-4 pl-2 pr-2 text-center">
                                        <i class="mdi mdi-chart-bar text-info"></i>
                                        <span class="text-dark">Reports</span>
                                    </div></router-link>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4 mb-4">
                            <div class="bg-white pt-2">
                                <h5 class="pl-3 pr-3">Worklist</h5><hr>
                                <div class="table-responsive pl-3 pr-3 pb-3">
                                    <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                        <thead>
                                        <tr>
                                            <th>aaa</th>
                                            <th>sss</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>


                                        <tbody>
                                        <tr>
                                            <td>aa</td>
                                            <td>aaa</td>
                                            <td>
                                                <button class="btn btn-outline-success btn-sm">View</button>
                                            </td>
                                            
                                        </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row menu_arrange" v-if="role === 'revenue-officer' ">
                        <div class="col-md-8 border-right mb-4">
                            <div class="row">
                                <div class="col-6 col-md-4" v-if="role === 'revenue-officer'">
                                    <router-link to="/search-transactions"><div class="card border border-warning pt-3 pb-4 pl-2 pr-2 text-center">
                                        <i class="mdi mdi-search-web text-warning"></i>
                                        <span class="text-dark">Search Transactions</span>
                                    </div></router-link>
                                </div>

                                <div class="col-6 col-md-4" v-if="role === 'revenue-officer'">
                                    <router-link to="/view-bills"><div class="card border border-warning pt-3 pb-4 pl-2 pr-2 text-center">
                                        <i class="mdi mdi-search-web text-warning"></i>
                                        <span class="text-dark">Manage Bills</span>
                                    </div></router-link>
                                </div>

                                <div class="col-6 col-md-4" v-if="role === 'revenue-officer'">
                                    <router-link to="/customer-search"><div class="card border border-warning pt-3 pb-4 pl-2 pr-2 text-center">
                                        <i class="mdi mdi-account-search text-warning"></i>
                                        <span class="text-dark">Customer Search</span>
                                    </div></router-link>
                                </div>

                                <div class="col-6 col-md-4" v-if="role === 'revenue-officer'">
                                    <router-link to="/view-customers"><div class="card border border-warning pt-3 pb-4 pl-2 pr-2 text-center">
                                        <i class="mdi mdi-account-multiple text-warning"></i>
                                        <span class="text-dark">Manage Customers</span>
                                    </div></router-link>
                                </div>

                                <div class="col-6 col-md-4" v-if="role === 'revenue-officer'">
                                    <router-link to="/payments"><div class="card border border-warning pt-3 pb-4 pl-2 pr-2 text-center">
                                        <i class="mdi mdi-credit-card text-warning"></i>
                                        <span class="text-dark">Manage Payments</span>
                                    </div></router-link>
                                </div>

                                <div class="col-6 col-md-4" v-if="role === 'revenue-officer'">
                                    <router-link to="/reports"><div class="card border border-warning pt-3 pb-4 pl-2 pr-2 text-center">
                                        <i class="mdi mdi-chart-bar text-warning"></i>
                                        <span class="text-dark">Reports</span>
                                    </div></router-link>
                                </div>

                                <div class="col-6 col-md-4" v-if="role === 'revenue-officer' ">
                                    <router-link to="/search-items"><div class="card border border-warning pt-3 pb-4 pl-2 pr-2 text-center">
                                        <i class="mdi mdi-folder-multiple text-warning"></i>
                                        <span class="text-dark">Manage Items</span>
                                    </div></router-link>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4 mb-4">
                            <div class="bg-white pt-2">
                                <h5 class="pl-3 pr-3">Worklist</h5><hr>
                                <div class="table-responsive pl-3 pr-3 pb-3">
                                    <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                        <thead>
                                        <tr>
                                            <th>aaa</th>
                                            <th>sss</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>


                                        <tbody>
                                        <tr>
                                            <td>aa</td>
                                            <td>aaa</td>
                                            <td>
                                                <button class="btn btn-outline-success btn-sm">View</button>
                                            </td>
                                            
                                        </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>

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

        
  <router-view></router-view>
</template>
<style scoped>

</style>