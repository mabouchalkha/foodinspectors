class UsersController < ApplicationController
  before_action :authenticate_user_from_token!, :only => [:index]

  # find a list of users that match certain queries
  def index
    return permission_denied unless \
      (params[:id].to_s == @current_user.id.to_s) || 
      (params[:email].to_s == @current_user.email.to_s)

    @users = User.where(params.permit(:id, :email))

    if @users
      render status: :ok,
        json: @users.as_json
    else
      render status: :not_found,
        json: {
          error: "Users not found"
        }
    end
  end

  def is_user
    authenticate_user!
    render status: :ok,
        json: {
          success: !User.find_by_name(params[:name]).blank?
        }
  end

end
