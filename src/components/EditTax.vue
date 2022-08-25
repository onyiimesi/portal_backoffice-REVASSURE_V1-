<script>
    import axios from "axios"

    export default{
        name: 'editorg',
        
        data(){
            return{
                errors: [],
                message: [],

                alltax: {
                    id: '',
                    taxName: '',
                    taxType: '',
                    taxValue: '',
                }
                
                
            }
        },

        methods: {
            async editTax(){

                this.errors = [];
                this.message = [];

                
                
                if (!this.alltax.id) {
                    this.errors.push("ID required.");
                }

                if (!this.alltax.taxName) {
                    this.errors.push("Tax Name required.");
                }

                if (!this.alltax.taxType) {
                    this.errors.push("Tax Type required.");
                }

                if (!this.alltax.taxValue) {
                    this.errors.push("Tax Value required.");
                }
                
                const response = await axios.put('api/Taxtype/edittaxttype', {
                    id: this.alltax.id,
                    taxName: this.alltax.taxName,
                    taxType: this.alltax.taxType,
                    taxValue: this.alltax.taxValue,
                    
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

            const result = await axios.get('api/Taxtype/taxtype/'+this.$route.params.id);

            console.log(result.data.result);
            this.alltax = result.data.result;
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
                              <h4 class="mb-0">Edit Tax</h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">Edit Tax</li>
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
                                <form @submit.prevent="editTax">
                                    <div class="row">

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <!-- <label class="control-label">ID</label> -->
                                                <input class="form-control" type="hidden" v-model="alltax.id">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Tax Name</label>
                                                <input class="form-control" type="text" v-model="alltax.taxName">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Tax Type</label>
                                                <input class="form-control" type="text" v-model="alltax.taxType">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Tax Value</label>
                                                <input class="form-control" type="text" v-model="alltax.taxValue">
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