<script>
    import axios from "axios"

    export default{
        name: 'editbank',
        
        data(){
            return{
                errors: [],
                message: [],

                allbanks: {
                    bankCode: '',
                    bankName: '',
                }
                
                
            }
        },

        methods: {
            async editBank(){
                this.errors = [];
                this.message = [];

                
                
                if (!this.bankCode) {
                    this.errors.push("Bank Code required.");
                }

                if (!this.bankName) {
                    this.errors.push("Bank Name required.");
                }
                
                const response = await axios.put('api/Bank/editbank', {
                    bankCode: this.allbanks.bankCode,
                    bankName: this.allbanks.bankName,
                    
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

            const result = await axios.get('api/Bank/detals/'+this.$route.params.bankCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            // console.log(this.$route.params.bankCode)
            console.log(result.data.result);
            this.allbanks = result.data.result;
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
                              <h4 class="mb-0">Edit Bank</h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">Edit Bank</li>
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
                                <form @submit.prevent="editBank">
                                    <div class="row">
                                        <!-- <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Organization</label>
                                                <input class="form-control" type="text" >
                                            </div>
                                        </div> -->

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Bank Code</label>
                                                <input class="form-control" type="text" v-model="allbanks.bankCode">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Bank Name</label>
                                                <input class="form-control" type="text" v-model="allbanks.bankName">
                                            </div>
                                        </div>

                                        <!-- <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Bank Nuban</label>
                                                <input class="form-control" type="text" >
                                            </div>
                                        </div> -->

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