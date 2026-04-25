import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { persistencePlugin } from './plugins/persistence'
import '@mdi/font/css/materialdesignicons.css'
import './styles/main.scss'

const pinia = createPinia()
pinia.use(persistencePlugin)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
