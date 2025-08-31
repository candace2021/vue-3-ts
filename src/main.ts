import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { HomeFilled, Money, InfoFilled, ArrowDown, Timer } from '@element-plus/icons-vue'

const app = createApp(App)

const icons = {
  HomeFilled,
  Money,
  InfoFilled,
  ArrowDown,
  Timer,
}
Object.entries(icons).forEach(([k, v]) => app.component(k, v))

app.use(createPinia())
app.use(router)

app.mount('#app')
