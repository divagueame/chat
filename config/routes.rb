Rails.application.routes.draw do
  resources :messages

  devise_for :users, controllers: {
    sessions: 'users/registrations'
  }

  root "messages#index"
end
