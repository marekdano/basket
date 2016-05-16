class Api::V2::BasketItemsController < Api::V2::BaseController
  before_action :authenticate_user!
   
  # GET /api/v1/basket_items
  def index
    respond_with BasketItem.all
  end
  
  # POST /api/v1/basket_items
  def create
    respond_with :api, :v2, BasketItem.create(basket_item_params)
  end

  # PUT /api/v1/basket_items/:id
  def update
    basket_item = BasketItem.find(params[:id])
    basket_item.update_attributes(basket_item_params)
    respond_with basket_item, json: basket_item
  end

  # DELETE /api/v1/basket_items/:id
  def destroy
    respond_with BasketItem.destroy(params[:id])
  end


  private

  def basket_item_params
    params.require(:basket_item).permit(:id, :basket_id, :item_id, :quantity)
  end

end
