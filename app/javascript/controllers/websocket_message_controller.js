import { Controller } from "@hotwired/stimulus"
import { createConsumer } from '@rails/actioncable'

// Connects to data-controller="websocket-message"
export default class extends Controller {
  connect() {
	  const messagesDiv = this.element
	  /* Channel and Room which define this connection. This will be available as params in our messages_channel.rb */
	  /* received(data) is a callback function available to us. It is triggered once the data has been broadcasted to this client.*/
	  createConsumer().subscriptions.create( 
		  { channel: "MessagesChannel", room: "main_room"},
		  { received(data) {
		    messagesDiv.insertAdjacentHTML( 'beforeend', data.html );
		  }
		}
	  )
  }
}
