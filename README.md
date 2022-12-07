# API Reference
## Users
#### register a new user
```http
  POST https://orderit.createaclients.co.uk/api/user/register
```

| Parameter       | Type       | Description                                                                       |
| :-------------- | :-------   | :---------------------------------------------------------------------------------|
| `first_name`    | `string`   | **Required**.                                                                     |
| `last_name`     | `string`   | **Required**.                                                                     |
| `email`         | `string`   | **Required**.                                                                     |
| `password`      | `string`   | **Required**.                                                                     |
| `contact_number`| `string`   | **Required**.                                                                     |
| `role_id`       | `integer`  | **Required**.                                                                     |
| `restaurant_id` | `integer`  | **Required**.                                                                     |

#### login a user
```http
  POST https://orderit.createaclients.co.uk/api/user/login
```

| Parameter       | Type       | Description                                                                       |
| :-------------- | :-------   | :---------------------------------------------------------------------------------|
| `email`         | `string`   | **Required**.                                                                     |
| `password`      | `string`   | **Required**.                                                                     |

#### get a user
```http
  GET https://orderit.createaclients.co.uk/api/user/{user}
```


## Restaurants
#### get all restaurants
```http
  GET https://orderit.createaclients.co.uk/api/restaurant
```

#### get a restaurant
```http
  GET https://orderit.createaclients.co.uk/api/restaurant/{restaurant}
```
#### create a restaurant
```http
  POST https://orderit.createaclients.co.uk/api/restaurant
```

| Parameter       | Type       | Description                                                                       |
| :-------------- | :-------   | :---------------------------------------------------------------------------------|
| `restaurant_category_id`| `integer`  | **Required**.                                                                     |
| `application_status`| `string`  | **Required**.                                                                     |
| `name`| `string`  | **Required**.                                                                     |
| `address_line_1`| `string`  | **Required**.                                                                     |
| `address_line_2`| `string`  | **Required**.                                                                     |
| `town`| `string`  | **Required**.                                                                     |
| `county`| `string`  | **Required**.                                                                     |
| `postcode`| `string`  | **Required**.                                                                     |
| `banner`| `file`  | **Required**.                                                                     |
| `logo`| `file`  | **Required**.                                                                     |
| `latitude`| `decimal`  | **Required**.                                                                     |
| `longitude`| `decimal`  | **Required**.                                                                     |
| `contact_number`| `string`  | **Required**.                                                                     |
| `front_facing_number`| `string`  | **Required**.                                                                     |
| `bio`| `text`  | **Required**.                                                                     |
| `minimum_order_value`| `decimal`  | **Required**.                                                                     |
| `delivery_charge`| `decimal`  | **Required**.                                                                     |
| `average_delivery_time`| `string`  | **Required**.                                                                     |
| `stripe_account_id`| `string`  | **Required**.                                                                     |
| `stripe_status`| `string`  | **Required**.                                                                     |
| `company_drivers`| `boolean`  | **Required**.                                                                     |
| `allows_table_orders`| `boolean`  | **Required**.                                                                     |
| `allows_collection`| `boolean`  | **Required**.                                                                     |
| `allows_delivery`| `boolean`  | **Required**.                                                                     |
| `allows_call_center`| `boolean`  | **Required**.                                                                     |


#### update a restaurant
```http
  PUT https://orderit.createaclients.co.uk/api/restaurant/{restaurant}
```

| Parameter       | Type       | Description                                                                       |
| :-------------- | :-------   | :---------------------------------------------------------------------------------|
| `restaurant_category_id`| `integer`  | **Required**.                                                                     |
| `application_status`| `string`  |                                                                   |
| `name`| `string`  |                                                                      |
| `address_line_1`| `string`  |                                                                      |
| `address_line_2`| `string`  |                                                                      |
| `town`| `string`  |                                                                      |
| `county`| `string`  |                                                                      |
| `postcode`| `string`  |                                                                      |
| `banner`| `file`  |                                                                      |
| `logo`| `file`  |                                                                      |
| `latitude`| `decimal`  |                                                                      |
| `longitude`| `decimal`  |                                                                      |
| `contact_number`| `string`  |                                                                      |
| `front_facing_number`| `string`  |                                                                      |
| `bio`| `text`  |                                                                      |
| `minimum_order_value`| `decimal`  |                                                                      |
| `delivery_charge`| `decimal`  |                                                                      |
| `average_delivery_time`| `string`  |                                                                      |
| `stripe_account_id`| `string`  |                                                                      |
| `stripe_status`| `string`  |                                                                      |
| `company_drivers`| `boolean`  |                                                                      |
| `allows_table_orders`| `boolean`  |                                                                      |
| `allows_collection`| `boolean`  |                                                                      |
| `allows_delivery`| `boolean`  |                                                                      |
| `allows_call_center`| `boolean`  |                                                                      |


#### delete a restaurant
```http
  DELETE https://orderit.createaclients.co.uk/api/restaurant/{restaurant}
```

#### get all orders
```http
  GET https://orderit.createaclients.co.uk/api/order
```

#### get a order
```http
  GET https://orderit.createaclients.co.uk/api/order/{order}
```

#### create a order
```http
  POST https://orderit.createaclients.co.uk/api/orders
```

| Parameter       | Type       | Description                                                                       |
| :-------------- | :-------   | :---------------------------------------------------------------------------------|
| `order_reference`| `string`  | **Required**.                                                                     |
| `restaurant_id`| `integer`  | **Required**.                                                                     |
| `customer_id`| `integer`  |                                                                   |
| `driver_id`| `integer`  |                                                                      |
| `call_center_id`| `integer`  |                                                                      |
| `driver_paid`| `string`  |                                                                      |
| `pickup_date`| `datetime`  |                                                                      |
| `time_slot`| `time`  |                                                                      |
| `order_method`| `string`  |                                                                      |
| `price`| `decimal`  |                                                                      |
| `delivery_price`| `decimal`  |                                                                      |
| `payment_status`| `string`  |                                                                      |
| `payment_method`| `string`  |                                                                      |
| `pickup_method`| `string`  |                                                                      |
| `status`| `string`  |                                                                      |
| `address`| `string`  |                                                                      |
| `address_line_1`| `string`  |                                                                      |
| `address_line_2`| `string`  |                                                                      |
| `town`| `string`  |                                                                      |
| `county`| `string`  |                                                                      |
| `postcode`| `string`  |                                                                      |
| `latitude`| `decimal`  |                                                                      |
| `longitude`| `decimal`  |                                                                      |
| `table_number`| `string`  |                                                                      |
| `payment_intent_id`| `string`  |                                                                      |
| `customer_name`| `string`  |                                                                      |
| `customer_contact_number`| `string`  |                                                                      |


#### update a order
```http
  PUT https://orderit.createaclients.co.uk/api/orders/{order}
```

| Parameter       | Type       | Description                                                                       |
| :-------------- | :-------   | :---------------------------------------------------------------------------------|
| `order_reference`| `string`  | **Required**.                                                                     |
| `restaurant_id`| `integer`  | **Required**.                                                                     |
| `customer_id`| `integer`  |                                                                   |
| `driver_id`| `integer`  |                                                                      |
| `call_center_id`| `integer`  |                                                                      |
| `driver_paid`| `string`  |                                                                      |
| `pickup_date`| `datetime`  |                                                                      |
| `time_slot`| `time`  |                                                                      |
| `order_method`| `string`  |                                                                      |
| `price`| `decimal`  |                                                                      |
| `delivery_price`| `decimal`  |                                                                      |
| `payment_status`| `string`  |                                                                      |
| `payment_method`| `string`  |                                                                      |
| `pickup_method`| `string`  |                                                                      |
| `status`| `string`  |                                                                      |
| `address`| `string`  |                                                                      |
| `address_line_1`| `string`  |                                                                      |
| `address_line_2`| `string`  |                                                                      |
| `town`| `string`  |                                                                      |
| `county`| `string`  |                                                                      |
| `postcode`| `string`  |                                                                      |
| `latitude`| `decimal`  |                                                                      |
| `longitude`| `decimal`  |                                                                      |
| `table_number`| `string`  |                                                                      |
| `payment_intent_id`| `string`  |                                                                      |
| `customer_name`| `string`  |                                                                      |
| `customer_contact_number`| `string`  |                                                                      |

#### delete a order
```http
  DELETE https://orderit.createaclients.co.uk/api/orders/{order}
```

### OrderItem
#### get all order items
```http
  GET https://orderit.createaclients.co.uk/api/order-items
```

#### get a order item
```http
  GET https://orderit.createaclients.co.uk/api/order-items/{orderItem}
```

#### create a order item
```http
  POST https://orderit.createaclients.co.uk/api/order-item
```

| Parameter       | Type       | Description                                                                       |
| :-------------- | :-------   | :---------------------------------------------------------------------------------|
| `order_id`| `integer`  | **Required**.                                                                     |
| `product_id`| `integer`  | **Required**.                                                                     |
| `product_name`| `string`  |                                                                   |
| `product_description`| `string`  |                                                                      |
| `price`| `decimal`  |                                                                      |
| `quantity`| `decimal`  |                                                                      |
| `total`| `decimal`  |                                                                      |

#### update a order item
```http
  PUT https://orderit.createaclients.co.uk/api/order-item/{orderItem}
```

| Parameter       | Type       | Description                                                                       |
| :-------------- | :-------   | :---------------------------------------------------------------------------------|
| `order_id`| `integer`  | **Required**.                                                                     |
| `product_id`| `integer`  | **Required**.                                                                     |
| `product_name`| `string`  |                                                                   |
| `product_description`| `string`  |                                                                      |
| `price`| `decimal`  |                                                                      |
| `quantity`| `decimal`  |                                                                      |
| `total`| `decimal`  |                                                                      |

#### delete a order item
```http
  DELETE https://orderit.createaclients.co.uk/api/order-item/{orderItem}
```

### Menu Items

#### get all menu items
```http
  GET https://orderit.createaclients.co.uk/api/menu-items
```

#### get a menu item
```http
  GET https://orderit.createaclients.co.uk/api/menu-items/{menuItem}
```

#### create a menu item
```http
  POST https://orderit.createaclients.co.uk/api/menu-items
```

| Parameter       | Type       | Description                                                                       |
| :-------------- | :-------   | :---------------------------------------------------------------------------------|
| `menu_category_id`| `integer`  | **Required**.                                                                     |
| `restaurant_id`| `integer`  | **Required**.                                                                     |
| `title`| `string`  | **Required**.                                                                     |
| `description`| `string`  |                                                                      |
| `dietary_requirements`| `string`  |                                                                      |
| `price`| `decimal`  |                                                                      |


#### update a menu item
```http
  PUT https://orderit.createaclients.co.uk/api/menu-items/{menuItem}
```

| Parameter       | Type       | Description                                                                       |
| :-------------- | :-------   | :---------------------------------------------------------------------------------|
| `menu_category_id`| `integer`  | **Required**.                                                                     |
| `restaurant_id`| `integer`  | **Required**.                                                                     |
| `title`| `string`  | **Required**.                                                                     |
| `description`| `string`  |                                                                      |
| `dietary_requirements`| `string`  |                                                                      |
| `price`| `decimal`  |                                                                      |

#### delete a menu item
```http
  DELETE https://orderit.createaclients.co.uk/api/menu-items/{menuItem}
```

### Menu Category

#### get all menu categories
```http
  GET https://orderit.createaclients.co.uk/api/menu-category
```

#### get a menu category
```http
  GET https://orderit.createaclients.co.uk/api/menu-category/{menuCategory}
```

#### create a menu category
```http
  POST https://orderit.createaclients.co.uk/api/menu-category
```

| Parameter       | Type       | Description                                                                       |
| :-------------- | :-------   | :---------------------------------------------------------------------------------|
| `restaurant_id`| `integer`  | **Required**.                                                                     |
| `title`| `string`  | **Required**.                                                                     |
| `notes`| `string`  |                                                                      |


#### update a menu category
```http
  PUT https://orderit.createaclients.co.uk/api/menu-category/{menuCategory}
```

| Parameter       | Type       | Description                                                                       |
| :-------------- | :-------   | :---------------------------------------------------------------------------------|
| `restaurant_id`| `integer`  | **Required**.                                                                     |
| `title`| `string`  | **Required**.                                                                     |
| `notes`| `string`  |                                                                      |

#### delete a menu category
```http
  DELETE https://orderit.createaclients.co.uk/api/menu-category/{menuCategory}
```


