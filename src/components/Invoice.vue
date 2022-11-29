<script>
    import axios from "axios"
    import { useToast } from "vue-toastification";
    import moment from "moment";

    export default{
        name: 'invoices',
        
        data(){
            return{
                errors: [],
                message: [],

                allinvoice: {

                    organisationCode: '',
                    subOrganisationCode: '',
                    customerCode: '',
                    organisationName: '',
                    subOrganisationName: ''
                },

                customer: {
                    customerCode: '',

                },

                invoice: {
                    id: '',
                    invoiceCode: '',
                    invoiceDate: ''
                },

                items: {
                    amount: '',
                },

                role: '',

                roles: [],
                workflow: [],
                entryValue: '',
                comment: '',

                customerDetails: {
                    id: '',
                    emailAddress: '',
                    subOrganisationCode: '',
                    organizationCode: '',
                    firstName: '',
                    lastName: '',
                    middleName: '',
                    gender: '',
                    unit: '',
                },

                comment: '',
                entryValue: '',

                loaderDiv: '',
                mainDiv: 'd-none',

                roles: 'billing-oficer',
                roless: 'revenue-officer',

            }
            
        },

        async mounted(){
            this.role = localStorage.getItem('role');

            if(this.roles != this.role && this.roless != this.role){
                localStorage.removeItem('token');
                this.$router.push('/');
            }

            const resul = await axios.get('api/Users/profile',{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.customerDetails = resul.data.result;

            const role = await axios.get('api/roles/allroles', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.roles = role.data.result;

            // const resultss = await axios.get('api/WorkFlowItem/Items/'+this.customerDetails.organizationCode, {
            //     headers: {
            //         Authorization: 'Bearer ' + localStorage.getItem('token')
            //     }
            // },);
            // this.workflow = resultss.data.result;


            await axios.get('api/Invoice/details/'+this.$route.params.invoiceCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },)

            .then(res => {
                this.allinvoice = res.data.result.organisation;
                this.allinvoice = res.data.result.subOrganisation;
                this.customer = res.data.result.customer;
                this.invoice = res.data.result.invoice;
                this.items = res.data.result.items;
                this.loaderDiv = "d-none";
                this.mainDiv = "";

            })
            .catch(err => {
                console.log(err);
            })
            
        },

        computed: {
            
            total: function(){

                let total = [];

                Object.entries(this.items).forEach(([key, val]) => {
                    total.push(val.amount) // the value of the current key.
                });

                return total.reduce(function(total, num){ return total + num }, 0);

            },

            tax: function(){

                let total = [];

                Object.entries(this.items).forEach(([key, val]) => {
                    total.push(val.tax) // the value of the current key.
                });

                return total.reduce(function(total, num){ return total + num }, 0);

            },
        },

        methods: {

            dateTime(value) {
                return moment(value).format('MMMM Do YYYY');
            },

            async invoiceRebate(){

                const toast = useToast()

                if (!this.comment) {
                    toast.error("comment required.");
                }
                if (!this.entryValue) {
                    toast.error("Entry Value required.");
                }else{

                    const response = await axios.put('api/Invoice/addrebate', {
                        initiator: 0,
                        workFlowEntryItemID: 0,
                        reference: this.invoice.invoiceCode,
                        comment: this.comment,
                        entryValue: this.entryValue,
                        
                        
                    }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    },);

                    if(response) {

                        toast.success(response.data.message);

                        this.initiator = "";
                        this.workFlowEntryItemID = "";
                        this.comment = "";
                        this.entryValue = "";

                    }else{
                        toast.error("Incorrect Parameter");
                    }
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
                              <h4 class="mb-0">Bill <br> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} //</span> <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">Bill</li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
                  <!-- end page title -->

                  
                  <div class="row aa mb-5">
                    <div class="col-12">
                        <div class="cards">
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
                            <div class="card-body table-responsive">

                                <div class="brand-section" >
                                    <div class="row">
                                        <div class="col-6">
                                            <h1 class="text-dark">{{allinvoice.organisationName}}</h1>
                                            
                                            <h3 class="text-dark">{{allinvoice.subOrganisationName}}</h3>
                                        </div>
                                        <div class="col-6">
                                            <div class="company-details">
                                                <h2 class="heading">Invoice #{{invoice.invoiceCode}}</h2>
                                                <p class="sub-heading">Invoice Date: {{ dateTime(invoice.invoiceDate)}} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="body-section">
                                    <div class="row">
                                        
                                        <div class="col-6">
                                            <h4>Invoice To:</h4>
          
                                            <p class="sub-heading">Customer Code: {{invoice.customerCode}} </p>
                                            <!-- <p class="sub-heading">Invoice Date: {{invoice.invoiceDate}} </p> -->
                                            <p class="sub-heading">Curency Code: {{invoice.currencyCode}} </p>
                                        </div>
                                        <div class="col-6">
                                            <h4>Bill To:</h4>
                                            <p class="sub-heading">Full Name:  <strong>{{customer.firstname}} {{customer.lastname}}</strong></p>
                                            <p class="sub-heading">Email Address:  <strong>{{customer.emailAddress}}</strong></p>
                                            <p class="sub-heading">Phone Number:  <strong>{{customer.mobileNumber1}}, {{customer.mobileNumber2}}</strong></p>
                                            <p class="sub-heading">LGA,State: <strong>{{customer.lgaCode}}, {{customer.stateCode}}</strong> </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="body-section">
                                    <table class="text-center">
                                        <thead>
                                            <tr>
                                                <th>ITEM</th>
                                                <th class="w-20">Price</th>
                                                <th class="w-20">Quantity</th>
                                                <th class="w-20">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in items">
                                                <td>{{item.itemName}}</td>
                                                <td>{{item.price}}</td>
                                                <td>{{item.quantity}}</td>
                                                <td>{{item.amount}}</td>
                                            </tr>
                                            <!-- <tr>
                                                <td colspan="3" class="text-right">Sub Total</td>
                                                <td> 10.XX</td>
                                            </tr> -->
                                            <tr>
                                                <td colspan="3" class="text-right">Tax Total</td>
                                                <td> {{ tax }}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="3" class="text-right">Grand Total</td>
                                                <td> {{ total }} </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <br>
                                    <h3 class="heading">Payment Status: {{invoice.paymentStatus}}</h3>
                                </div>

                            </div>
                            </div>
                        </div>
                        <!-- <router-link to="/invoice-rebate"><button class="btn btn-info mt-3">Apply for Rebate</button></router-link> -->

                        <button class="btn btn-info mt-3" data-toggle="modal" data-target="#bs-example-modal-lg" v-if="role === 'billing-oficer' && invoice.paymentStatus == 'UNPAID'">Apply Rebate</button>

                        <div class="modal fade" id="bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    
                                    <div class="modal-header">
                                        <h5 id="myLargeModalLabel" class="modal-title mt-0">Apply Rebate</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form @submit.prevent="invoiceRebate">
                                            <div class="row">

                                                <div class="col-md-12 mb-4">
                                                    <div class="form-group">
                                                        <label class="control-label">Entry Value</label>
                                                        <input type="text" class="form-control" v-model="entryValue">
                                                    </div>
                                                </div>

                                                <div class="col-md-12 mb-4">
                                                    <div class="form-group">
                                                        <label class="control-label">Comment</label>
                                                        <textarea v-model="comment" class="form-control" id="" cols="30" rows="10"></textarea>
                                                    </div>
                                                </div>

                                                <div class="col">
                                                    <button type="submit" class="btn btn-success float-left">Apply Rebate</button>

                                                    <button type="button" class="btn btn-danger float-right" data-dismiss="modal">Close</button>
                                                </div>
                                            </div><hr>
                                        </form>
                                
                                        
                                    </div>
                                    
                                </div><!-- /.modal-content -->
                                
                            </div><!-- /.modal-dialog -->
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