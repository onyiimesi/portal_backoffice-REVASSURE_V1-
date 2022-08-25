<script>
  import axios from 'axios'

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

        


      }
    },

    async mounted(){

      const resul = await axios.get('api/Users/profile', {
          headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
          }
      },);
      this.customerDetails = resul.data.result;
      

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

      async handleItem(){

        this.errors = [];
        this.message = [];


        if (!this.inputs.itemCode) {
          this.errors.push("Item Code required.");
        }

        if (!this.inputs.itemName) {
          this.errors.push("Item Name required.");
        }

        if (!this.inputs.organisationCode) {
          this.errors.push("Organisation Code required.");
        }

        if (!this.inputs.subOrganisationCode) {
          this.errors.push("Sub-Organisation Code required.");
        }

        if (!this.inputs.remitaRevenueReference) {
          this.errors.push("Remita Revenue required.");
        }

        if (!this.inputs.gifmisReferenceCode) {
          this.errors.push("GIFMIS Reference Code required.");
        }

        if (!this.inputs.price) {
          this.errors.push("Price required.");
        }

        if (!this.inputs.taxType) {
          this.errors.push("Tax Type required.");
        }

        if (!this.inputs.itemOrgCode) {
          this.errors.push("Item Organisation Code required.");
        }

        this.itemList.push(this.inputs);

        // this.itemList.push(this.customFields);


        

        this.inputs = {
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
            
        }
        
      },

      async submit(){
        
        const response = await axios.post('api/Item/additem',this.itemList,this.customList, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        },);

        if(response) {

          this.message.push(response.data.message);

          this.itemList = [];

        }else{
          this.errors.push("Incorrect Parameter");
        }

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
                              <h4 class="mb-0">Setup Items</h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">Setup Items</li>
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
                                        Setup Items
                                        <i class="mdi mdi-minus float-right accor-plus-icon"></i>
                                      </h6>
                                    </div>
                                  </a>

                                  <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div class="card-body">
                                      <form @submit.prevent="handleItem">
                                        <div class="row">

                                          <div class="col-md-3">
                                            
                                            <div class="form-group">
                                                <label class="control-label">Item Code</label>
                                                <select v-model="inputs.itemCode" class="form-control" id="">
                                                  <option>Choose</option>
                                                  <option v-for="item in allitems" :value="item.itemCode">{{item.itemCode}}</option>
                                                    
                                                </select>
                                            </div>

                                          </div>

                                          <div class="col-md-3">
                                            <div class="form-group">
                                              <label class="control-label">Item Name</label>
                                              <select v-model="inputs.itemName" class="form-control" id="">
                                                <option>Choose</option>
                                                <option v-for="item in allitems" :value="item.itemName">{{item.itemName}}</option>
                                                    
                                                </select>
                                            </div>
                                          </div>

                                          <div class="col-md-3">
                                            <div class="form-group">
                                                <label class="control-label">Organisation Code</label>
                                                <select v-model="inputs.organisationCode"  class="form-control">
                                                    <!-- <option>Choose</option> -->
                                                    <option :value="customerDetails.organizationCode">{{customerDetails.organizationCode}}</option>
                                                    
                                                </select>
                                            </div>
                                          </div>

                                          <div class="col-md-3">
                                            <div class="form-group">
                                              <label class="control-label">Sub-Organisation Code</label>

                                              <select v-model="inputs.subOrganisationCode" class="form-control" id="">

                                                <option :value="customerDetails.subOrganisationCode">{{customerDetails.subOrganisationCode}}</option>
                                                  
                                              </select>
                                              
                                            </div>
                                          </div>

                                          <div class="col-md-3">
                                            <div class="form-group">
                                              <label class="control-label">Revenue Reference Number</label>
                                              <input class="form-control" type="text" v-model="inputs.remitaRevenueReference">
                                              
                                            </div>
                                          </div>

                                          <div class="col-md-3">
                                            <div class="form-group">
                                              <label class="control-label">GIFMIS Reference Code</label>
                                              <input class="form-control" type="text" v-model="inputs.gifmisReferenceCode">
                                              
                                            </div>
                                          </div>

                                          <div class="col-md-3">
                                            <div class="form-group">
                                              <label class="control-label">Price</label>
                                              <input class="form-control" type="text" v-model="inputs.price">
                                            </div>
                                          </div>

                                          <div class="col-md-3">
                                            <div class="form-group">
                                              <label class="control-label">Tax Type</label>
                                              <!-- <input class="form-control" type="text" v-model="inputs.taxType"> -->
                                              
                                              <select v-model="inputs.taxType" class="form-control" id="">
                                                <option>Choose</option>
                                                <option v-for="taxx in tax" :value="taxx.taxValue">{{taxx.taxTypeName}}</option>
                                                  
                                              </select>
                                            </div>
                                          </div>

                                          <div class="col-md-3">
                                            <div class="form-group">
                                              <label class="control-label">Item Org Code</label>
                                              <input class="form-control" type="text" v-model="inputs.itemOrgCode">
                                              
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
                                                  <label class="control-label">Item Org Code</label>
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
                                        
                                          
                                        <button class="btn btn-success float-left mr-4">Save</button>
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
                              <th>ITEM CODE</th>
                              <th>ITEM NAME</th>
                              <th>ORGANISATION CODE</th>
                              <th>SUB-ORGANISATION CODE</th>
                              <th>REVENUE REFERENCE NO</th>
                              <th>GIFMIS REFERENCE CODE</th>
                              <th>PRICE</th>
                              <th>TAX TYPE</th>
                              <th>ITEM ORG CODE</th>
                              <th>SELF SERVICE</th>
                              <th>CUSTOM FIELD</th>
                              <!-- <th>LABEl</th>
                              <th>FIELD NAME</th>
                              <th>FIELD TYPE</th>
                              <th>OPTION</th> -->
                          </tr>
                          </thead>


                          <tbody>
                          
                          <tr v-for="input in itemList">
                            
                            <td>{{input.itemCode}}</td>
                            <td>{{input.itemName}}</td>
                            <td>{{input.organisationCode}}</td>
                            <td>{{input.subOrganisationCode}}</td>
                            <td>{{input.remitaRevenueReference}}</td>
                            <td>{{input.gifmisReferenceCode}}</td>
                            <td>{{input.price}}</td>
                            <td>{{input.taxType}}</td>
                            <td>{{input.itemOrgCode}}</td>
                            <td>{{input.isSelfService}}</td>
                            <td>{{input.hasCustomField}}</td>

                            <!-- <td>{{inputs.customFields.itemCode}}</td>
                            <td>{{inputs.customFields.fieldKey}}</td>
                            <td>{{inputs.customFields.fieldType}}</td>
                            <td>{{inputs.customFields.fieldOption}}</td> -->

                          </tr>
                          <button class="btn btn-success mt-2" @click="submit()">Submit</button>
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