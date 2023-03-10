class MessagesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_message, only: %i[ show edit update destroy ]

  def index
   @messages = Message.all
  end

  def show
  end

  def new
    @message = Message.new
  end

  def edit
  end

  def create
    @message = Message.new(message_params)
    @message.user_id = current_user.id

    respond_to do |format|
      if @message.save
        send_message_to_all(@message) 
        format.html { redirect_to message_url(@message), notice: "Message was successfully created." }
        format.turbo_stream
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @message.update(message_params)
        format.html { redirect_to message_url(@message), notice: "Message was successfully updated." }
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @message.destroy

    respond_to do |format|
      format.html { redirect_to messages_url, notice: "Message was successfully destroyed." }
    end
  end

  private
    def send_message_to_all(message) 
      ## Main room is the room we would like to broadcast to and we can pass an object with the information we want to be sent.
      ActionCable.server.broadcast("main_room", { html: html(message), user: current_user.id })
    end

    def html(message)
      render_to_string(
        partial: 'messages/message',
        locals: { message: message }
      )
    end

    def set_message
      @message = Message.find(params[:id])
    end

    def message_params
      params.require(:message).permit(:title)
    end
end
