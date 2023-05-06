import PrimeVue from "primevue/config";
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber';
import RadioButton from 'primevue/radiobutton';
import ProgressBar from 'primevue/progressbar';
import Password from 'primevue/password';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(PrimeVue, {ripple: true});
    nuxtApp.vueApp.component('Button', Button)
    nuxtApp.vueApp.component('InputText', InputText)
    nuxtApp.vueApp.component('InputNumber', InputNumber)
    nuxtApp.vueApp.component('RadioButton', RadioButton)
    nuxtApp.vueApp.component('Password', Password)
    nuxtApp.vueApp.component('ProgressBar', ProgressBar)
    nuxtApp.vueApp.component('DataTable', DataTable)
    nuxtApp.vueApp.component('Column', Column)
})