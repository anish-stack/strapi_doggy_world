import type { Schema, Struct } from '@strapi/strapi';

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
      'cart-item.cart-items': CartItemCartItems;
      'cart-item.items': CartItemItems;
      'list.list': ListList;
      'slots.slots': SlotsSlots;
      'variants.product-variant': VariantsProductVariant;
      'variants.variants': VariantsVariants;
    }
  }
}
