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
                              <h4 class="mb-0">Welcome, {{customerDetails.lastName}} {{customerDetails.firstName}} - {{this.role}}</h4>
                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">Dashboard</li>
                                  </ol>
                              </div>
                                
                          </div>
                      </div>
                      
                  </div>
                  <!-- end page title -->


                    <div class="row menu_arrange">
                        <div class="col-6 col-md-3" v-if="role === 'BillingOfficer'">
                            <router-link to="/search-transactions"><div class="card border border-info pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-search-web text-info"></i>
                                <span class="text-dark">Search Transactions</span>
                            </div></router-link>
                        </div>

                        <div class="col-6 col-md-3" v-if="role === 'AccountAdmin'">
                            <router-link to="/search-transactions"><div class="card border border-warning pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-search-web text-warning"></i>
                                <span class="text-dark">Search Transactions</span>
                            </div></router-link>
                        </div>

                        <div class="col-6 col-md-3" v-if="role === 'BillingOfficer' ">
                            <router-link to="/create-invoice"><div class="card border border-info pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-receipt text-info"></i>
                                <span class="text-dark">Create Invoice</span>
                            </div></router-link>
                        </div>

                        <div class="col-6 col-md-3" v-if="role === 'BillingOfficer'">
                            <router-link to="/view-invoices"><div class="card border border-info pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-search-web text-info"></i>
                                <span class="text-dark">Search Invoice</span>
                            </div></router-link>
                        </div>

                        <div class="col-6 col-md-3" v-if="role === 'AccountAdmin'">
                            <router-link to="/view-invoices"><div class="card border border-warning pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-search-web text-warning"></i>
                                <span class="text-dark">Search Invoice</span>
                            </div></router-link>
                        </div>

                        <div class="col-6 col-md-3" v-if=" role === 'BillingOfficer' ">
                            <router-link to="/create-customer"><div class="card border border-info pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-account text-info"></i>
                                <span class="text-dark">Create Customer</span>
                            </div></router-link>
                        </div>

                    
                        <div class="col-6 col-md-3" v-if="role === 'BillingOfficer'">
                            <router-link to="/customer-search"><div class="card border border-info pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-account-search text-info"></i>
                                <span class="text-dark">Search Customer</span>
                            </div></router-link>
                        </div>
                        
                        <div class="col-6 col-md-3" v-if="role === 'AccountAdmin'">
                            <router-link to="/customer-search"><div class="card border border-warning pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-account-search text-warning"></i>
                                <span class="text-dark">Search Customer</span>
                            </div></router-link>
                        </div>

                        <div class="col-6 col-md-3" v-if="role === 'BillingOfficer' ">
                            <router-link to="/payments"><div class="card border border-info pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-credit-card text-info"></i>
                                <span class="text-dark">Search Payments</span>
                            </div></router-link>
                        </div>

                        <div class="col-6 col-md-3" v-if="role === 'AccountAdmin'">
                            <router-link to="/payments"><div class="card border border-warning pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-credit-card text-warning"></i>
                                <span class="text-dark">Search Payments</span>
                            </div></router-link>
                        </div>

                        <div class="col-6 col-md-3" v-if="role === 'BillingOfficer' ">
                            <router-link to="/"><div class="card border border-info pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-chart-bar text-info"></i>
                                <span class="text-dark">Reports</span>
                            </div></router-link>
                        </div>

                        <div class="col-6 col-md-3" v-if="role === 'AccountAdmin'">
                            <router-link to="/"><div class="card border border-warning pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-chart-bar text-warning"></i>
                                <span class="text-dark">Reports</span>
                            </div></router-link>
                        </div>

                        <div class="col-6 col-md-3" v-if="role === 'AccountAdmin' ">
                            <router-link to="/setup-items"><div class="card border border-warning pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-folder-multiple text-warning"></i>
                                <span class="text-dark">Create Items</span>
                            </div></router-link>
                        </div>

                        <div class="col-6 col-md-3" v-if="role === 'AccountAdmin' ">
                            <router-link to="/search-items"><div class="card border border-warning pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-folder-open-outline text-warning"></i>
                                <span class="text-dark">Search Items</span>
                            </div></router-link>
                        </div>

                        <div class="col-6 col-md-3" v-if="role === '0' ">
                            <router-link to="/setup-organization"><div class="card border border-success pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-office-building text-success"></i>
                                <span class="text-dark">Manage Organization</span>
                            </div></router-link>
                        </div>

                        <div class="col-6 col-md-3" v-if="role === 'OrgAdmin' ">
                            <router-link to="/sub-organization-setup"><div class="card border border-primary pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-office-building text-primary"></i>
                                <span class="text-dark">Create Sub-Organization</span>
                            </div></router-link>
                        </div>

                        <div class="col-6 col-md-3" v-if="role === 'OrgAdmin' ">
                            <router-link to="/list-sub-organization"><div class="card border border-primary pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-office-building text-primary"></i>
                                <span class="text-dark">List Sub-Organizations</span>
                            </div></router-link>
                        </div>

                        <div class="col-6 col-md-3" v-if="role === '0' ">
                            <router-link to="/subunit-setup"><div class="card border border-success pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-office-building text-success"></i>
                                <span class="text-dark">Create Units</span>
                            </div></router-link>
                        </div>

                        <div class="col-6 col-md-3" v-if="role === 'OrgAdmin' ">
                            <router-link to="/subunit-setup"><div class="card border border-primary pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-office-building text-primary"></i>
                                <span class="text-dark">Create Units</span>
                            </div></router-link>
                        </div>

                        <div class="col-6 col-md-3" v-if="role === '0'">
                            <router-link to="/list-units"><div class="card border border-success pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-office-building text-success"></i>
                                <span class="text-dark">List Units</span>
                            </div></router-link>
                        </div>

                        <div class="col-6 col-md-3" v-if="role === 'OrgAdmin' ">
                            <router-link to="/list-units"><div class="card border border-primary pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-office-building text-primary"></i>
                                <span class="text-dark">List Units</span>
                            </div></router-link>
                        </div>

                        <div class="col-6 col-md-3" v-if="role === 'OrgAdmin' ">
                            <router-link to="/setup-users"><div class="card border border-primary pt-3 pb-4 pl-2 pr-2 text-center">
                                <i class="mdi mdi-account-plus text-primary"></i>
                                <span class="text-dark">Create User</span>
                            </div></router-link>
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