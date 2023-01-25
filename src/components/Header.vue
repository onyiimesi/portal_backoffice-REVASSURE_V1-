<!-- eslint-disable vue/multi-word-component-names -->
<script>

  import { mapGetters } from 'vuex';
  
  export default{

    data(){
        return{
            token: null,
            role: null

        }
    },

    created(){
        const response = localStorage.getItem('token');

        this.role = localStorage.getItem('role');
        
        // this.$store.dispatch("settoken", response);

        // // this.$store.dispatch("setuserrole", resp);

        // this.$store.dispatch("setIsAuth", true);

        

        if(!response){
            this.$router.push('/');
        }
    },

    methods:{
        handleClick(){
            localStorage.removeItem('token');
            this.$store.dispatch('settoken', null);
            this.$router.push('/');
        }
    },

    computed: {
        ...mapGetters(['settoken'])
    }

  }
</script>

<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
            <router-link to="/dashboard" class="logo logo-dark">
                <span class="logo-sm">
                    <img src="../assets/fg-ras-logo.png" class="img-fluid" width="110" height="5" alt="">
                </span>
                <span class="logo-lg">
                    <img src="../assets/fg-ras-logo.png" class="img-fluid" width="110" height="5" alt="">
                </span>
            </router-link>

            <router-link to="/dashboard" class="logo logo-light">
                <span class="logo-sm">
                    <img src="../assets/fg-ras-logo.png" class="img-fluid" width="110" height="5" alt="">
                </span>
                <span class="logo-lg">
                    <img src="../assets/fg-ras-logo.png" class="img-fluid" width="110" height="5" alt="">
                </span>
            </router-link>
        </div>

          <button type="button" class="btn btn-sm px-3 font-size-24 d-lg-none header-item" data-toggle="collapse" data-target="#topnav-menu-content">
                <i class="ri-menu-2-line align-middle"></i>
          </button>
          

          <!-- App Search-->
          <!-- <form class="app-search d-none d-lg-block">
              <div class="position-relative">
                  <input type="text" class="form-control" value="" placeholder="Search...">
                  <span class="ri-search-line"></span>
              </div>
          </form> -->
            
          
        </div>

        <div class="d-flex">

            <div class="dropdown d-inline-block d-lg-none ml-2">
                <!-- <button type="button" class="btn header-item noti-icon waves-effect" id="page-header-search-dropdown"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="ri-search-line"></i>
                </button> -->
                <!-- <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
                    aria-labelledby="page-header-search-dropdown">
                    
                    <form class="p-3">
                        <div class="form-group m-0">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search ...">
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="submit"><i class="ri-search-line"></i></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div> -->
            </div>

            <div class="dropdown d-inline-block">
                <!-- <button type="button" class="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="ri-notification-3-line"></i>
                    <span class="noti-dot"></span>
                </button> -->
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
                    aria-labelledby="page-header-notifications-dropdown">
                    <div class="p-3">
                        <div class="row align-items-center">
                            <div class="col">
                                <h6 class="m-0"> Notifications </h6>
                            </div>
                            <div class="col-auto">
                                <a href="#!" class="small"> View All</a>
                            </div>
                        </div>
                    </div>
                    <div data-simplebar style="max-height: 230px;">
                        <a href="" class="text-reset notification-item">
                            <div class="media">
                                <div class="avatar-xs mr-3">
                                    <span class="avatar-title bg-primary rounded-circle font-size-16">
                                        <i class="ri-shopping-cart-line"></i>
                                    </span>
                                </div>
                                <div class="media-body">
                                    <h6 class="mt-0 mb-1">Your order is placed</h6>
                                    <div class="font-size-12 text-muted">
                                        <p class="mb-1">If several languages coalesce the grammar</p>
                                        <p class="mb-0"><i class="mdi mdi-clock-outline"></i> 3 min ago</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a href="" class="text-reset notification-item">
                            <div class="media">
                                <img src="/frontend/assets/images/users/avatar-3.jpg"
                                    class="mr-3 rounded-circle avatar-xs" alt="user-pic">
                                <div class="media-body">
                                    <h6 class="mt-0 mb-1">James Lemire</h6>
                                    <div class="font-size-12 text-muted">
                                        <p class="mb-1">It will seem like simplified English.</p>
                                        <p class="mb-0"><i class="mdi mdi-clock-outline"></i> 1 hours ago</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a href="" class="text-reset notification-item">
                            <div class="media">
                                <div class="avatar-xs mr-3">
                                    <span class="avatar-title bg-success rounded-circle font-size-16">
                                        <i class="ri-checkbox-circle-line"></i>
                                    </span>
                                </div>
                                <div class="media-body">
                                    <h6 class="mt-0 mb-1">Your item is shipped</h6>
                                    <div class="font-size-12 text-muted">
                                        <p class="mb-1">If several languages coalesce the grammar</p>
                                        <p class="mb-0"><i class="mdi mdi-clock-outline"></i> 3 min ago</p>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <a href="" class="text-reset notification-item">
                            <div class="media">
                                <img src="/frontend/assets/images/users/avatar-4.jpg"
                                    class="mr-3 rounded-circle avatar-xs" alt="user-pic">
                                <div class="media-body">
                                    <h6 class="mt-0 mb-1">Salena Layfield</h6>
                                    <div class="font-size-12 text-muted">
                                        <p class="mb-1">As a skeptical Cambridge friend of mine occidental.</p>
                                        <p class="mb-0"><i class="mdi mdi-clock-outline"></i> 1 hours ago</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="p-2 border-top">
                        <a class="btn btn-sm btn-link font-size-14 btn-block text-center" href="javascript:void(0)">
                            <i class="mdi mdi-arrow-right-circle mr-1"></i> View More..
                        </a>
                    </div>
                </div>
            </div>

            <div class="dropdown d-inline-block user-dropdown">
                <button type="button" class="btn header-item waves-effect" id="page-header-user-dropdown"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img class="rounded-circle header-profile-user" src="/frontend/assets/images/users/avatar-2.jpg"
                        alt="Header Avatar">
                    <span class="d-none d-xl-inline-block ml-1 text-white txt-white" v-if="resp">{{resp}}</span>
                    <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                    <!-- item-->
                    <p class="dropdown-item">Welome, {{this.role}}</p>
                    <router-link class="dropdown-item" to="/profile"><i class="ri-user-line align-middle mr-1"></i> Profile</router-link>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item text-danger" href="#" @click="handleClick"><i class="ri-shut-down-line align-middle mr-1 text-danger"></i> Logout</a>
                </div>
            </div>

            

        </div>
    </div>
</header>


<div class="topnav">
    <div class="container-fluid">
        <nav class="navbar navbar-light navbar-expand-lg topnav-menu">

            <div class="collapse navbar-collapse" id="topnav-menu-content">
                <ul class="navbar-nav">

                    <li class="nav-item">
                        <router-link to="/dashboard" class="nav-link text-white txt-white">
                            <i class="ri-dashboard-line mr-2"></i> Dashboard
                            
                        </router-link>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle arrow-none text-white txt-white" href="#" id="topnav-components" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-if="role === 'billing-oficer' || role === 'revenue-officer'">
                            <i class="ri-stack-line mr-2"></i>Transactions <div class="arrow-down"></div>
                        </a>

                        <div class="dropdown-menu" aria-labelledby="topnav-components">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div>
                                        <router-link v-if="role === 'billing-oficer' || role === 'revenue-officer'" to="/search-transactions" class="dropdown-item">Search Transactions</router-link>
                                    </div>
                                    <div>
                                        <router-link v-if="role === 'billing-oficer' || role === 'revenue-officer'" to="/view-bills" class="dropdown-item">Manage Bills</router-link>
                                    </div>
                                    <div>
                                        <router-link v-if="role === 'billing-oficer' || role === 'revenue-officer'" to="/view-customers" class="dropdown-item">Manage Customers</router-link>
                                    </div>
                                    <div>
                                        <router-link v-if="role === 'billing-oficer' || role === 'revenue-officer'" to="/payments" class="dropdown-item">Manage Payments</router-link>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="dropdown">
                                <a class="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-form"
                                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-if="role === 'billing-oficer' || role === 'revenue-officer'">
                                    Manage Bill <div class="arrow-down"></div>
                                </a>
                                <div class="dropdown-menu" aria-labelledby="topnav-form">
                                    <router-link to="/create-bill" v-if="role === 'billing-oficer' " class="dropdown-item">Create Bill</router-link>
                                    <router-link v-if="role === 'billing-oficer' || role === 'revenue-officer'" to="/view-bills" class="dropdown-item">View Bill Details</router-link>
                                </div>
                            </div> -->

                            <!-- <div>
                                <router-link to="/create-rebate" v-if="role === 'revenue-officer' " class="dropdown-item">Create Rebate</router-link>
                            </div> -->

                            <!-- <div class="dropdown">
                                <a class="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-form"
                                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-if="role === 'billing-oficer' || role === 'revenue-officer'">
                                    Customers <div class="arrow-down"></div>
                                </a>
                                <div class="dropdown-menu" aria-labelledby="topnav-form">
                                    <router-link to="/create-customer" v-if=" role === 'billing-oficer' " class="dropdown-item">Create Customer</router-link>
                                    <router-link v-if="role === 'billing-oficer' || role === 'revenue-officer'" to="/customer-search" class="dropdown-item">Search Customer</router-link>
                                </div>
                            </div> -->
                        </div>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle arrow-none text-white txt-white" href="#" id="topnav-uielement" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-if="role === 'billing-oficer' || role === 'revenue-officer'">
                            <i class="ri-pencil-ruler-2-line mr-2"></i>Reports <div class="arrow-down"></div>
                        </a>

                        <div class="dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-sm"
                            aria-labelledby="topnav-uielement">
                            <div class="dropdown">
                                <a class="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-form"
                                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Transaction Reports <div class="arrow-down"></div>
                                </a>
                                <div class="dropdown-menu" aria-labelledby="topnav-form">
                                    <router-link to="/invoice-report" class="dropdown-item">Invoice Reports</router-link>
                                    <router-link to="/payments" class="dropdown-item">Payment Reports</router-link>
                                    <router-link to="/reports" class="dropdown-item">Collection Reports</router-link>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li class="nav-item dropdown" v-if="role === 'revenue-officer'">
                        <a class="nav-link dropdown-toggle arrow-none text-white txt-white" href="#" id="topnav-uielement" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="ri-pencil-ruler-2-line mr-2"></i>Setup <div class="arrow-down"></div>
                        </a>

                        <div class="dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-sm"
                            aria-labelledby="topnav-uielement">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div>
                                        <router-link v-if="role === 'revenue-officer' " to="/search-items" class="dropdown-item">Manage Items</router-link>

                                        <!-- <router-link v-if="role === 'revenue-officer' " to="/search-items" class="dropdown-item">Search Items</router-link> -->
                                        
                                        <router-link v-if="role === 'revenue-officer' " to="/view-banks" class="dropdown-item">Manage Bank</router-link>

                                        <router-link v-if="role === 'revenue-officer' " to="/bank-accounts" class="dropdown-item">Manage Bank Account</router-link>

                                        <router-link v-if="role === 'revenue-officer' " to="/list-state" class="dropdown-item">Manage State</router-link>

                                        <router-link v-if="role === 'revenue-officer' " to="/list-lga" class="dropdown-item">Manage LGA</router-link>
                                        
                                    </div>
                                </div>

                                <!-- <div class="col-lg-4">
                                    <div>
                                        
                                        

                                        <router-link v-if="role === 'revenue-officer' " to="/manage-tax-types" class="dropdown-item">Manage Taxtype</router-link>

                                        <router-link v-if="role === 'revenue-officer' " to="/list-tax-types" class="dropdown-item">List Taxtype</router-link>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </li>

                    <li v-if="role === '0' || role === 'org-admin' || role === 'portal-admin' || role === 'portal-admin' " class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle arrow-none text-white txt-white" href="#" id="topnav-uielement" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="ri-pencil-ruler-2-line mr-2"></i>Admin <div class="arrow-down"></div>
                        </a>

                        <div class="dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-sm"
                            aria-labelledby="topnav-uielement">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div>
                                        <router-link to="/list-organisation" v-if="role === '0' || role === 'portal-admin' "  class="dropdown-item">Manage Organisation</router-link>

                                        <router-link to="/audit-log" v-if="role === '0' || role === 'portal-admin' "  class="dropdown-item">Audit Log</router-link>

                                        <router-link to="/list-unit" v-if="role === 'org-admin' " class="dropdown-item">Manage Unit</router-link>

                                        <!-- <router-link to="/list-sub-organization" v-if="role === 'org-admin' " class="dropdown-item">List Sub-Organizations</router-link> -->
                                        
                                        <router-link to="/view-users" v-if="role === 'org-admin' " class="dropdown-item">Manage Users</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li v-if="role === 'portal-admin' || role === 'org-admin' || role === '0' " class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle arrow-none text-white txt-white" href="#" id="topnav-uielement" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="ri-pencil-ruler-2-line mr-2"></i>Settings <div class="arrow-down"></div>
                        </a>

                        <div class="dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-sm"
                            aria-labelledby="topnav-uielement">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div>
                                        <!-- <router-link v-if="role === 'org-admin'" to="/api-keys" class="dropdown-item">API Keys</router-link> -->

                                        <router-link to="/change-password" class="dropdown-item">Change Password</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li class="nav-item dropdown" v-if="role === 'org-admin' || role === 'revenue-officer'" >
                        <a class="nav-link dropdown-toggle arrow-none text-white txt-white" href="#" id="topnav-uielement" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="ri-pencil-ruler-2-line mr-2"></i>Workflow <div class="arrow-down"></div>
                        </a>

                        <div class="dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-sm"
                            aria-labelledby="topnav-uielement">
                            <div class="row">
                                <div class="col-md-4">
                                    <div>
                                        <router-link v-if="role === 'org-admin'" to="/setup-workflow" class="dropdown-item">Setup</router-link>

                                        <router-link v-if="role === 'org-admin'" to="/approve-workflow" class="dropdown-item">Approval</router-link>

                                        <router-link v-if="role === 'revenue-officer'" to="/workflow-entry" class="dropdown-item">Entry</router-link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </li>

                    <li class="nav-item">
                        <a href="javascript:void(0)" @click="handleClick" class="nav-link text-white txt-white">
                            <i class=" ri-shut-down-line"></i> Logout
                        </a>
                    </li>
                    
                </ul>
            </div>
        </nav>
    </div>
</div>
</template>

<style>
    @media (max-width: 991px) {
        .txt-white{
            color: #333 !important;
        }
    }
</style>
