
<script>
    import axios from "axios"
    import { useToast } from "vue-toastification";

    export default{
        name: 'setup-workflow',
        
        data(){
            return{
                errors: [],
                message: [],

                actions: [],
                moduleactions: [],
                workflow: [],

                action: '',
                module: '',
                description: '',
                initiatorRole: '',
                totalApprovals: '',

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

            const results = await axios.get('api/Modules/modules', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.actions = results.data.result;

            const resul = await axios.get('api/WorkFlowItem/Items/'+this.customerDetails.organizationCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.workflow = resul.data.result;

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

            async setupWorkflow(){

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
                        initiatorRole: this.initiatorRole,
                        totalApprovals: this.totalApprovals,
                        
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
                        this.initiatorRole = "";
                        this.totalApprovals = "";

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
                              <h4 class="mb-0">Setup Workflow, <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} - {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">Setup Workflow</li>
                                  </ol>
                              </div>

                          </div>
                      </div>
                  </div>
                  <!-- end page title -->

                  
                  <div class="row">
                    <div class="col-lg-6">
                        <div class="card">
                            <div class="card-body">
                                <form @submit.prevent="setupWorkflow">
                                    <div class="form-group">
                                        <input class="form-control" type="hidden" v-model="customerDetails.organizationCode">
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Module</label>
                                                <select @change="getActions($event)" v-model="module" class="form-control select2">
                                                    <option v-for="act in actions" :value="act.modCode" :key="act.modCode">{{act.modName}}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Item</label>
                                                <select v-model="action" class="form-control select2">
                                                    <option v-for="act in moduleactions" :value="act.actionCode" :key="act.actionCode">{{act.actionName}}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Initiator</label>
                                                <input type="text" class="form-control" v-model="initiatorRole">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Total Approval</label>
                                                <input type="text" class="form-control" v-model="totalApprovals">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Description</label>
                                                <textarea v-model="description" class="form-control" id="" cols="30" rows="10"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <button class="btn btn-success mr-4">Create</button>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                        <!-- end select2 -->

                    </div>

                    <div class="col-lg-6">
                        <div class="card">
                            <div class="card-body table-responsive">
                                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Description</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    <tr v-for="act in workflow" :key="act.workFlowItemAction">
                                        <td>{{act.workFlowItemAction}}</td>
                                        <td>{{act.workFlowItemDescription}}</td>
                                        <td>
                                           <button class="btn btn-success mr-2" data-toggle="modal" :data-target="'#bs-example-modal-lg-' + act.workFlowItemID">View</button>
                                        </td>

                                        <div class="modal fade" :id="'bs-example-modal-lg-' + act.workFlowItemID" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    
                                                    <div class="modal-header">
                                                        <h5 id="myLargeModalLabel" class="modal-title mt-0">View Workflow</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="row">
                                                            <div class="col-md-6 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Item</label>
                                                                    <h5>{{act.workFlowItemAction}}</h5>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-6 mb-4">
                                                                <div class="form-group">
                                                                    <label class="control-label">Description</label>
                                                                    <h5>{{act.workFlowItemDescription}}</h5>
                                                                </div>
                                                            </div>

                                                        </div><hr>
                                                    
                                                        <router-link :to="'/edit-workflow/'+act.workFlowItemID"><button class="btn btn-success" data-dismiss="modal">Edit</button></router-link>
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