<script>
    import axios from 'axios'

    export default{
        name: 'setuptax',

        data(){
            return{
                errors: [],
                message: [],

                taxTypeCode: '',
                taxTypeName: '',
                taxTypeType: '',
                
            }
        },  

        methods: {
            async handleTax(){
                this.errors = [];
                this.message = [];

                
                
                if (!this.taxTypeCode) {
                    this.errors.push("Tax Code required.");
                }

                if (!this.taxTypeName) {
                    this.errors.push("Tax Name required.");
                }

                if (!this.taxTypeType) {
                    this.errors.push("Tax Type required.");
                }
                
                const response = await axios.post('api/Taxtype/addtaxtype', {
                    taxTypeCode: this.taxTypeCode,
                    taxTypeName: this.taxTypeName,
                    taxTypeType: this.taxTypeType,
                    
                }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },);
                

                if (response) {
                    console.log(response);
                    this.message.push(response.data.message);

                    this.taxTypeCode = "";
                    this.taxTypeName = "";
                    this.taxTypeType = "";
                }else{
                    this.errors.push("Fields cannot be empty");
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
                              <h4 class="mb-0">Create Tax Types</h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">Create Tax Types</li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
                  <!-- end page title -->

                  
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
                                <form @submit.prevent="handleTax">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Organization</label>
                                                <input class="form-control" type="text">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Tax type code</label>
                                                <input class="form-control" type="text" v-model="taxTypeCode">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Tax type name</label>
                                                <input class="form-control" type="text" v-model="taxTypeName">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Tax type</label><br>
                                                <input type="radio" v-model="taxTypeType"> Value
                                                <input type="radio" v-model="taxTypeType"> Percentage
                                            </div>
                                        </div>

                                    </div>
                                    <button class="btn btn-success mr-4 float-left">Save</button>

                                </form>
                                <!-- <button type="reset" class="btn btn-primary float-left">Cancel</button> -->
                                
                            </div>
                        </div>
                        <!-- end select2 -->

                    </div>


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