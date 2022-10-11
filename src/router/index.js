import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DashboardView.vue')
    },

    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProfileView.vue')
    },

    {
      path: '/reset-password',
      name: 'resetpassword',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ResetPasswordView.vue')
    },
    {
      path: '/verify-token',
      name: 'verifytoken',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/VerifyTokenView.vue')
    },
    {
      path: '/password-reset',
      name: 'passwordreset',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PasswordResetView.vue')
    },

    {
      path: '/create-organization',
      name: 'createorganization',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SetupOrgView.vue')
    },
    {
      path: '/list-organization',
      name: 'listorganization',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ListOrgView.vue')
    },
    {
      path: '/edit-org/:organisationCode',
      name: 'editorg',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditOrgView.vue')
    },
    {
      path: '/create-sub-organization',
      name: 'suborganizationsetup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SetupSubOrgView.vue')
    },
    {
      path: '/list-sub-organization',
      name: 'listsuborganization',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ListSubOrgView.vue')
    },
    {
      path: '/edit-suborg/:subOrganisationCode',
      name: 'editsuborg',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditSubOrgView.vue')
    },
    {
      path: '/create-user',
      name: 'setupusers',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SetupUsersView.vue')
    },
    {
      path: '/view-users',
      name: 'viewusers',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ViewUsersView.vue')
    },
    {
      path: '/edit-user/:id',
      name: 'edituser',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditUserView.vue')
    },
    {
      path: '/create-bank',
      name: 'setupbanks',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SetupBanksView.vue')
    },
    {
      path: '/view-banks',
      name: 'viewbanks',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BanksView.vue')
    },
    {
      path: '/edit-bank/:bankCode',
      name: 'editbank',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditBankView.vue')
    },
    {
      path: '/setup-tax',
      name: 'setuptax',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SetupTaxView.vue')
    },
    {
      path: '/setup-transaction-details',
      name: 'setuptransactiondetails',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SetupTransactionView.vue')
    },
    {
      path: '/setup-workflow',
      name: 'setupworkflow',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SetupWorkflowView.vue')
    },
    {
      path: '/approve-workflow',
      name: 'approveworkflow',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ApproveWorkflowView.vue')
    },
    {
      path: '/workflow-entry',
      name: 'workflowentry',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EntryWorkflowView.vue')
    },
    {
      path: '/edit-workflow/:workFlowItemID',
      name: 'editworkflow',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditWorkflowView.vue')
    },

    {
      path: '/approve-entry/:workFlowEntryID',
      name: 'approveentry',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ApproveEntryView.vue')
    },
    {
      path: '/reject-entry/:workFlowEntryID',
      name: 'rejectentry',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RejectEntryView.vue')
    },

    {
      path: '/create-items',
      name: 'setupitems',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SetupItemsView.vue')
    },
    {
      path: '/search-items',
      name: 'searchitems',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SearchItemsView.vue')
    },
    {
      path: '/edit-item/:itemOrgCode',
      name: 'edititem',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditItemView.vue')
    },
    {
      path: '/create-customer',
      name: 'createcustomer',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreateCustomerIndView.vue')
    },
    {
      path: '/view-customers',
      name: 'viewcustomers',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ViewCustomerView.vue')
    },
    {
      path: '/customer-search',
      name: 'customersearch',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CustomerSearchView.vue')
    },
    {
      path: '/customer-details/:customerCode',
      name: 'customerdetails',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CustomerDetailsView.vue')
    },
    {
      path: '/update-details/:id',
      name: 'updatedetails',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UpdateDetailsView.vue')
    },
    {
      path: '/review-bill',
      name: 'reviewbill',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ReviewBillView.vue')
    },
    {
      path: '/generate-bill',
      name: 'generatebill',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GenerateBillView.vue')
    },
    {
      path: '/create-bill',
      name: 'createinvoice',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreateInvoiceView.vue')
    },
    {
      path: '/create-user-bill/:id',
      name: 'createuserinvoice',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreateUserInvoiceView.vue')
    },
    {
      path: '/view-bills',
      name: 'viewinvoices',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ViewInvoiceView.vue')
    },
    {
      path: '/bills/:invoiceCode',
      name: 'invoices',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/InvoiceView.vue')
    },
    {
      path: '/payments',
      name: 'payments',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PaymentView.vue')
    },
    {
      path: '/bank-accounts',
      name: 'bankaccounts',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BankAccountsView.vue')
    },
    {
      path: '/edit-bank-account/:bctId',
      name: 'editbankaccount',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditBankAccountView.vue')
    },
    {
      path: '/create-bank-account',
      name: 'setupbankaccounts',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SetupBankAccountsView.vue')
    },
    {
      path: '/manage-bank-accounts',
      name: 'managebankaccounts',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ManageBankAccountsView.vue')
    },
    {
      path: '/manage-tax-types',
      name: 'managetaxtypes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ManageTaxTypesView.vue')
    },
    {
      path: '/list-tax-types',
      name: 'listtaxtypes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ListTaxTypesView.vue')
    },
    {
      path: '/edit-tax/:id',
      name: 'edittax',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditTaxView.vue')
    },
    {
      path: '/create-state',
      name: 'setupstate',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SetupStateView.vue')
    },
    {
      path: '/list-state',
      name: 'liststate',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ListStateView.vue')
    },
    {
      path: '/edit-state/:stateCode',
      name: 'editstate',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditStateView.vue')
    },
    {
      path: '/create-lga',
      name: 'setuplga',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SetupLGAView.vue')
    },
    {
      path: '/list-lga',
      name: 'listlga',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ListLgaView.vue')
    },
    {
      path: '/edit-lga/:lgaCode',
      name: 'editlga',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditLgaView.vue')
    },

    {
      path: '/change-password',
      name: 'changepassword',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ChangePasswordView.vue')
    },
    {
      path: '/search-transactions',
      name: 'searchtransactions',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SearchTransactionsView.vue')
    },
    {
      path: '/reports',
      name: 'reports',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ReportsView.vue')
    },
    {
      path: '/invoice-report',
      name: 'invoicereport',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/InvoiceReportView.vue')
    },
  ]
})

export default router
