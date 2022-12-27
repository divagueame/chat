import { Controller } from "@hotwired/stimulus"
import { createConsumer } from '@rails/actioncable'

// Connects to data-controller="websocket-message"
export default class extends Controller {
  connect() {
	  createConsumer().subscriptions.create( 
		  { channel: "MessagesChannel", room: "main_room"}, /* Channel and Room which define this connection */
		  { received(data) { alert('ChikiReceived!')} } /* Callback function triggered once the data has been broadcasted to this client.*/
	  )
  }
}
