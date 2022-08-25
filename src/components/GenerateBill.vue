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
                              <h4 class="mb-0">Generate Bill</h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                      <li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li>
                                      <li class="breadcrumb-item active">Generate Bill</li>
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
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label">Surname</label>
                                            <input class="form-control" type="text" placeholder="" id="example-text-input">
                                        </div>
                                    </div>
                                
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label">First Name</label>
                                            <input class="form-control" type="text" placeholder="" id="example-text-input">
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label">Phone Number</label>
                                            <input class="form-control" type="text" placeholder="" id="example-text-input">
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label">Address</label>
                                            <input class="form-control" type="text" placeholder="" id="example-text-input">
                                        </div>
                                    </div>

                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label">State/Location</label>
                                            <input class="form-control" type="text" placeholder="" id="example-text-input">
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label">Customer ID</label>
                                            <input class="form-control" type="text" placeholder="" id="example-text-input">
                                        </div>
                                    </div>

                                </div><hr>

                                <div class="row">
                                    
                                    <div class="table-responsive">
                                        <table class="table table-hover table-bordered">
                                            <tr>
                                                <th>ITEM</th>
                                                <th>TARIFF</th>
                                                <th>QTY</th>
                                                <th>TAX</th>
                                                <th>AMOUNT</th>
                                            </tr>

                                            <tr>
                                                <td>xxxx</td>
                                                <td>xxxx</td>
                                                <td>xxxx</td>
                                                <td>xxxx</td>
                                                <td>xxxx</td>
                                            </tr>
                                        </table>
                                    </div>

                                </div>


                                <div class="row mt-4">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <button class="btn btn-success mr-4">Create Bill</button>

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