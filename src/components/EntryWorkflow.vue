<script>
    import axios from "axios"
    import { useToast } from "vue-toastification";

    export default{
        name: 'approveworkflow',
        
        data(){
            return{
                errors: [],
                message: [],

                entry: [],

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
                
                role: '',
                
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

            const results = await axios.get('api/WorkFlowEntry/Entries', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.entry = results.data.result;
            setTimeout(() => {
            $("#datatable").DataTable({
                lengthMenu: [
                [5,10, 25, 50, -1],
                [5,10, 25, 50, "All"],
                ],
                pageLength: 10,
            });
            });

        },

        methods: {

            async approveWorkflow(){

                const toast = useToast()

                if (!this.item) {
                    toast.error("Item required.");
                }

                if (!this.initiatorRole) {
                    toast.error("Initiator Role required.");
                }
                if (!this.verifierRole) {
                    toast.error("Verifier Role required.");
                }
                if (!this.condition) {
                    toast.error("Condition required.");
                }else{
        
                    const response = await axios.post('api/WorkFlowApproval/AddItem', {
                        item: this.item,
                        organizationCode: this.customerDetails.organizationCode,
                        initiatorRole: this.initiatorRole,
                        verifierRole: this.verifierRole,
                        condition: this.condition,
                        
                    }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    },);

                    if(response) {

                        toast.success(response.data.message);

                        this.item = "";
                        this.initiatorRole = "";
                        this.verifierRole = "";
                        this.condition = "";

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
                              <h4 class="mb-0">Workflow Entry, <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} - {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">Workflow Entry</li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
                  <!-- end page title -->

                  
                  <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body table-responsive">
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                        <tr>
                                            <th>Entry Value</th>
                                            <th>Comment</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    <tr v-for="entries in entry">
                                        <td>{{entries.entryValue}}</td>
                                        <td>{{entries.initiatorComment}}</td>
                                        <td>
                                            <button class="btn btn-success mr-2" data-toggle="modal" :data-target="'#bs-example-modal-lg-' + entries.workFlowEntryID">View</button>
                                        </td>


                                        <div class="modal fade" :id="'bs-example-modal-lg-' + entries.workFlowEntryID" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    
                                                    <div class="modal-header">
                                                        <h5 id="myLargeModalLabel" class="modal-title mt-0">View Entry</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="row">
                                                            <div class="col-md-6 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Entry Value</label>
                                                                    <h5>{{entries.entryValue}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-6 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Comment</label>
                                                                    <h5>{{entries.initiatorComment}}</h5>
                                                                </div>
                                                            </div>

                                                        </div><hr>
                                                
                                                        <router-link :to="'/approve-entry/'+ entries.workFlowEntryID"><button class="btn btn-success float-left" data-dismiss="modal">Approve</button></router-link> &nbsp; 
                                            
                                                        <router-link :to="'/reject-entry/'+ entries.workFlowEntryID"><button class="btn btn-danger float-right" data-dismiss="modal">Reject</button></router-link>
                                                    </div>
                                                    
                                                </div><!-- /.modal-content -->
                                                
                                            </div><!-- /.modal-dialog -->
                                        </div>
                                    </tr>
                                    </tbody>
                                </table>
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