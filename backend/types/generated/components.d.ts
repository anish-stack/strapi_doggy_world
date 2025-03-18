import type { Schema, Struct } from '@strapi/strapi';

export interface AddressAddress extends Struct.ComponentSchema {
  collectionName: 'components_address_addresses';
  info: {
    displayName: 'address';
    icon: 'cloud';
  };
  attributes: {
    city: Schema.Attribute.String & Schema.Attribute.Required;
    country: Schema.Attribute.String & Schema.Attribute.DefaultTo<'USA'>;
    latitude: Schema.Attribute.Decimal;
    longitude: Schema.Attribute.Decimal;
    state: Schema.Attribute.String;
    street: Schema.Attribute.String & Schema.Attribute.Required;
    zipCode: Schema.Attribute.String;
  };
}

export interface BillingDetailsBillingDetails extends Struct.ComponentSchema {
  collectionName: 'components_billing_details_billing_details';
  info: {
    description: '';
    displayName: 'Billing_Details';
    icon: 'chartPie';
  };
  attributes: {
    city: Schema.Attribute.String;
    fullName: Schema.Attribute.String;
    HouseNo: Schema.Attribute.String;
    landmark: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    street: Schema.Attribute.String;
    zipCode: Schema.Attribute.String;
  };
}

export interface CartItemCartItems extends Struct.ComponentSchema {
  collectionName: 'components_cart_item_cart_items';
  info: {
    description: '';
    displayName: 'CartItems';
    icon: 'shoppingCart';
  };
  attributes: {
    anyOfferapplies: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    DeliveryFee: Schema.Attribute.Decimal;
    DeliveryFeeApplied: Schema.Attribute.Boolean;
    discountPrice: Schema.Attribute.String;
    Price: Schema.Attribute.Decimal;
    ProductName: Schema.Attribute.String;
  };
}

export interface CartItemItems extends Struct.ComponentSchema {
  collectionName: 'components_cart_item_items';
  info: {
    displayName: 'items';
  };
  attributes: {};
}

export interface CartLabItemsItems extends Struct.ComponentSchema {
  collectionName: 'components_cart_lab_items_items';
  info: {
    displayName: 'Items';
    icon: 'archive';
  };
  attributes: {
    discountPrice: Schema.Attribute.Decimal;
    images: Schema.Attribute.JSON;
    isPackage: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isTest: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    price: Schema.Attribute.Decimal & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    typeId: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ListList extends Struct.ComponentSchema {
  collectionName: 'components_list_lists';
  info: {
    description: '';
    displayName: 'list';
  };
  attributes: {
    vaccine_name: Schema.Attribute.String;
  };
}

export interface ShopCartShopBakeryCartItems extends Struct.ComponentSchema {
  collectionName: 'components_shop_cart_shop_bakery_cart_items';
  info: {
    description: '';
    displayName: 'Shop_bakery_cart_items';
    icon: 'archive';
  };
  attributes: {
    Bakery_ProductIds: Schema.Attribute.Relation<
      'oneToMany',
      'api::product.product'
    >;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    isBakeryProduct: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    isPetShopProduct: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    isVarientTrue: Schema.Attribute.Boolean;
    pet_shop_product_ids: Schema.Attribute.Relation<
      'oneToMany',
      'api::pet-shop-product.pet-shop-product'
    >;
    quantity: Schema.Attribute.Integer;
    title: Schema.Attribute.String;
    varientSize: Schema.Attribute.String;
  };
}

export interface SlotsSlots extends Struct.ComponentSchema {
  collectionName: 'components_slots_slots';
  info: {
    description: '';
    displayName: 'Slots';
  };
  attributes: {
    isTwentyFourSeven: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    maximum_bookings: Schema.Attribute.BigInteger;
    slot_end: Schema.Attribute.Time;
    Slot_start: Schema.Attribute.Time;
    Slot_title: Schema.Attribute.String;
  };
}

export interface TestBooksTest extends Struct.ComponentSchema {
  collectionName: 'components_test_books_tests';
  info: {
    description: '';
    displayName: 'Test';
    icon: 'check';
  };
  attributes: {
    Discount_Price: Schema.Attribute.BigInteger;
    Is_Ultarasound: Schema.Attribute.Boolean;
    Test_id: Schema.Attribute.String;
    Test_Name: Schema.Attribute.String;
    Test_Price: Schema.Attribute.String;
    Type_Of_Test: Schema.Attribute.String;
  };
}

export interface VariantsProductVariant extends Struct.ComponentSchema {
  collectionName: 'components_variants_product_variants';
  info: {
    displayName: 'ProductVariant';
    icon: 'twitter';
  };
  attributes: {
    active: Schema.Attribute.Boolean;
    dis_price: Schema.Attribute.Decimal;
    off_percentage: Schema.Attribute.String;
    price: Schema.Attribute.Integer;
    stock: Schema.Attribute.Integer;
    tag: Schema.Attribute.String;
    type: Schema.Attribute.String;
  };
}

export interface VariantsVariants extends Struct.ComponentSchema {
  collectionName: 'components_variants_variants';
  info: {
    description: '';
    displayName: 'Variants';
  };
  attributes: {
    disc_price: Schema.Attribute.Decimal;
    flavour: Schema.Attribute.String;
    in_stock: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    off_perce: Schema.Attribute.String;
    price: Schema.Attribute.Decimal;
    size: Schema.Attribute.String;
    stock: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
        },
        number
      >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'address.address': AddressAddress;
      'billing-details.billing-details': BillingDetailsBillingDetails;
      'cart-item.cart-items': CartItemCartItems;
      'cart-item.items': CartItemItems;
      'cart-lab-items.items': CartLabItemsItems;
      'list.list': ListList;
      'shop-cart.shop-bakery-cart-items': ShopCartShopBakeryCartItems;
      'slots.slots': SlotsSlots;
      'test-books.test': TestBooksTest;
      'variants.product-variant': VariantsProductVariant;
      'variants.variants': VariantsVariants;
    }
  }
}
