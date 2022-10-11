<script>
    import axios from "axios"
    import { useToast } from "vue-toastification";

    export default{
        name: 'edititem',
        
        data(){
            return{
                errors: [],
                message: [],

                allitem: [],
                alli: [],
                allorg: [],
                // suborg: [],
                tax: [],

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

                itemList: [],

                allitems: {
                    itemCode: '',
                    itemName: '',
                    organisationCode: '',
                    subOrganisationCode: '',
                    remitaRevenueReference: '',
                    gifmisReferenceCode: '',
                    price: '',
                    taxType: '',
                    itemOrgCode: '',

                    isSelfService: '',
                    hasCustomField: '',

                },

                customFields: [{
                    itemCode: '',
                    fieldKey: '',
                    fieldType: '',
                    fieldOption: '',
                }],

                role: '',

                
                
            }
        },

        async mounted(){
            this.role = localStorage.getItem('role');
            const resu = await axios.get('api/Users/profile', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.customerDetails = resu.data.result;


            const resul = await axios.get('api/Item/details/'+this.$route.params.itemOrgCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.allitems = resul.data.result.itemDetails;
            
            this.customFields = resul.data.result.customFields;
            


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

        methods: {
            async editItem(){
                // console.log(this.allitems)
                this.errors = [];
                this.message = [];
                const toast = useToast()

                this.itemList.push(this.customFields);
                
                const response = await axios.put('api/Item/edit',{
                    itemOrgCode: this.allitems.itemOrgCode,
                    itemName: this.allitems.itemName,
                    remitaRevenueReference: this.allitems.remitaRevenueReference,
                    gifmisReferenceCode: this.allitems.gifmisReferenceCode,
                    price: this.allitems.price,
                    taxType: this.allitems.taxType,

                    customFields: this.customFields,

                    isSelfService: this.allitems.isSelfService,
                    hasCustomField: this.allitems.hasCustomField,
                    
                }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },).then(response => { 
                    toast.success(response.data.message);
                    
                    this.itemList = [];
                })
                .catch(error => {
                if(error.response.data.title){
                    toast.error("Field(s) is empty");
                }
                    
                });
                 
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
                              <h4 class="mb-0">Edit Item <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} //</span> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
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
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <!-- <label class="control-label">Organisation Code</label> -->
                                                <input class="form-control" type="hidden" v-model="customerDetails.organizationCode">
                                                
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <!-- <label class="control-label">Sub-Organisation Code</label> -->
                                                <input class="form-control" type="hidden" v-model="customerDetails.subOrganisationCode">
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">

                                        <div class="col-md-3">
                                        
                                            <div class="form-group">
                                                <label class="control-label">GIFMIS Item</label>
                                                <select v-model="allitems.itemCode" class="form-control" >
                                                    
                                                    <option v-for="item in allitem" :value="item.itemCode">{{item.itemName}}</option>
                                                    
                                                </select>
                                            </div>

                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">GIFMIS Reference Code</label>
                                                <input class="form-control" type="text" v-model="allitems.gifmisReferenceCode">
                                                
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Organisation Item Code</label>
                                                <input class="form-control" type="text" v-model="allitems.itemOrgCode">
                                                
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Item Name</label>
                                                <input class="form-control" type="text" v-model="allitems.itemName">
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Price</label>
                                                <input class="form-control" type="text" v-model="allitems.price">
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Tax Type</label>
                                                <!-- <input class="form-control" type="text" v-model="inputs.taxType"> -->
                                                
                                                <select v-model="allitems.taxType" class="form-control" id="">
                                                <option v-for="taxx in tax" :value="taxx.taxValue">{{taxx.taxTypeName}}</option>
                                                    
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Revenue Reference Number</label>
                                                <input class="form-control" type="text" v-model="allitems.remitaRevenueReference">
                                                
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Self Service</label><br>
                                                <input type="checkbox" v-model="allitems.isSelfService">
                                                
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Custom Fields</label><br>
                                                <input type="checkbox" v-model="allitems.hasCustomField">
                                                
                                            </div>
                                        </div>

                                        </div>
                                        

                                        <div class="mt-4 mb-4" v-if="allitems.hasCustomField">
                                            <h6>Custom Fields</h6>
                                            <hr>
                                            <div class="row" v-for="custom in customFields">
                                                <div class="col-md-3">
                                                <div class="form-group">
                                                    <label class="control-label">Organisation Item Code</label>
                                                    <input class="form-control" @change="change()" type="text" v-model="custom.itemCode">
                                                    
                                                </div>
                                                </div>

                                                <div class="col-md-3">
                                                <div class="form-group">
                                                    <label class="control-label">Field Name</label>
                                                    <input class="form-control" type="text" v-model="custom.fieldKey">
                                                    
                                                </div>
                                                </div>

                                                <div class="col-md-2">
                                                <div class="form-group">
                                                    <label class="control-label">Field Type</label>
                                                    <select v-model="custom.fieldType" class="form-control" id="">
                                                    <option></option>
                                                    <option value="text">Text</option>
                                                    <option value="dropdown">Dropdown</option>
                                                    <option value="date-range">Date Range</option>
                                                    </select>
                                                </div>
                                                </div>

                                                <div class="col-md-3">
                                                <div class="form-group">
                                                    <label class="control-label">Option</label>
                                                    <textarea class="form-control" name="" id="" cols="30" rows="1" v-model="custom.fieldOption"></textarea>
                                                </div>
                                                </div>
                                                <div class="col-md-1" style="margin-top: 30px;">
                                                <span class="btn btn-danger btn-sm" style="margin: 5px 0 0 0;" @click="deleteRow(k, custom)"><i class="fa fa-times"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                    
                                        
                                        <button class="btn btn-outline-success mt-4">Edit</button>
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