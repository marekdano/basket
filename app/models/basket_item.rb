class BasketItem < ActiveRecord::Base
  belongs_to :basket
  belongs_to :item
end
