class Api::V2::BasketsController < Api::V2::BaseController
  before_action :authenticate_user!
  
  # GET /api/v1/baskets/:id
  def show
    #respond_with BasketItem.joins(:item).where(basket_id: params[:id])
    basket_item = Basket.find(params[:id])
    basket_items = BasketItem.where(basket_id: basket_item.id).to_json(:include => [{:item => {:only => [:name, :price]}}])
    respond_with basket_items
  end

  # POST /api/v1/baskets
  def create 
    respond_with :api, :v2, Basket.create();
  end

  # DELETE /api/v1/baskets/:id
  def destroy
    respond_with Basket.destroy(params[:id]) 
  end


  private

  def basket_params
    params.require(:basket)
  end
end