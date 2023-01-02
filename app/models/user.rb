class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable 
  has_many :messages, :dependent => :destroy
  has_one_attached :avatar, :dependent => :destroy
  
  def avatar_thumbnail
    avatar.variant(resize: "150x150!").processed
  end
end
