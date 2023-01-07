Rails.application.routes.draw do
  resources :messages

  devise_for :users, controllers: {
    sessions: 'users/registrations'
  }

  devise_scope :user do
    get 'users/edit_icon', to: 'users/registrations#edit_icon'
    put 'users/edit_icon', to: 'users/registrations#update_icon'
  end

  root "messages#index"
end
