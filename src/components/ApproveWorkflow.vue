<script>
    import axios from "axios"
    import { useToast } from "vue-toastification";

    export default{
        name: 'approveworkflow',
        
        data(){
            return{
                errors: [],
                message: [],

                workflow: [],
                approval: [],
                roles: [],

                item: '',
                initiatorRole: '',
                verifierRole: '',
                condition: '',

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

            const resultss = await axios.get('api/WorkFlowItem/Items/'+this.customerDetails.organizationCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.workflow = resultss.data.result;

            const results = await axios.get('api/WorkFlowApproval/Approvals/'+this.customerDetails.organizationCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.approval = results.data.result;
            setTimeout(() => {
            $("#datatable").DataTable({
                lengthMenu: [
                [5,10, 25, 50, -1],
                [5,10, 25, 50, "All"],
                ],
                pageLength: 10,
            });
            });

            const role = await axios.get('api/roles/allroles', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.roles = role.data.result;

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
                              <h4 class="mb-0">Approval Workflow, <span style="font-size: 14px;font-weight: 500;">{{customerDetails.lastName}} {{customerDetails.firstName}} - {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">Approval Workflow</li>
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
                                <form @submit.prevent="approveWorkflow">
                                    <div class="form-group">
                                        <input class="form-control" type="hidden" v-model="customerDetails.organizationCode">
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Item</label>
                                                <select v-model="item" class="form-control select2">
                                                    <option v-for="act in workflow" :value="act.workFlowItemID">{{act.workFlowItemDescription}}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Initiator Role</label>
                                                <select v-model="initiatorRole" class="form-control select2">
                                                    <option v-for="act in roles" :value="act.rolCode">{{act.rolName}}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Verifier Role</label>
                                                <select v-model="verifierRole" class="form-control select2">
                                                    <option v-for="act in roles" :value="act.rolCode">{{act.rolName}}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Condition</label>
                                                <textarea v-model="condition" class="form-control" id="" cols="30" rows="10"></textarea>
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
                                            <th>Initiator</th>
                                            <th>Verifier</th>
                                            <th>Condition</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    <tr v-for="act in approval">
                                        <td>{{act.initiatorRole}}</td>
                                        <td>{{act.verifierRole}}</td>
                                        <td>{{act.condition}}</td>
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