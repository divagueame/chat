import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const flashElement = this.element
    setTimeout(() => {
      flashElement.classList.add('translate-y-full')
      flashElement.classList.add('opacity-0')
    }, 3000)
    setTimeout(() => {
      flashElement.remove()
    }, 5000)
  }
}
