<script>
    import axios from "axios"
    import { useToast } from "vue-toastification";

    export default{
        name: 'editlga',
        
        data(){
            return{
                errors: [],
                message: [],

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

               lga:{
                    id: '',
                    lgaName: '', 
               },

               roless: 'revenue-officer',

            }
        },

        async mounted(){

            this.role = localStorage.getItem('role');

            if(this.roless != this.role){
                localStorage.removeItem('token');
                this.$router.push('/');
            }

            const result = await axios.get('api/Lga/lga/'+this.$route.params.lgaCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.lga = result.data.result;

        },

        methods: {
            async editLGA(){

                this.errors = [];
                this.message = [];
                const toast = useToast()
                

                if (!this.lga.lgaName) {
                    toast.error("LGA Name required.");
                }
                
                const response = await axios.put('api/Lga/editlga', {
                    id: this.lga.id,
                    lgaName: this.lga.lgaName,
                    
                }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },);
                

                if (response) {
                    
                    toast.success(response.data.message);

                }else{
                    toast.error("Incorrect Parameter");
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
                              <h4 class="mb-0">Edit LGA</h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">Edit LGA</li>
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
                                <form @submit.prevent="editLGA">
                                    <div class="row">

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                
                                                <input class="form-control" type="hidden" v-model="lga.id">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">LGA Name</label>
                                                <input class="form-control" type="text" v-model="lga.lgaName">
                                            </div>
                                        </div>

                                    </div>
                                    <button class="btn btn-success mr-4 float-left">Edit</button>
                                    
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