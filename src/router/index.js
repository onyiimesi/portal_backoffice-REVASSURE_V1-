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
      path: '/setup-organization',
      name: 'setuporganization',
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
      path: '/edit-org/:id',
      name: 'editorg',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditOrgView.vue')
    },
    {
      path: '/sub-organization-setup',
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
      path: '/edit-suborg/:id',
      name: 'editsuborg',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditSubOrgView.vue')
    },
    {
      path: '/subunit-setup',
      name: 'subunitsetup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SetupSubUnitView.vue')
    },
    {
      path: '/list-units',
      name: 'listunits',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ListUnitView.vue')
    },
    {
      path: '/edit-unit/:unitID',
      name: 'editunit',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditUnitView.vue')
    },
    {
      path: '/setup-users',
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
      path: '/setup-bank',
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
      path: '/setup-items',
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
      path: '/edit-item/:itemCode',
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
      path: '/customer-details/:id',
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
      path: '/create-invoice',
      name: 'createinvoice',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreateInvoiceView.vue')
    },
    {
      path: '/create-user-invoice/:id',
      name: 'createuserinvoice',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreateUserInvoiceView.vue')
    },
    {
      path: '/view-invoices',
      name: 'viewinvoices',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ViewInvoiceView.vue')
    },
    {
      path: '/invoices/:invoiceCode',
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
      path: '/items',
      name: 'items',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ItemsView.vue')
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
      path: '/setup-bank-accounts',
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
      path: '/setup-state',
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
      path: '/edit-state/:id',
      name: 'editstate',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditStateView.vue')
    },
    {
      path: '/setup-lga',
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
      path: '/edit-lga/:id',
      name: 'editlga',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditLgaView.vue')
    },
  ]
})

export default router
