<script>
    import axios from "axios"
    import { useToast } from "vue-toastification";

    export default{
        name: 'customeruserinvoice',
        
        data(){
            return{
                errors: [],
                message: [],

                allitem: [],
                allitems: [],
                

                invoicesubtotal: 0,
                invoicetotal: 0,
                invoicetax: 0,

                tax: [],
                price: [],

                allorg: [],

                allsub: [],

                allcurrency: [],

                customerDetails: {

                    customerCode: '',
                    fullNames: '',
                    id: '',
                    fullNames: '',
                },

                orgDetails: {

                    emailAddress: '',
                    subOrganisationCode: '',
                    organizationCode: '',
                    firstName: '',
                    lastName: '',
                    middleName: '',
                    gender: '',
                    unit: '',
                },

                organizationCode: '',
                subOrganizationCode: '',
                customerCode: '',
                currencyCode: '',

                itemList: [],

                items: [{
                    itemCode: '',
                    quantity: '',
                    line_total: 0,
                    
                }],

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
            this.orgDetails = resul.data.result;


            const results = await axios.get('api/Customer/details/'+this.$route.params.id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.customerDetails = results.data.result;

            const curren = await axios.get('api/Currency/allcurrencies', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.allcurrency = curren.data.result;
            

            const resp = await axios.get('api/Item/organizations/'+this.orgDetails.organizationCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.allitem = resp.data.result;


            const result = await axios.get('api/Organisation/details/'+this.orgDetails.organizationCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.allorg = result.data.result;

        },

        methods: {

            calculateTotal(){
                var subtotal, total;
                subtotal = this.items.reduce(function (sum, product) {
                    var lineTotal = parseFloat(product.line_total);
                    if(!isNaN(lineTotal)){
                        return sum + lineTotal;
                    }
                }, 0);

                this.invoicesubtotal = subtotal.toFixed(2);

                total = (subtotal * (this.allitems.taxType / 100)) + subtotal;
                total = parseFloat(total);

                if(!isNaN(total)){
                    this.invoicetotal = total.toFixed(2);
                }else{
                    this.invoicetotal = '0.00'
                }

            },

            calculateLineTotal(newrow){
                var total = parseFloat(this.allitems.price) * parseFloat(newrow.quantity);
                if(!isNaN(total)){
                    newrow.line_total = total.toFixed(2);
                }
                this.calculateTotal();
            },

            

            deleteRow(index, newrow){
                var idx = this.items.indexOf(newrow);
                if(idx > -1){
                    this.items.splice(idx, 1);
                }
                this.calculateTotal();
            },

            async onChange(event) {

                // const response = await axios.get('api/SubOrganisation/suborganizations/'+event.target.value,{
                //     headers: {
                //         Authorization: 'Bearer ' + localStorage.getItem('token')
                //     }
                // },);

                const resp = await axios.get('api/Item/details/'+event.target.value, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },);

                this.allitems = resp.data.result.itemDetails;

                // console.log(this.allitems)

                
                this.items.push({
                    itemCode: '',
                    quantity: '',
                    line_total: 0,
                    
                })
                
            },

            async createInvoice(){
                this.errors = [];
                this.message = [];
                const toast = useToast()

                if(!this.currencyCode){
                    toast.error("Please choose a currency");
                }else{

                    this.itemList.push(this.items);
            
                    await axios.post('api/Invoice/addinvoice', {
                        organizationCode: this.orgDetails.organizationCode,
                        SubOrganizationCode: this.orgDetails.subOrganisationCode,
                        customerCode: this.customerDetails.customerCode,
                        currencyCode: this.currencyCode,

                        items: this.items,
                        
                    }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    },).then(response => { 
                        toast.success(response.data.message);
                        
                        this.currencyCode = "";
                        this.items = [{
                            itemCode: '',
                            quantity: '',
                            line_total: 0,
                            
                        }];
                        this.invoicesubtotal = "";
                        this.invoicetotal = "";
                        this.allitems = "";
                    })
                    .catch(error => {
                        if(error.response.data.title){
                            toast.error("Please fill in all the fields");
                        }
                        
                    });

                    
                }
                

                
                 
            },

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
                              <h4 class="mb-0">Create Customer Bill <br> <span style="font-size: 14px;font-weight: 500;">{{orgDetails.organizationCode}} //  {{orgDetails.subOrganisationCode}} //</span> <span style="font-size: 14px;font-weight: 500;">{{orgDetails.lastName}} {{orgDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">Create Customer Bill</li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
                  <!-- end page title -->

                    
                  <div class="row">
                    <form @submit.prevent="createInvoice" class="w-100">
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="col-md-6 m-0 p-0">
                                <div class="bg-white p-4 h-100">
                                    <div class="">
                                        <div class="mb-4">
                                            <h3>{{customerDetails.firstname}} {{customerDetails.lastname}}</h3>
                                        </div>
                                        <div class="mb-3">
                                            <p style="font-size: 18px;">{{customerDetails.contactAddress}}</p>
                                        </div>
                                        <div class="mb-3">
                                        <p style="font-size: 18px;">{{customerDetails.customerCode}}</p> 
                                        </div>
                                        <div class="mb-3">
                                            <p style="font-size: 18px;">{{customerDetails.mobileNumber1}} - {{customerDetails.emailAddress}}</p>
                                        </div>


                                        
                                    </div> 
                                </div>
                            </div>

                            <div class="col-md-6 p-0">
                                <div class="bg-white p-4">
                                    <div class="">
                                        <div class="form-group">
                                            <label for="">Invoice Date</label>
                                            <input type="date" class="form-control">
                                        </div>

                                        <div class="form-group">
                                            <label for="">Due Date</label>
                                            <input type="date" class="form-control">
                                        </div>

                                        <div class="form-group">
                                            <label class="control-label">Currency <span class="text-danger">*</span></label>
                                            <select v-model="currencyCode" class="form-control">
                                                
                                                <option :value="this.allcurrency[0]">{{this.allcurrency[0]}}</option>

                                                <option :value="this.allcurrency[1]">{{this.allcurrency[1]}}</option>

                                                <option :value="this.allcurrency[2]">{{this.allcurrency[2]}}</option>
                                                
                                            </select>
                                        </div>
                                        
                                    </div> 
                                </div>
                            </div>
                        </div>
                        
                        
                        <!-- end select2 -->

                    </div>
                    <div class="bg-white p-4 mb-4 w-100">
                        
                            <div class="">
                                <div class="">
                                    <div class="">
                                        <!-- <label class="control-label">Organisation Code</label> -->

                                        <input class="form-control" readonly type="hidden" v-model="orgDetails.organizationCode">
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <!-- <label class="control-label">Sub-Organisation Code</label> -->
                                        <input class="form-control" readonly type="hidden" v-model="orgDetails.subOrganisationCode">
                                    </div>
                                </div>

                                <div class="">
                                    <div class="">
                                        <!-- <label class="control-label">Customer Code</label> -->
                                        <input class="form-control" readonly type="hidden" v-model="customerDetails.customerCode">
                                        
                                    </div>
                                </div>
                            </div>
                            
                           

                            <div class="row">

                                    <div class="col-md-12">
                                        <div class="alert alert-danger" v-if="errors.length">
                                        <b>Please correct the following error(s):</b>
                                        <ul>
                                            <li v-for="error in errors">{{ error }}</li>
                                        </ul>
                                    </div>
                                    <div class="alert alert-success" v-if="message.length">
                                        <strong v-for="msg in message">{{ msg }}</strong>
                                    </div>

                                    <table class="table table-bordered text-center">
                                    <thead class="bg-dark text-white">
                                        <td>Item Name & Price <span class="text-danger">*</span></td>
                                        <!-- <td>Price</td> -->
                                        <td>Quantity <span class="text-danger">*</span></td>
                                        <td>Amount</td>
                                        <td></td>
                                    </thead>

                                    <tbody v-for="newrow in items" :key="newrow">
                                        <tr>
                                            <td>
                                                <select v-model="newrow.itemCode" class="form-control" @change="onChange($event)" :key="newrow">
                                                    <option v-for="sub in allitem" :value="sub.itemOrgCode">{{sub.itemCode}} - PRICE: {{sub.price}}</option>
                                                    
                                                </select>
                                            </td>
                                            <!-- <td>
                                                <input class="form-control" type="text"  v-model="newrow.price" @keyup="calculateLineTotal(newrow)" >
                                                <p >
                                                    {{ newrow.allitems }}
                                                </p>
                                            </td> -->
                                            <td>
                                                <input class="form-control" type="number" v-model="newrow.quantity" @keyup="calculateLineTotal(newrow)" :key="newrow">
                                            </td>
                                            <td>
                                                <p>
                                                    {{newrow.line_total}}
                                                </p>
                                            </td>
                                            <td>
                                                <span class="btn btn-danger btn-sm" style="margin: 5px 0 0 0;" @click="deleteRow(k, newrow)"><i class="fa fa-times"></i></span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                                
                                <!-- <div class="col-md-3">
                                    <div class="form-group">
                                        <label class="control-label">Item Name</label>

                                        

                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label class="control-label">Price</label>
                                        
                                        
                                    </div>
                                </div>

                                <div class="col-md-2">
                                    <div class="form-group">
                                        <label class="control-label">Quantity</label>
                                        
                                    </div>
                                </div>

                                <div class="col-md-2">
                                    <div class="form-group">
                                        <label class="control-label">Amount</label>
                                        
                                    </div>
                                </div>

                                <div class="col-md-2">
                                    
                                </div>

                                <div class="">
                                    <div class="mb-4" style="margin: 0 0 0 12px;">
                                        <div class="form-group">
                                            <textarea name="" class="form-control" cols="40" rows="2" placeholder="Description"></textarea>
                                        </div>
                                    </div>
                                </div> -->
                                <!-- <div class="col-md-3">
                                    <div class="form-group">
                                        <label class="control-label">Tax</label>
                                        <input class="form-control" type="number" v-model="allitems.taxType">

                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label class="control-label">Price</label>
                                        <input class="form-control" type="text" v-model="invoicesubtotal" readonly>

                                    </div>
                                </div> -->

                                </div>
                                <hr>
                                    

                                <!-- <button class="btn btn-primary mr-4 float-left" @click="addNewRow()">Add Row</button> -->
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6">
                                            
                                        </div>
                                        <div class="col-md-6">
                                            <div class="text-right">
                                                <div>
                                                    <p style="font-size: 16px;">Subtotal: <strong>{{ invoicesubtotal }}</strong></p>
                                                </div>
                                                <div>
                                                    <p style="font-size: 16px;">VAT: <strong>{{ this.allitems.taxType }}</strong></p>
                                                </div>
                                                <div class="mt-4">
                                                    <p style="font-size: 16px;">Grand Total: <strong>{{ invoicetotal }}</strong></p>
                                                </div>

                                                <button class="btn btn-success mt-3">Submit</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                        
                            </div>
                        </form>
                    </div>
                    <!-- end row -->

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