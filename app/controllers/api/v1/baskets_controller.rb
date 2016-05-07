class Api::V1::BasketsController < Api::V1::BaseController
  def index
    respond_with Basket.all
  end
end