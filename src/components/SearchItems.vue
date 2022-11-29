<script>
    import axios from "axios";

    export default{
        name: 'listsuborganization',
        
        data(){
            return{
                name: '',
                // allorg: [],

                search: '',
                showsearch: false,
                caris: [],

                role: '',

                subsearch: '',
                showsubsearch: false,
                cariss: [],

                taxtypes: [],

                allitems: [],

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
                roless: 'revenue-officer',
            }
        },

        async mounted(){
            this.role = localStorage.getItem('role');

            if(this.roless != this.role){
                localStorage.removeItem('token');
                this.$router.push('/');
            }

            const resul = await axios.get('api/Users/profile', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.customerDetails = resul.data.result;

            const result = await axios.get('api/Item/organizations/'+this.customerDetails.organizationCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.allitems = result.data.result;
            this.loaderDiv = "d-none";
            this.mainDiv = "";
            setTimeout(() => {
                $("#datatable").DataTable({
                    lengthMenu: [
                    [5,10, 25, 50, -1],
                    [5,10, 25, 50, "All"],
                    ],
                    pageLength: 25,
                    language: {
                    searchPlaceholder: "Enter Item name",
                    retrieve: true,
                }
                    
                });
            });

            const res = await axios.get('api/Taxtype/alltaxtypes', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.taxtypes = res.data.result.taxValue;
            
        },

        methods: {
            async searchItem(){
                await axios.get('api/Item/search/'+this.search, {
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
            },

            async searchOrg(){
                await axios.get('api/Item/organizations/'+this.subsearch, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },)
                .then(res => {
                    this.cariss = res.data.result;
                    this.subsearch = ''; 
                    this.showsubsearch = true;

                })
                .catch(err => {
                    console.log(err);
                })

                
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
                            <h4 class="mb-0">Search Items <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} //</span> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                    <li class="breadcrumb-item active">Search Items</li>
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- end page title -->

                  
                <div class="row" >
                    <div class="col-12">

                        <div class="card">
                            <div class="card-body">
                                <div>
                                    <h4>Search Item</h4><hr>
                                    <form @submit.prevent="searchItem">
                                        <div class="row">
                                            <div class="col-md-6">   
                                                <input class="form-control mb-3" type="text" v-model="search" placeholder="Enter Item name">
                                                <button class="btn btn-outline-success ">Search</button>
                                            </div>

                                            
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div class="card" v-if="showsearch == true">
                            <div class="card-body table-responsive">
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                        <tr>
                                            <th>Item Code</th>
                                            <th>Item Org Code</th>
                                            <th>Item Name</th>
                                            <!-- <th>Organisation Code</th>
                                            <th>Sub-Organisation Code</th> -->
                                            <th>Remita Revenue</th>
                                            <th>GIFMIS Ref Code</th>
                                            <th>Price</th>
                                            <th>Taxtype</th>
                                            <th>Action</th>
                                        </tr>   
                                    </thead>


                                    <tbody>
                                    <tr v-for="cari in caris" :key="cari.id">
                                        <td>{{cari.itemCode}}</td>
                                        <td>{{cari.itemOrgCode}}</td>
                                        <td>{{cari.itemName}}</td>
                                        <!-- <td>{{cari.organisationCode}}</td>
                                        <td>{{cari.subOrganisationCode}}</td> -->
                                        <td>{{cari.remitaRevenueReference}}</td>
                                        <td>{{cari.gifmisReferenceCode}}</td>
                                        <td>{{cari.price}}</td>
                                        <td>{{cari.taxType}}</td>
                                        <td>
                                            <router-link :to="'/edit-item/'+cari.itemCode"><button class="btn btn-outline-success mr-2">Edit</button></router-link>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>

                        
                        <div class="card" v-if="showsearch == false">
                            <div class="card-body table-responsive">
                                <div class="mb-4 text-right" v-if="role === 'revenue-officer' ">
                                    <router-link class="btn btn-outline-success" to="/create-items"><i class="fa fa-plus"></i> Create Items</router-link>
                                </div>
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
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>GIFMIS Item Code</th>
                                        <th>Organization Item Code</th>
                                        <th>Item Name</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>


                                    <tbody>
                                    
                                    <tr v-for="item in allitems">
                                        <td>{{item.itemCode}}</td>
                                        <td>{{item.itemOrgCode}}</td>
                                        <td>{{item.itemName}}</td>
                                        <td>{{item.price}}</td>
                                        <td>
                                            
                                            <router-link :to="'/edit-item/'+item.itemOrgCode"><button class="btn btn-outline-success">Edit Item</button></router-link>
                                        </td>
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
<style scoped>

</style>