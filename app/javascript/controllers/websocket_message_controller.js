import { Controller } from "@hotwired/stimulus"
import { createConsumer } from '@rails/actioncable'

// Connects to data-controller="websocket-message"
export default class extends Controller {
	static targets = [ "messages", "textbox" ]
	static values = { 'user': Number }
  connect() {
	  const messagesDiv = this.messagesTarget
	  const textbox = this.textboxTarget
	  messagesDiv.lastElementChild.scrollIntoView()
	  /* Channel and Room which define this connection. This will be available as params in our messages_channel.rb */
	  /* received(data) is a callback function available to us. It is triggered once the data has been broadcasted to this client.*/
	  createConsumer().subscriptions.create( 
		  { channel: "MessagesChannel", room: "main_room"},
		  { received: (data) =>  {
		     const colorClass = (this.userValue === data.user) ? 'bg-orange-200' : 'bg-green-200';
		     const positionClass = (this.userValue === data.user) ? 'justify-end' : 'justify-start';
		     const doc = new DOMParser().parseFromString(data.html, 'text/html');
		     const div = doc.querySelector('div');
		     const span = doc.querySelector('span');
		     div.classList.remove('justify-end');
		     div.classList.remove('justify-start');
		     span.classList.remove('bg-orange-200');
		     span.classList.remove('bg-green-200');
		     span.classList.add(colorClass);
		     div.classList.add(positionClass);
		     messagesDiv.insertAdjacentElement('beforeend', div);

		     messagesDiv.lastElementChild.scrollIntoView()
		     textbox.value = ''
		  }
		}
	  )
  }
}
