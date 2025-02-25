import { mount } from 'svelte'
import '@assets/css/style.css'
import '@assets/scss/style.scss'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
