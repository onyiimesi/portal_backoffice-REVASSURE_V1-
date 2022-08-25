<script>
    import axios from "axios"

    export default{
        name: 'editunit',
        
        data(){
            return{
                errors: [],
                message: [],

                
                subOrganisationCode: '',
                unitName: '',
                organisationCode: '',
                unitCode: '',
                
                
                
            }
        },

        methods: {
            async editUnit(){

                this.errors = [];
                this.message = [];

                
                
                if (!this.subOrganisationCode) {
                    this.errors.push("Sub-Organisation Code required.");
                }

                if (!this.unitName) {
                    this.errors.push("Unit Name required.");
                }

                if (!this.organisationCode) {
                    this.errors.push("Organisation Code required.");
                }

                if (!this.unitCode) {
                    this.errors.push("Unit Code required.");
                }
                
                const response = await axios.put('api/Units/edit', {
                    subOrganisationCode: this.subOrganisationCode,
                    unitName: this.unitName,
                    organisationCode: this.organisationCode,
                    unitCode: this.unitCode,
                    
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
                              <h4 class="mb-0">Edit Unit</h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">Edit Unit</li>
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
                                <form @submit.prevent="editUnit">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Sub-Organisation Code</label>
                                                <input class="form-control" type="text" v-model="subOrganisationCode">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Unit Name</label>
                                                <input class="form-control" type="text" v-model="unitName">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Organisation Code</label>
                                                <input class="form-control" type="text" v-model="organisationCode">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Unit Code</label>
                                                <input class="form-control" type="text" v-model="unitCode">
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