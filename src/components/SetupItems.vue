<script>
  import axios from 'axios'
  import { useToast } from "vue-toastification";

  export default{
    name: 'setupitems',

    data(){
      return{
        errors: [],
        message: [],

        allitems: [],
        allorg: [],
        // suborg: [],
        tax: [],
        allsub: [],



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

        inputs: {
          itemCode: '',
          itemName: '',
          organisationCode: '',
          subOrganisationCode: '',
          remitaRevenueReference: '',
          gifmisReferenceCode: '',
          price: '',
          taxType: '',
          itemOrgCode: '',

          customFields: [{
            itemCode: '',
            fieldKey: '',
            fieldType: '',
            fieldOption: '',
          }],

          isSelfService: '',
          hasCustomField: '',

        },

        role: '',


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
      this.inputs.organisationCode = resul.data.result.organizationCode;
      this.inputs.subOrganisationCode = resul.data.result.subOrganisationCode;
      

      const items = await axios.get('api/ItemHeader/items', {
          headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
          }
      },);
      this.allitems = items.data.result;

      const result = await axios.get('api/Organisation/details/'+this.customerDetails.organizationCode, {
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

      async onChange(event) {

        const response = await axios.get('api/SubOrganisation/suborganizations/'+event.target.value, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        },);

        this.allsub = response.data.result;
      },

      change() {

        this.inputs.customFields.push({
          itemCode: '',
          fieldKey: '',
          fieldType: '',
          fieldOption: '',
            
        })
          
      },

      deleteRow(index, newrow){
        var idx = this.inputs.customFields.indexOf(newrow);
        console.log(idx, index);
        if(idx > -1){
            this.inputs.customFields.splice(idx, 1);
        }
      },

      deleteItemRow(index, input){
        var idx = this.itemList.indexOf(input);
        console.log(idx, index);
        if(idx > -1){
            this.itemList.splice(idx, 1);
        }
      },

      async handleItem(){

        this.errors = [];
        this.message = [];
        const toast = useToast()


        if (!this.inputs.itemCode) {
          toast.error("GIMIS Item Code required.");
        }

        if (!this.inputs.itemName) {
          toast.error("Item Name required.");
        }

        if (!this.inputs.organisationCode) {
          toast.error("Organisation Code required.");
        }

        if (!this.inputs.subOrganisationCode) {
          toast.error("Sub-Organisation Code required.");
        }

        if (!this.inputs.remitaRevenueReference) {
          toast.error("Remita Revenue required.");
        }

        if (!this.inputs.gifmisReferenceCode) {
          toast.error("GIFMIS Reference Code required.");
        }

        if (!this.inputs.price) {
          toast.error("Price required.");
        }

        if (!this.inputs.taxType) {
          toast.error("Tax Type required.");
        }

        if (!this.inputs.itemOrgCode) {
          toast.error("Item Organisation Code required.");

        }else{
          
          this.itemList.push(this.inputs);

          this.inputs = {
            itemCode: '',
            itemName: '',
            organisationCode: this.inputs.organisationCode,
            subOrganisationCode: this.inputs.organisationCode,
            remitaRevenueReference: '',
            gifmisReferenceCode: '',
            price: '',
            taxType: '',
            itemOrgCode: '',

            customFields: [{
              itemCode: '',
              fieldKey: '',
              fieldType: '',
              fieldOption: '',
            }],

            isSelfService: '',
            hasCustomField: '',
              
          }
        }

        // this.itemList.push(this.customFields);
        
      },

      async submit(){

        const toast = useToast()

        await axios.post('api/Item/additem',this.itemList, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        },).then(response => { 
            toast.success(response.data.message);
            
            this.itemList = [];
          })
        .catch(error => {
          if(error.response.data.title){
            toast.error("Item(s) not created, Custom fields are empty");

            this.itemList = [];
          }
            
        });

      }
    }
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
                              <h4 class="mb-0">Create Items <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} //</span> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">Create Items</li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
                  <!-- end page title -->

                  
                  <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">

                              <div class="alert alert-danger" v-if="errors.length">
                                <b>Please correct the following error(s):</b>
                                <ul>
                                  <li v-for="error in errors">{{ error }}</li>
                                </ul>
                              </div>

                              <div class="alert alert-success" v-if="message.length">
                                <strong v-for="msg in message">{{ msg }}</strong>
                              </div>


                              <div id="accordion" class="custom-accordion">




                                <div class="card mb-1 shadow-none">
                                  <a href="#collapseOne" class="text-dark" data-toggle="collapse" aria-expanded="true" aria-controls="collapseOne">
                                    <div class="card-header" id="headingOne">
                                      <h6 class="m-0">
                                        Create Items
                                        <i class="mdi mdi-minus float-right accor-plus-icon"></i>
                                      </h6>
                                    </div>
                                  </a>

                                  <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div class="card-body">
                                      <form @submit.prevent="handleItem">

                                        <input class="form-control" type="hidden" v-model="inputs.organisationCode">
                                        <input class="form-control" type="hidden" v-model="inputs.subOrganisationCode">
                                        <div class="row">

                                          <div class="col-md-3">
                                            
                                            <div class="form-group">
                                                <label class="control-label">GIFMIS Item <span class="text-danger">*</span></label>
                                                <select v-model="inputs.itemCode" class="form-control" id="">
                                                  <option v-for="item in allitems" :value="item.itemCode">{{item.itemName}}</option>
                                                    
                                                </select>
                                            </div>

                                          </div>

                                          <div class="col-md-3">
                                            <div class="form-group">
                                              <label class="control-label">GIFMIS Reference Code <span class="text-danger">*</span></label>
                                              <input class="form-control" type="text" v-model="inputs.gifmisReferenceCode">
                                              
                                            </div>
                                          </div>

                                          <div class="col-md-3">
                                            <div class="form-group">
                                              <label class="control-label">Organisation Item Code <span class="text-danger">*</span></label>
                                              <input class="form-control" type="text" v-model="inputs.itemOrgCode">
                                              
                                            </div>
                                          </div>

                                          <div class="col-md-3">
                                            <div class="form-group">
                                              <label class="control-label">Item Name <span class="text-danger">*</span></label>
                                              <input class="form-control" type="text" v-model="inputs.itemName">

                                              <!-- <select v-model="inputs.itemName" class="form-control" id="">
                                                <option>Choose</option>
                                                <option v-for="item in allitems" :value="item.itemName">{{item.itemName}}</option>
                                                    
                                                </select> -->
                                            </div>
                                          </div>

                                          <div class="col-md-3">
                                            <div class="form-group">
                                              <label class="control-label">Price <span class="text-danger">*</span></label>
                                              <input class="form-control" type="number" v-model="inputs.price">
                                            </div>
                                          </div>

                                          <div class="col-md-3">
                                            <div class="form-group">
                                              <label class="control-label">Tax Type <span class="text-danger">*</span></label>
                                              <!-- <input class="form-control" type="text" v-model="inputs.taxType"> -->
                                              
                                              <select v-model="inputs.taxType" class="form-control" id="">
                                                <option v-for="taxx in tax" :value="taxx.taxValue">{{taxx.taxTypeName}}</option>
                                                  
                                              </select>
                                            </div>
                                          </div>

                                          <div class="col-md-3">
                                            <div class="form-group">
                                              <label class="control-label">Revenue Reference Number <span class="text-danger">*</span></label>
                                              <input class="form-control" type="text" v-model="inputs.remitaRevenueReference">
                                              
                                            </div>
                                          </div>

                                          <div class="col-md-3">
                                            <div class="form-group">
                                              <label class="control-label">Self Service</label><br>
                                              <input type="checkbox" v-model="inputs.isSelfService">
                                              
                                            </div>
                                          </div>

                                          <div class="col-md-3">
                                            <div class="form-group">
                                              <label class="control-label">Custom Fields</label><br>
                                              <input type="checkbox" v-model="inputs.hasCustomField">
                                              
                                            </div>
                                          </div>

                                          </div>

                                          <div class="mt-4 mb-4" v-if="inputs.hasCustomField">
                                            <h6>Custom Fields</h6>
                                            <hr>
                                            <div class="row" v-for="custom in inputs.customFields">
                                              <div class="col-md-3">
                                                <div class="form-group">
                                                  <label class="control-label">Organisation Item Code <span class="text-danger">*</span></label>
                                                  <input class="form-control" @change="change()" type="text" v-model="custom.itemCode">
                                                  
                                                </div>
                                              </div>

                                              <div class="col-md-3">
                                                <div class="form-group">
                                                  <label class="control-label">Field Name <span class="text-danger">*</span></label>
                                                  <input class="form-control" type="text" v-model="custom.fieldKey">
                                                  
                                                </div>
                                              </div>

                                              <div class="col-md-2">
                                                <div class="form-group">
                                                  <label class="control-label">Field Type <span class="text-danger">*</span></label>
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
                                                  <label class="control-label">Option <span class="text-danger">*</span></label>
                                                  <textarea class="form-control" name="" id="" cols="30" rows="1" v-model="custom.fieldOption"></textarea>
                                                </div>
                                              </div>
                                              <div class="col-md-1" style="margin-top: 30px;">
                                                <span class="btn btn-danger btn-sm" style="margin: 5px 0 0 0;" @click="deleteRow(k, custom)"><i class="fa fa-times"></i></span>
                                              </div>
                                            </div>
                                          </div>
                                        
                                          
                                        <button class="btn btn-outline-success mt-3">Save</button>
                                      </form>
                                    </div>
                                  </div>
                                </div>

                              </div>
                              
                                
                              
                            </div>
                        </div>
                        <!-- end select2 -->

                    </div>

                </div>
                <!-- end row -->

                <div class="row">
                  <div class="col-md-12">
                    <div class="card" >
                      <div class="card-body table-responsive">
                        <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                          <thead>
                          <tr>
                              <th>GIFMIS Item</th>
                              <th>GIFMIS Reference Code</th>
                              <th>Organisation Item Code</th>
                              <th>Item Name</th>
                              <th>Price</th>
                              <th>Tax Type</th>
                              <th>Revenue Reference Number</th>
                              <th>Self Service</th>
                              <th>Custom field</th>
                              <th>Action</th>
                          </tr>
                          </thead>


                          <tbody>
                          
                          <tr v-for="input in itemList">
                            
                            <td>{{input.itemCode}}</td>
                            <td>{{input.gifmisReferenceCode}}</td>
                            <td>{{input.itemName}}</td>
                            <td>{{input.itemOrgCode}}</td>
                            <td>{{input.price}}</td>
                            <td>{{input.taxType}}</td>
                            <td>{{input.remitaRevenueReference}}</td>
                            <td>{{input.isSelfService}}</td>
                            <td>{{input.hasCustomField}}</td>
                            <td><button @click="deleteItemRow(k, input)" class="btn btn-outline-danger btn-sm"><i class="fa fa-times"></i></button></td>

                          </tr>
                          <button class="btn btn-outline-success mt-4" disabled v-if="this.itemList == ''">Submit</button>

                          <button class="btn btn-outline-success mt-4" @click="submit()" v-if="this.itemList != ''">Submit</button>
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

        
  <router-view>

  </router-view>
</template>
<style scoped>

</style>