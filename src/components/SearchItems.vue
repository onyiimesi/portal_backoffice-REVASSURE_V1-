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
            }
        },

        async mounted(){

            const resul = await axios.get('api/Users/profile', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.customerDetails = resul.data.result;


            this.role = localStorage.getItem('role');

            const result = await axios.get('api/Item/organizations/'+this.customerDetails.organizationCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.allitems = result.data.result;
            setTimeout(() => {
                $("#datatable").DataTable({
                    lengthMenu: [
                    [5,10, 25, 50, -1],
                    [5,10, 25, 50, "All"],
                    ],
                    pageLength: 10,
                    language: {
                    searchPlaceholder: "Enter Item name"
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
                        <div class="card" v-if="showsearch == true">
                            <div class="card-body table-responsive">
                                <div>
                                    <form @submit.prevent="searchItem">
                                        <div class="row">
                                            <div class="col-md-6">

                                            </div>
                                            <div class="col-md-6">
                                                <div class="d-flex">
                                                    
                                                    <input class="form-control mr-3" type="text" v-model="search" placeholder="Enter Item name">

                                                    <button class="btn btn-outline-success ">Search</button>
                                                </div>
                                            </div>

                                            
                                        </div>
                                    </form>
                                </div><hr>
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
                                            <button class="btn btn-outline-success mr-2" data-toggle="modal" :data-target="'#bs-example-modal-lg-' + item.itemOrgCode">More Details</button>
                                        </td>


                                        <div class="modal fade" :id="'bs-example-modal-lg-' + item.itemOrgCode" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered modal-lg">
                                                <div class="modal-content">
                                                    
                                                    <div class="modal-header">
                                                        <h5 id="myLargeModalLabel" class="modal-title mt-0">More Information</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="row">
                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">GIFMIS Item Code</label>
                                                                    <h5>{{item.itemCode}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Organization Item Code</label>
                                                                    <h5>{{item.itemOrgCode}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Item Name</label>
                                                                    <h5>{{item.itemName}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Price</label>
                                                                    <h5>{{item.price}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">GIFMIS Reference Code</label>
                                                                    <h5>{{item.gifmisReferenceCode}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Remita Reference</label>
                                                                    <h5>{{item.remitaRevenueReference}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-6 col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Tax</label>
                                                                    <h5>{{item.taxType}}</h5>
                                                                </div>
                                                            </div>

                                                        </div><hr>
 
                                                        <router-link :to="'/edit-item/'+item.itemOrgCode"><button class="btn btn-outline-success" data-dismiss="modal">Edit Item</button></router-link>
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