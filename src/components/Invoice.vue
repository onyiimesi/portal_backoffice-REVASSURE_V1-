<script>
    import axios from "axios"

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
                },

                customer: {
                    customerCode: '',

                },

                invoice: {
                    invoiceCode: '',
                },

                items: {
                    amount: '',
                },

            }
            
        },

        async mounted(){


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
                              <h4 class="mb-0">Invoice</h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">Invoice</li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
                  <!-- end page title -->

                  
                  <div class="row aa mb-5">
                    <div class="col-12">
                        <div class="cards">
                            <div class="card-body table-responsive">

                                <div class="brand-section" >
                                    <div class="row">
                                        <div class="col-6">
                                            <h1 class="text-dark">{{allinvoice.organisationCode}}</h1>
                                            
                                            <h3 class="text-dark">{{allinvoice.subOrganisation1}}</h3>
                                        </div>
                                        <div class="col-6">
                                            <div class="company-details">
                                                <h2 class="heading">Invoice #{{invoice.invoiceCode}}</h2>
                                                <p class="sub-heading">Invoice Date: {{invoice.invoiceDate}} </p>
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
                                                <td>{{item.itemCode}}</td>
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
                                    <!-- <h3 class="heading">Payment Mode: Cash on Delivery</h3> -->
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