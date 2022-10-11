<script>
    import axios from "axios"
    import { useToast } from "vue-toastification";

    export default{
        name: 'setupworkflow',
        
        data(){
            return{
                errors: [],
                message: [],

                entry: {
                    entryValue: '',
                    initiatorComment: '',
                    
                },

                customerDetails: {
                    id: '',
                    emailAddress: '',
                    subOrganisationCode: '',
                    organizationCode: '',
                    firstName: '',
                    lastName: '',
                    middleName: '',
                    gender: '',
                },
                
                role: ''
                
            }
        },

        async mounted(){
            this.role = localStorage.getItem('role');

            const result = await axios.get('api/Users/profile', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.customerDetails = result.data.result;

            const results = await axios.get('api/WorkFlowEntry/Entries'+this.$route.params.workFlowEntryID, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.entry = results.data.result;

        },

        methods: {

            async getActions(event){

                const resultss = await axios.get('api/ModuleAction/getactions/'+event.target.value, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },);
                this.moduleactions = resultss.data.result;

            },

            async approveEntry(){

                const toast = useToast()

                if (!this.action) {
                    toast.error("Item required.");
                }

                if (!this.description) {
                    toast.error("Description required.");
                }else{
        
                    const response = await axios.post('api/WorkFlowItem/AddItem', {
                        action: this.action,
                        module: this.module,
                        organizationCode: this.customerDetails.organizationCode,
                        description: this.description,
                        
                    }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    },);

                    if(response) {

                        toast.success(response.data.message);

                        this.action = "";
                        this.module = "";
                        this.description = "";

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
                              <h4 class="mb-0">Approve Entry, <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} - {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">Approve Entry</li>
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
                                <form @submit.prevent="approveEntry">
                                    <div class="form-group">
                                        <input class="form-control" type="hidden" v-model="customerDetails.organizationCode">
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 mb-4">
                                            <div class="form-group">
                                                <label class="control-label">Entry Value</label>
                                                <input type="text" class="form-control" v-model="entry.entryValue">
                                            </div>
                                        </div>

                                        <div class="col-md-12 mb-4">
                                            <div class="form-group">
                                                <label class="control-label">Comment</label>
                                                <textarea v-model="entry.initiatorComment" class="form-control" id="" cols="30" rows="10"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <button class="btn btn-success mr-4">Approve</button>
                                            </div>
                                        </div>
                                    </div>

                                </form>
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