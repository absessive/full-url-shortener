module Api
  module V1
    class Users < Grape::API
      include Api::V1::Defaults
      
      resource :users do
        desc 'Register New User'
        params do
          requires :email, type: String, desc: 'Email of the user'
          requires :name, type: String, desc: 'Name of the user'
          requires :password, type: String, desc: 'Password of the user'
        end
        post 'register' do
          user = UserCreator.new(params[:email], params[:name], params[:password]).create
          {
            id: user.id,
            name: user.name,
            email: user.email
          }
        end

        desc 'Authenticate User'
        params do
          requires :email, type: String, desc: 'Email of the user'
          requires :password, type: String, desc: 'Password of the user'
        end
        post 'authenticate' do
          command = AuthenticateUser.call(params[:email], params[:password])
 
          if command.success?
            { auth_token: command.result }
          else
            raise ApplicationController::NotAuthorized.new('Invalid Credentials')
          end
        end
      end
    end
  end
end