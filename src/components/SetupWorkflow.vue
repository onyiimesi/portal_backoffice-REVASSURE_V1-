<script setup>

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
                              <h4 class="mb-0">Setup Workflow</h4>

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
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label">Workflow Name</label>
                                            <input class="form-control" type="text" placeholder="Organization" id="example-text-input">
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label">Business Process</label>
                                            <input class="form-control" type="text" placeholder="Business Process" id="example-text-input">
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label">Sub-Organization</label>
                                            <select class="form-control select2">
                                                <option>Select</option>
                                                <option value="">Individual</option>
                                                <option value="">Cooperate</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label">Sub-Unit</label>
                                            <select class="form-control select2">
                                                <option>Select</option>
                                                <option value="">Individual</option>
                                                <option value="">Cooperate</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label">1st Approver</label>
                                            <input class="form-control" type="text" placeholder="" id="example-text-input">
                                        </div>
                                    </div>
                                
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label">2nd Approver</label>
                                            <input class="form-control" type="text" placeholder="" id="example-text-input">
                                        </div>
                                    </div>
                                
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label">3rd Approver</label>
                                            <input class="form-control" type="text" placeholder="" id="example-text-input">
                                        </div>
                                    </div>

                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <button class="btn btn-success mr-4">Save</button>

                                            <button class="btn btn-primary">Cancel</button>
                                        </div>
                                    </div>
                                </div>

                                

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