<script>
    import axios from "axios"

    export default{
        name: 'edititem',
        
        data(){
            return{
                errors: [],
                message: [],

                allitem: [],
                allorg: [],
                // suborg: [],
                tax: [],

                allitems: {
                    itemCode: '',
                    itemName: '',
                    organisationCode: '',
                    subOrganisationCode: '',
                    remitaRevenueReference: '',
                    gifmisReferenceCode: '',
                    price: '',
                    taxType: '',
                }
                
                
            }
        },

        methods: {
            async editItem(){
                // console.log(this.allitems)
                this.errors = [];
                this.message = [];

                
                
                if (!this.allitems.itemCode) {
                    this.errors.push("Item Code required.");
                }

                if (!this.allitems.itemName) {
                    this.errors.push("Item Name required.");
                }

                if (!this.allitems.organisationCode) {
                    this.errors.push("Organisation Code required.");
                }

                if (!this.allitems.subOrganisationCode) {
                    this.errors.push("Sub-Organisation Code required.");
                }

                if (!this.allitems.remitaRevenueReference) {
                    this.errors.push("Remita Revenue Code required.");
                }

                if (!this.allitems.gifmisReferenceCode) {
                    this.errors.push("GIFMIS Ref Code required.");
                }

                if (!this.allitems.price) {
                    this.errors.push("Price required.");
                }

                if (!this.allitems.taxType) {
                    this.errors.push("Tax Type required.");
                }
                
                const response = await axios.put('api/Organisation/edit', {
                    itemCode: this.itemCode,
                    itemName: this.itemName,
                    organisationCode: this.organisationCode,
                    subOrganisationCode: this.subOrganisationCode,
                    remitaRevenueReference: this.remitaRevenueReference,
                    gifmisReferenceCode: this.gifmisReferenceCode,
                    price: this.price,
                    taxType: this.taxType,
                    
                }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },);
                

                if (response) {
                    
                    this.message.push(response.data.message);

                }else{
                    this.errors.push("Incorrect Parameter");
                }

                
                 
            }
        },

        async mounted(){

            // const result = await axios.get('api/Item/details/'+this.$route.params.id);
 
            // this.allitems = result.data.result;

            const items = await axios.get('api/ItemHeader/items', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            
            this.allitem = items.data.result;

            const result = await axios.get('api/Organisation/organizations', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.allorg = result.data.result;

            // const suborg = await axios.get('api/SubOrganisation/suborganizations');
            // this.suborg = suborg.data.result;

            const taxtype = await axios.get('api/Taxtype/alltaxtypes', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.tax = taxtype.data.result;
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
                              <h4 class="mb-0">Edit Item</h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">Edit Item</li>
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
                                <div class="alert alert-danger" v-if="errors.length">
                                    <b>Please correct the following error(s):</b>
                                    <ul>
                                        <li v-for="error in errors">{{ error }}</li>
                                    </ul>
                                </div>

                                <div class="alert alert-success" v-if="message.length">
                                    <strong v-for="msg in message">{{ msg }}</strong>
                                </div>
                                <form @submit.prevent="editItem">
                                    <div class="row">

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Item Code</label>
                                                <select v-model="allitems.itemCode" class="form-control" id="">
                                                    <option>Choose</option>
                                                    <option v-for="item in allitem" :value="item.itemCode">{{item.itemCode}}</option>
                                                    
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Item Name</label>
                                                <select v-model="allitems.itemName" class="form-control" id="">
                                                    <option>Choose</option>
                                                    <option v-for="item in allitem" :value="item.itemName">{{item.itemName}}</option>
                                                    
                                                </select>

                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Organisation Code</label>
                                                <select v-model="allitems.organisationCode" class="form-control" id="">
                                                    <option>Choose</option>
                                                    <option v-for="org in allorg" :value="org.organisationCode">{{org.organisationCode}}</option>
                                                    
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Sub-Organisation Name</label>
                                                <input class="form-control" type="text" v-model="allitems.subOrganisationCode">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Remita Revenue</label>
                                                <input class="form-control" type="text" v-model="allitems.remitaRevenueReference">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">GIFMIS Ref Code</label>
                                                <input class="form-control" type="text" v-model="allitems.gifmisReferenceCode">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Price</label>
                                                <input class="form-control" type="text" v-model="allitems.price">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">TaxType</label>
                                                <select v-model="allitems.taxType" class="form-control" id="">
                                                    <option>Choose</option>
                                                    <option v-for="taxx in tax" :value="taxx.taxTypeName">{{taxx.taxTypeName}}</option>
                                                    
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                    <button class="btn btn-success mr-4 float-left">Save</button>
                                    
                                </form>

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