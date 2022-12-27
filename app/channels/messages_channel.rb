class MessagesChannel < ApplicationCable::Channel
 def subscribed
  stream_from "main_room"
 end
end

