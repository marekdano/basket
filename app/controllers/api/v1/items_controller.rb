class Api::V1::ItemsController < Api::V1::BaseController
  
  # GET /api/v1/items
  def index
    respond_with Item.all
  end

  # POST /api/v1/items
  def create 
    respond_with :api, :v1, Item.create(item_params)
  end

  # DELETE /api/v1/items/:id
  def destroy
    respond_with Item.destroy(params[:id])
  end

  # PUT /api/v1/items/:id
  def update
    item = Item.find(params[:id])
    item.update_attributes(item_params)
    respond_with item, json: item
  end

  private

  def item_params
    params.require(:item).permit(:id, :name, :price)
  end
end
