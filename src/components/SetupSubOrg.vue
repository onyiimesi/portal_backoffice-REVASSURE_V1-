<script>
    import axios from 'axios'

    export default{
        name: 'suborganizationsetup',

        data(){
            return{
                errors: [],
                message: [],
                allsub: [],

                
                subOrganisationCode: '',
                subOrganisationName: '',
                organisationCode: '',

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
            }
        },  

        async mounted(){

            const resul = await axios.get('api/Users/profile', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);
            this.customerDetails = resul.data.result;


            const result = await axios.get('api/Item/organizations/'+this.customerDetails.organizationCode, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },);

            this.allitems = result.data.result;
        },

        methods: {
            
            // async onChange(event) {

            //     const response = await axios.get('api/SubOrganisation/suborganizations/'+event.target.value,{
            //         headers: {
            //             Authorization: 'Bearer ' + localStorage.getItem('token')
            //         }
            //     },);

            //     this.allsub = response.data.result;
            // },

            async handleSubOrg(){
                this.errors = [];
                this.message = [];

                
                
                if (!this.subOrganisationCode) {
                    this.errors.push("Sub-Organisation Code required.");
                }

                if (!this.subOrganisationName) {
                    this.errors.push("Sub-Organisation Name required.");
                }

                if (!this.organisationCode) {
                    this.errors.push("Organisation Code required.");
                }
                
                
                
                const response = await axios.post('api/SubOrganisation/addsuborganization', {
                    subOrganisationCode: this.subOrganisationCode,
                    subOrganisationName: this.subOrganisationName,
                    organisationCode: this.organisationCode
                    
                }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },);
                

                if (response) {
                    console.log(response);
                    this.message.push(response.data.message);

                    this.subOrganisationCode = "";
                    this.subOrganisationName = "";
                    this.organisationCode = "";
                }else{
                    this.errors.push("Incorrect Parameter");
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
                              <h4 class="mb-0">Sub-Organization Setup</h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">Sub-Organization Setup</li>
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

                                <!-- <h4 class="card-title">Sub-Organization Setup</h4> -->

                                <div class="alert alert-danger" v-if="errors.length">
                                    <b>Please correct the following error(s):</b>
                                    <ul>
                                        <li v-for="error in errors">{{ error }}</li>
                                    </ul>
                                </div>

                                <div class="alert alert-success" v-if="message.length">
                                    <strong v-for="msg in message">{{ msg }}</strong>
                                </div>
                                <form @submit.prevent="handleSubOrg">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Organization Code</label>
                                                <!-- <input class="form-control" type="text" v-model="organisationCode"> -->

                                                <select v-model="organisationCode" class="form-control">
                                                    <!-- <option>Choose</option> -->
                                                    <option :value="customerDetails.organizationCode">{{customerDetails.organizationCode}}</option>
                                                    
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Sub-Organization Code</label>
                                                <input class="form-control" type="text" v-model="subOrganisationCode">

                                                <!-- <select v-model="subOrganisationCode" class="form-control" id="">
                                                    <option>Choose</option>
                                                    <option v-for="sub in allsub" :value="sub.subOrganisationCode">{{sub.subOrganisationCode}}</option>
                                                    
                                                </select> -->
                                            </div>
                                        </div>
                                    
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Sub-Organization Name</label>
                                                <input class="form-control" type="text" v-model="subOrganisationName">
                                            </div>
                                        </div>

                                    </div>
                                    <button class="btn btn-success mr-4 float-left">Save</button>

                                </form>
                                <!-- <button class="btn btn-primary float-left">Cancel</button> -->
                                

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