import { Controller } from "@hotwired/stimulus"
import { createConsumer } from '@rails/actioncable'

// Connects to data-controller="websocket-message"
export default class extends Controller {
  connect() {
	  createConsumer().subscriptions.create( { channel: "MessagesChannel", room: "main_room"})
  }
}
