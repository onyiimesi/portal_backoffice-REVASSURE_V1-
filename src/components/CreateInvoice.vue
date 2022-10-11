<!-- <script>
    import axios from 'axios'

    export default{
        name: 'createinvoice',

        data(){
            return{
                errors: [],
                message: [],

                allitem: [],
                allitems: [],
                allorg: [],

                allsub: [],

                allcustomer: [],

                orgitem: [],

                allcurrency: [],
                

                tax: [],
                price: [],

                invoicesubtotal: 0,
                invoicetotal: 0,
                invoicetax: 0,

                searchQuery: '',
                selectedItem: '',
                isVisible: false,

                searchQuerys: '',
                selectedItems: '',
                isVisibles: false,

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

                organisationCode: '',
                subOrganisationCode: '',
                customerCode: '',
                currencyCode: '',

                itemList: [],

                items: [{
                    itemCode: '',
                    quantity: '',
                }],

            }
        },

        computed: {
            filteredCustomer(){
                const query = this.searchQuery.toLowerCase();
                if(this.searchQuery == ""){
                    return this.allcustomer;
                }

                return this.allcustomer.filter((customer) => {
                    return Object.values(customer).some(word => String(word).toLowerCase().includes(query))
                });
                
            },

            filteredItem() {
                const query = this.searchQuerys.toLowerCase();
                if(this.searchQuerys == ""){
                    return this.orgitem;
                }

                return this.orgitem.filter((item) => {
                    return Object.values(item).some(word => String(word).toLowerCase().includes(query))
                });
                
            },

        },
        
        async mounted(){

            const resul = await axios.get('api/Users/profile', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.customerDetails = resul.data.result;


            const items = await axios.get('api/ItemHeader/items', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.allitem = items.data.result;

            const curren = await axios.get('api/Currency/allcurrencies', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.allcurrency = curren.data.result;


            const result = await axios.get('api/Organisation/details/'+this.customerDetails.organizationCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.allorg = result.data.result;

            const response = await axios.get('api/SubOrganisation/suborganizations/'+this.customerDetails.organizationCode,{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.allsub = response.data.result;

            const resp = await axios.get('api/Item/organizations/'+this.customerDetails.organizationCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.allitem = resp.data.result;

            this.organisationCode = this.customerDetails.organizationCode;
            this.subOrganisationCode = this.customerDetails.subOrganisationCode;
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

            addNewRow(){
                this.items.push({
                    itemCode: '',
                    quantity: '',
                })
            },

            deleteRow(index, newrow){
                var idx = this.items.indexOf(newrow);
                console.log(idx, index);
                if(idx > -1){
                    this.items.splice(idx, 1);
                }
                this.calculateTotal();
            },

            selectCustomer(cust){
                
                this.selectedItem = cust;
                this.isVisible = false;
            },

            selectOrgItems(cust){
                
                this.selectedItems = cust;
                this.isVisibles = false;
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

                // this.allsub = response.data.result;

                this.allitems = resp.data.result;
            },

            async onKeyUp(){
                const res = await axios.get('api/Customer/search?search='+this.searchQuery, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },);
                this.allcustomer = res.data.result;
            },

            async onKeyUps(){
                const ress = await axios.get('api/Item/organizations/'+this.customerDetails.organizationCode, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },+this.searchQuerys);
                this.orgitem = ress.data.result;
            },

            

            async createInvoice(){


                this.itemList.push(this.items);
        
                const response = await axios.post('api/Invoice/addinvoice', {
                    organisationCode: this.organisationCode,
                    subOrganisationCode: this.subOrganisationCode,
                    customerCode: this.selectedItem.customerCode,
                    currencyCode: this.currencyCode,

                    items: this.items,
                    
                }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },);

                console.log(response)

                if(response) {

                    this.message.push(response.data.message);
                    
                    this.selectedItem.customerCode = "";
                    this.currencyCode = "";
                    this.items = {};
                    this.selectedItem = "";
                    this.invoicesubtotal = "";
                    this.invoicetotal = "";
                    

                }else{
                    this.errors.push("Incorrect Parameter");
                }

            }
        }

    }
</script>
<template>

  
  <div id="layout-wrapper">

      
 

     
      <div class="main-content">

          <div class="page-content">
              <div class="container-fluid">

                  
                  <div class="row">
                      <div class="col-12">
                          <div class="page-title-box d-flex align-items-center justify-content-between">
                              <h4 class="mb-0">Create Invoice</h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">Create Invoice</li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
               

                  
                  <div class="row">
                    <div class="col-lg-12">
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
                                                    Create Invoice
                                                    <i class="mdi mdi-minus float-right accor-plus-icon"></i>
                                                </h6>
                                            </div>
                                        </a>

                                        <div id="collapseOne" class="collapse"
                                                aria-labelledby="headingOne" data-parent="#accordion">
                                            <div class="card-body">
                                                <form @submit.prevent="createInvoice">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            
                                                               
                                                                <select v-model="organisationCode" class="form-control" style="display: none;">
                                                                    
                                                                    <option :value="customerDetails.organizationCode">{{customerDetails.organizationCode}}</option>
                                                                    
                                                                </select>
                                                            
                                                        </div>

                                                        <div class="col-md-12">
                                                            
                                                                
                                                                <select v-model="subOrganisationCode" class="form-control" style="display: none;">
                                                                    <option :value="customerDetails.subOrganisationCode">{{customerDetails.subOrganisationCode}}</option>
                                                                    
                                                                </select>
                                                            
                                                        </div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label class="control-label">Search Customer</label>

                                                                <section class="dropdown-wrapper">
                                                                    <div class="selected-items" @click="isVisible = !isVisible">
                                                                        <span v-if="selectedItem" >
                                                                        <input type="text" v-model="selectedItem.firstname" readonly>
                                                                        
                                                                        </span>
                                                                        <span v-else>Search Customer</span>
                                                                    </div>
                                                                    <div v-if="isVisible" class="dropdown-popover">
                                                                        <input @keyup="onKeyUp()" type="text" v-model="searchQuery" placeholder="Search Customer Name" class="form-control">
                                                                        <span class="pl-4" v-if="filteredCustomer.length == 0">No Data Available</span>
                                                                        <div class="options">
                                                                            <ul>
                                                                                <li @click="selectCustomer(cust)" v-for="cust in filteredCustomer" :value="cust.firstname">{{cust.firstname}} {{cust.lastname}}</li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </section>
                                                                <div class="mt-3">
                                                                    <span v-if="selectedItem"><strong>Customer Details</strong></span>
                                                                </div><hr>
                                                                <div v-if="selectedItem">
                                                                    <div class="form-group">
                                                                        
                                                                            <span>{{selectedItem.emailAddress}}</span>
                                                                        
                                                                    </div>
                                                                </div>
                                                                <div v-if="selectedItem">
                                                                    <div class="form-group">
                                                                        <div>
                                                                            <span>{{selectedItem.mobileNumber1}}</span>
                                                                        </div>
                                                                    </div>
                                                                </div><hr>
                                                                
                                                                <select v-model="customerCode" class="form-control" searchable="Search here..">
                                                                    
                                                                    <option v-for="cust in allcustomer" :value="cust.customerCode">{{cust.customerCode}}</option>
                                                                    
                                                                </select>
                                                            </div>
                                                        </div>
                                            
                                                        <div class="col-md-3">
                                                            <div class="form-group">
                                                                <label class="control-label">Currency Code</label>
                                                              <input class="form-control" type="text" v-model="currencyCode"> 

                                                                <select v-model="currencyCode" class="form-control">
                                                               
                                                                    <option :value="this.allcurrency[0]">{{this.allcurrency[0]}}</option>

                                                                    <option :value="this.allcurrency[1]">{{this.allcurrency[1]}}</option>

                                                                    <option :value="this.allcurrency[2]">{{this.allcurrency[2]}}</option>
                                                                    
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="row" v-for="(newrow, k) in items" :key="k">

                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="control-label">Item Name</label>

                                                                <select v-model="newrow.itemCode" class="form-control" @change="onChange($event)">
                                                                    <option>Choose</option>
                                                                    <option v-for="sub in allitem" :value="sub.itemOrgCode">{{sub.itemCode}} - <strong>Price: {{sub.price}}</strong></option>
                                                                    
                                                                </select>

                                                                <section class="dropdown-wrapper">
                                                                    <div class="selected-items" @click="isVisibles = !isVisibles">
                                                                        <span v-if="selectedItems" >
                                                                        <input type="text" v-model="selectedItems.itemCode" readonly>
                                                                        
                                                                        </span>
                                                                        <span v-else>Item Name</span>
                                                                    </div>
                                                                    <div v-if="isVisibles" class="dropdown-popover">
                                                                        <input @keyup="onKeyUps" type="text" v-model="newrow.searchQuerys" placeholder="Search Item Org Code" class="form-control">
                                                                        <span class="pl-4" v-if="filteredItem.length == 0">No Data Available</span>
                                                                        <div class="options">
                                                                            <ul>
                                                                                <li @click="selectOrgItems(cust)" v-for="cust in filteredItem" :value="cust.itemCode">{{cust.itemCode}}</li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </section> 

                                                            </div>
                                                        </div>

                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="control-label">Quantity</label>
                                                                <input class="form-control" type="number" v-model="newrow.quantity" @keyup="calculateLineTotal(newrow)">
                                                            </div>
                                                        </div>

                                                        <div class="col-md-3">
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
                                                        </div> 
                                                    
        
                                                        <div class="col mb-4">
                                                            <div class="form-group">
                                                                <button class="btn btn-danger btn-sm mr-4 float-left" @click="deleteRow(k, newrow)"><i class="fa fa-trash-alt"></i> Remove Row</button>
                                                            </div>
                                                        </div>
                                                    
                                                    </div>
                                                    <hr>
                                                    <button class="btn btn-outline-success mr-4 float-left">Submit</button> 

                                                    <button class="btn btn-primary mr-4 float-left" @click="addNewRow()">Add Row</button>
                                                    
                                                     
                                                </form>
                                            </div>
                                        </div>

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
                                                            <p style="font-size: 16px;">Total Tax: <strong>{{ this.allitems.taxType }}</strong></p>
                                                        </div> 
                                                        <div class="mt-4">
                                                            <p style="font-size: 16px;">Grand Total: <strong>{{ invoicetotal }}</strong></p>
                                                        </div>
                                                    </div>
                                                </div>
                                           </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                         end select2

                    </div>
                </div>
                 end row

                

              </div>  container-fluid 
          </div>
         End Page-content

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
      end main content

  </div>
   END layout-wrapper

        
  <router-view>

  </router-view>
</template>
<style scoped>

</style> -->

<script>
    import axios from "axios";

    export default{
        data(){
            return{
                search: '',
                allcustomer: [],

                showsearch: false,
                caris: [],

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

            const result = await axios.get('api/Customer/allcustomer', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.allcustomer = result.data.result;
            setTimeout(() => {
            $("#datatable").DataTable({
                lengthMenu: [
                [5,10, 25, 50, -1],
                [5,10, 25, 50, "All"],
                ],
                pageLength: 10,
                language: {
                    searchPlaceholder: "Enter NIN, BVN or Full Name"
                }
            });
            });

        },

        methods: {
            async searchCustomer(){
                await axios.get('api/Customer/search?search='+this.search, {
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
                              <h4 class="mb-0">Create Bill <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} //</span> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">Create Bill</li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
                  <!-- end page title -->

                  
                  <div class="row">
                    <div class="col-md-12">
                        <div class="card" v-if="showsearch == true">
                            <div class="card-body table-responsive">
                                <!-- <div>
                                    <form @submit.prevent="searchCustomer">
                                        <div class="row">
                                            <div class="col-md-6">

                                            </div>
                                            <div class="col-md-6">
                                                <div class="d-flex">
                                                    
                                                    <input class="form-control mr-3" type="text" v-model="search" placeholder="Enter NIN or BVN or Fullname">

                                                    <button class="btn btn-outline-success ">Search</button>
                                                </div>
                                            </div>

                                            
                                        </div>
                                    </form>
                                </div><hr> -->
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>CUSTOMER NUMBER</th>
                                        <th>CUSTOMER NAME</th>
                                        <th>NATIONAL IDENTITY NUMBER</th>
                                        <th>MOBILE NUMBER</th>
                                        <th>ACTION</th>
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                    <tr v-if="!caris.length" class="text-center">
                                        <td colspan="7"><h3 style="color: red;">Customer Not Found!</h3></td>
                                    </tr>
                                    <tr v-for="cari in caris" :key="cari.id">
                                        <td>{{cari.customerCode}}</td>
                                        <td>{{cari.firstname}} {{cari.lastname}}</td>
                                        <td>{{cari.nin}}</td>
                                        <td>{{cari.mobileNumber1}}, {{cari.mobileNumber2}}</td>
                                        <td>
                                            <button class="btn btn-outline-success mr-2" data-toggle="modal" :data-target="'#bs-example-modal-lg-' + item.customerCode">More Details</button>
                                        </td>

                                        <div class="modal fade" :id="'bs-example-modal-lg-' + item.customerCode" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered modal-lg">
                                                <div class="modal-content">
                                                    
                                                    <div class="modal-header">
                                                        <h5 id="myLargeModalLabel" class="modal-title mt-0">Customer Information</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="row">
                                                            <div class="col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Customer Code</label>
                                                                    <h5>{{item.customerCode}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Customer Name</label>
                                                                    <h5>{{item.firstname}} {{item.lastname}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Email Address</label>
                                                                    <h5>{{item.emailAddress}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Phone Number</label>
                                                                    <h5>{{item.mobileNumber1}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Phone Number (2)</label>
                                                                    <h5>{{item.mobileNumber2}}</h5>
                                                                </div>
                                                            </div>

                                                            
                                                            <div class="col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Address</label>
                                                                    <h5>{{item.contactAddress}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">State</label>
                                                                    <h5>{{item.stateCode}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">LGA</label>
                                                                    <h5>{{item.lgaCode}}</h5>
                                                                </div>
                                                            </div>

                                                        </div><hr>

                                                        <router-link :to="'/customer-details/'+item.customerCode"><button type="button" class="btn btn-outline-success" data-dismiss="modal">View Profile</button></router-link>
                                                    </div>
                                                    
                                                </div><!-- /.modal-content -->
                                                
                                            </div><!-- /.modal-dialog -->
                                        </div>
                                    </tr>
                                    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        

                        <div class="card" v-if="showsearch == false">
                            <h5 class="pl-3 pt-3" style="font-size: 16px;">Create bill for a customer by picking a customer from the list below.</h5><hr>
                            <div class="card-body table-responsive">
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>Customer Number</th>
                                        <th>Customer Name</th>
                                        <th>Action</th>
                                        <!-- <th>BALANCE</th> -->
                                    </tr>
                                    </thead>


                                    <tbody>
                                    <tr v-for="item in allcustomer" :key="item.id">
                                        <td>{{item.customerCode}}</td>
                                        <td>{{item.firstname}} {{item.lastname}}</td>
                                        <td>
                                            <button class="btn btn-outline-success mr-2" data-toggle="modal" :data-target="'#bs-example-modal-lg-' + item.customerCode">View</button>
                                        </td>
                                        
                                        
                                        <div class="modal fade" :id="'bs-example-modal-lg-' + item.customerCode" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered modal-lg">
                                                <div class="modal-content">
                                                    
                                                    <div class="modal-header">
                                                        <h5 id="myLargeModalLabel" class="modal-title mt-0">Customer Information</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="row">
                                                            <div class="col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Customer Code</label>
                                                                    <h5>{{item.customerCode}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Customer Name</label>
                                                                    <h5>{{item.firstname}} {{item.lastname}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Email Address</label>
                                                                    <h5>{{item.emailAddress}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Phone Number</label>
                                                                    <h5>{{item.mobileNumber1}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Phone Number (2)</label>
                                                                    <h5>{{item.mobileNumber2}}</h5>
                                                                </div>
                                                            </div>

                                                            
                                                            <div class="col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Address</label>
                                                                    <h5>{{item.contactAddress}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">State</label>
                                                                    <h5>{{item.stateCode}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-3 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">LGA</label>
                                                                    <h5>{{item.lgaCode}}</h5>
                                                                </div>
                                                            </div>

                                                        </div><hr>

                                                        <router-link :to="'/customer-details/'+item.customerCode"><button type="button" class="btn btn-outline-success" data-dismiss="modal">View Profile</button></router-link>
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