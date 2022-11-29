<script>
    import axios from "axios"
    import VueApexCharts from 'vue3-apexcharts'
    
    export default{
      name: 'Nav',
      name: 'dashboard',
      name: 'autologout',
  
        data: function(){
            return{

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

                series: [{
                    name: 'Inflation',
                    data: [10, 70, 35, 51, 49, 62, 69, 91, 40]
                }],
                chartOptions: {
                    chart: {
                    height: 350,
                    type: 'bar',
                    },
                    plotOptions: {
                    bar: {
                        borderRadius: 10,
                        dataLabels: {
                        position: 'top', // top, center, bottom
                        },
                    }
                    },
                    dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return val + "%";
                    },
                    offsetY: -20,
                    style: {
                        fontSize: '12px',
                        colors: ["#304758"]
                    }
                    },
                    
                    xaxis: {
                    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    position: 'top',
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    crosshairs: {
                        fill: {
                        type: 'gradient',
                        gradient: {
                            colorFrom: '#D8E3F0',
                            colorTo: '#BED1E6',
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5,
                        }
                        }
                    },
                    tooltip: {
                        enabled: true,
                    }
                    },
                    yaxis: {
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: false,
                        formatter: function (val) {
                        return val + "%";
                        }
                    }
                    
                    },
                    title: {
                    text: 'Monthly Inflation in Argentina, 2002',
                    floating: true,
                    offsetY: 330,
                    align: 'center',
                    style: {
                        color: '#444'
                    }
                    }
                },

                seriess: [{
                name: "Desktops",
                data: [10, 70, 35, 51, 49, 62, 69, 91, 40]
                }],
                chartOptionss: {
                    chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                    },
                    dataLabels: {
                    enabled: false
                    },
                    stroke: {
                    curve: 'straight'
                    },
                    title: {
                    text: '',
                    align: 'left'
                    },
                    grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                    },
                    xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                    }
                },

                roles: 'billing-oficer',
                roless: 'revenue-officer',
            }
        },
  
        async mounted(){
            this.role = localStorage.getItem('role');

            if(this.roles != this.role && this.roless != this.role){
                localStorage.removeItem('token');
                this.$router.push('/');
            }

            const result = await axios.get('api/Users/profile',{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.customerDetails = result.data.result;
  
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
                              <h4 class="mb-0">Performance Report <br> <span>{{customerDetails.organizationCode}} //  {{customerDetails.subOrganisationCode}} //</span> <span>{{customerDetails.lastName}} {{customerDetails.firstName}} // {{this.role}}</span></h4>

                              <div class="page-title-right">
                                  <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                      <li class="breadcrumb-item active">Performance Report</li>
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
                                <h4 class="card-title mb-4">Expected Revenue</h4>

                                <div id="chart">
                                    <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
                                </div>
                     
                            </div>
                        </div><!--end card-->
                    </div>

                    <div class="col-lg-6">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title mb-4">Actual Revenue</h4>
                                
                                <div id="chart">
                                    <apexchart type="line" :options="chartOptionss" :series="seriess"></apexchart>
                                </div>
                            </div>
                        </div><!--end card-->
                    </div>
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