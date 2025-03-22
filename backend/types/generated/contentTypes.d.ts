import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiAdOnAdOn extends Struct.CollectionTypeSchema {
  collectionName: 'ad_ons';
  info: {
    description: '';
    displayName: 'ad_on';
    pluralName: 'ad-ons';
    singularName: 'ad-on';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Discount_price: Schema.Attribute.Decimal;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::ad-on.ad-on'> &
      Schema.Attribute.Private;
    Position: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    Price: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    small_desc: Schema.Attribute.String;
    stock: Schema.Attribute.String;
    Tag: Schema.Attribute.String;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAuthAuth extends Struct.CollectionTypeSchema {
  collectionName: 'auth';
  info: {
    description: '';
    displayName: 'auth';
    pluralName: 'auths';
    singularName: 'auth';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    Age: Schema.Attribute.String;
    Breed: Schema.Attribute.String;
    cake_bookings: Schema.Attribute.Relation<
      'oneToMany',
      'api::cake-booking.cake-booking'
    >;
    contact_number: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    DOB: Schema.Attribute.Date;
    grooming_bookings: Schema.Attribute.Relation<
      'oneToMany',
      'api::grooming-booking.grooming-booking'
    >;
    isVerified: Schema.Attribute.Boolean;
    lab_and_vaccination_bookings: Schema.Attribute.Relation<
      'oneToMany',
      'api::lab-and-vaccination-booking.lab-and-vaccination-booking'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::auth.auth'> &
      Schema.Attribute.Private;
    loginOtp: Schema.Attribute.BigInteger;
    otp: Schema.Attribute.String;
    otpExpired: Schema.Attribute.DateTime;
    otpExpiry: Schema.Attribute.DateTime;
    password: Schema.Attribute.Password;
    pet_shop_and_bakery_orders: Schema.Attribute.Relation<
      'oneToMany',
      'api::pet-shop-and-bakery-order.pet-shop-and-bakery-order'
    >;
    petName: Schema.Attribute.String;
    pets: Schema.Attribute.Relation<
      'oneToMany',
      'api::booking-consultation.booking-consultation'
    >;
    PetType: Schema.Attribute.String;
    physio_bookings: Schema.Attribute.Relation<
      'oneToMany',
      'api::physio-booking.physio-booking'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBakerySliderBakerySlider
  extends Struct.CollectionTypeSchema {
  collectionName: 'bakery_sliders';
  info: {
    description: '';
    displayName: 'Bakery_Slider';
    pluralName: 'bakery-sliders';
    singularName: 'bakery-slider';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category: Schema.Attribute.Relation<
      'manyToOne',
      'api::pet-bakery.pet-bakery'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    isLab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isPetShop: Schema.Attribute.Relation<'manyToOne', 'api::petshop.petshop'>;
    isPetShopProduct: Schema.Attribute.Boolean;
    isPhysiotherapy: Schema.Attribute.Boolean;
    isVacination: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::bakery-slider.bakery-slider'
    > &
      Schema.Attribute.Private;
    pet_shop_category: Schema.Attribute.Relation<
      'manyToOne',
      'api::pet-shop-category.pet-shop-category'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBlogBlog extends Struct.CollectionTypeSchema {
  collectionName: 'blogs';
  info: {
    description: '';
    displayName: 'Blog';
    pluralName: 'blogs';
    singularName: 'blog';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Blog_second_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    blogImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    content: Schema.Attribute.Text;
    content_2: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::blog.blog'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    show: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBookingConsultationBookingConsultation
  extends Struct.CollectionTypeSchema {
  collectionName: 'booking_consultations';
  info: {
    description: '';
    displayName: 'Booking-Consultation';
    pluralName: 'booking-consultations';
    singularName: 'booking-consultation';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Cancel_Reason: Schema.Attribute.Text;
    consulation_rate: Schema.Attribute.Integer;
    consultation: Schema.Attribute.Relation<
      'manyToOne',
      'api::consultation.consultation'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Date: Schema.Attribute.Date;
    doctor: Schema.Attribute.Relation<'manyToOne', 'api::doctor.doctor'>;
    feedback: Schema.Attribute.Text;
    is_consultation_complete: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    is_rate_done: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isBookingCancel: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::booking-consultation.booking-consultation'
    > &
      Schema.Attribute.Private;
    period: Schema.Attribute.String;
    pet: Schema.Attribute.Relation<'manyToOne', 'api::auth.auth'>;
    publishedAt: Schema.Attribute.DateTime;
    reminder_done: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    remineder_time: Schema.Attribute.Time;
    Time: Schema.Attribute.Time;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    whatsapp_notification_done: Schema.Attribute.Boolean;
  };
}

export interface ApiCakeBookingCakeBooking extends Struct.CollectionTypeSchema {
  collectionName: 'cake_bookings';
  info: {
    description: '';
    displayName: 'Cake-booking';
    pluralName: 'cake-bookings';
    singularName: 'cake-booking';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Admin_Cancel_order: Schema.Attribute.Boolean;
    Admin_Cancel_order_reason: Schema.Attribute.String;
    Billing_details: Schema.Attribute.Component<
      'billing-details.billing-details',
      false
    >;
    Caketitle: Schema.Attribute.String;
    clinic: Schema.Attribute.Relation<'manyToOne', 'api::clinic.clinic'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Delivery_Date: Schema.Attribute.DateTime;
    Delivery_Fee: Schema.Attribute.BigInteger;
    Delivery_Fee_Aplicable: Schema.Attribute.Boolean;
    Design: Schema.Attribute.String;
    flavour: Schema.Attribute.String;
    Is_Paid: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::cake-booking.cake-booking'
    > &
      Schema.Attribute.Private;
    Order_Cancel_by_user: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    Order_Cancel_by_user_reason: Schema.Attribute.String;
    Order_Stauts: Schema.Attribute.Enumeration<
      [
        'Pending',
        'Cake Preparing',
        'Cancel',
        'Rejected',
        'Order Accepted',
        'Dispatched',
        'Canceled',
        'Delivered',
      ]
    >;
    pet_id: Schema.Attribute.Relation<'manyToOne', 'api::auth.auth'>;
    price: Schema.Attribute.BigInteger;
    publishedAt: Schema.Attribute.DateTime;
    Same_Day_delivery: Schema.Attribute.Boolean;
    size: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiClinicClinic extends Struct.CollectionTypeSchema {
  collectionName: 'clinics';
  info: {
    description: '';
    displayName: 'clinic';
    pluralName: 'clinics';
    singularName: 'clinic';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Address: Schema.Attribute.Text;
    cake_bookings: Schema.Attribute.Relation<
      'oneToMany',
      'api::cake-booking.cake-booking'
    >;
    clinic_name: Schema.Attribute.String;
    contact_details: Schema.Attribute.BigInteger;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    grooming_bookings: Schema.Attribute.Relation<
      'oneToMany',
      'api::grooming-booking.grooming-booking'
    >;
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    lab_and_vaccination_bookings: Schema.Attribute.Relation<
      'oneToMany',
      'api::lab-and-vaccination-booking.lab-and-vaccination-booking'
    >;
    lab_tests: Schema.Attribute.Relation<
      'manyToMany',
      'api::lab-test.lab-test'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::clinic.clinic'
    > &
      Schema.Attribute.Private;
    Map_Location: Schema.Attribute.String;
    opening_stauts: Schema.Attribute.Boolean & Schema.Attribute.Required;
    Position: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    Rating: Schema.Attribute.Decimal;
    ScanTestAvailable: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    Slots: Schema.Attribute.Component<'slots.slots', true>;
    time: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    vaccinations: Schema.Attribute.Relation<
      'manyToMany',
      'api::vaccination.vaccination'
    >;
  };
}

export interface ApiCollectionTypeCollectionType
  extends Struct.CollectionTypeSchema {
  collectionName: 'collection_types';
  info: {
    displayName: 'CollectionType';
    pluralName: 'collection-types';
    singularName: 'collection-type';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    isAvailable: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::collection-type.collection-type'
    > &
      Schema.Attribute.Private;
    Off_percentage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    small_desc: Schema.Attribute.String;
    start_from: Schema.Attribute.BigInteger;
    tag: Schema.Attribute.String;
    Timeing: Schema.Attribute.String;
    Title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiConsultationConsultation
  extends Struct.CollectionTypeSchema {
  collectionName: 'consultations';
  info: {
    displayName: 'Consultation';
    pluralName: 'consultations';
    singularName: 'consultation';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    booking_consultations: Schema.Attribute.Relation<
      'oneToMany',
      'api::booking-consultation.booking-consultation'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    discount: Schema.Attribute.BigInteger;
    discountPrice: Schema.Attribute.BigInteger;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::consultation.consultation'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    offer_valid_upto: Schema.Attribute.String;
    price: Schema.Attribute.BigInteger;
    publishedAt: Schema.Attribute.DateTime;
    show: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiDesignDataDesignData extends Struct.CollectionTypeSchema {
  collectionName: 'design_datas';
  info: {
    displayName: 'Design-Data';
    pluralName: 'design-datas';
    singularName: 'design-data';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    is_active: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::design-data.design-data'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    position: Schema.Attribute.Integer;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiDisplayDoctorDisplayDoctor
  extends Struct.CollectionTypeSchema {
  collectionName: 'display_doctors';
  info: {
    displayName: 'Display_Doctor';
    pluralName: 'display-doctors';
    singularName: 'display-doctor';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    experience: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    isBest: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::display-doctor.display-doctor'
    > &
      Schema.Attribute.Private;
    Name: Schema.Attribute.String;
    position: Schema.Attribute.Integer;
    publishedAt: Schema.Attribute.DateTime;
    specialization: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiDoctorDoctor extends Struct.CollectionTypeSchema {
  collectionName: 'doctors';
  info: {
    displayName: 'Doctor';
    pluralName: 'doctors';
    singularName: 'doctor';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    booking_consultations: Schema.Attribute.Relation<
      'oneToMany',
      'api::booking-consultation.booking-consultation'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    discount_price: Schema.Attribute.BigInteger;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::doctor.doctor'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    price: Schema.Attribute.BigInteger;
    publishedAt: Schema.Attribute.DateTime;
    show: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFlavourFlavour extends Struct.CollectionTypeSchema {
  collectionName: 'flavours';
  info: {
    displayName: 'flavour';
    pluralName: 'flavours';
    singularName: 'flavour';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    active: Schema.Attribute.Boolean;
    any_tag: Schema.Attribute.Boolean;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::flavour.flavour'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    tag_title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiGroomingBookingGroomingBooking
  extends Struct.CollectionTypeSchema {
  collectionName: 'grooming_bookings';
  info: {
    description: '';
    displayName: 'Grooming_Booking';
    pluralName: 'grooming-bookings';
    singularName: 'grooming-booking';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    booking_status: Schema.Attribute.Enumeration<
      ['Pending', 'Canceled', 'Rejected', 'Accepted', 'Completed']
    >;
    clinic: Schema.Attribute.Relation<'manyToOne', 'api::clinic.clinic'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Customize: Schema.Attribute.Component<
      'customize-package-booking.customize-package-booking',
      true
    >;
    Date_of_Service: Schema.Attribute.Date;
    feedback: Schema.Attribute.Text;
    General_Booking: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    grooming_service: Schema.Attribute.Relation<
      'manyToOne',
      'api::grooming-service.grooming-service'
    >;
    Is_Cancel_admin: Schema.Attribute.Boolean;
    Is_Cancel_admin_reason: Schema.Attribute.Text;
    Is_Cancel_By_User: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    Is_Cancel_user_reason: Schema.Attribute.Text;
    is_rate: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::grooming-booking.grooming-booking'
    > &
      Schema.Attribute.Private;
    Package: Schema.Attribute.Relation<
      'manyToOne',
      'api::grooming-package.grooming-package'
    >;
    pet: Schema.Attribute.Relation<'manyToOne', 'api::auth.auth'>;
    publishedAt: Schema.Attribute.DateTime;
    rate: Schema.Attribute.Integer;
    service_complete: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    Time: Schema.Attribute.String;
    Type: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiGroomingPackageGroomingPackage
  extends Struct.CollectionTypeSchema {
  collectionName: 'grooming_packages';
  info: {
    description: '';
    displayName: 'Grooming Package';
    pluralName: 'grooming-packages';
    singularName: 'grooming-package';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Category: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    discount_: Schema.Attribute.BigInteger;
    grooming_bookings: Schema.Attribute.Relation<
      'oneToMany',
      'api::grooming-booking.grooming-booking'
    >;
    includes: Schema.Attribute.JSON;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::grooming-package.grooming-package'
    > &
      Schema.Attribute.Private;
    price_end: Schema.Attribute.BigInteger;
    price_start: Schema.Attribute.BigInteger;
    publishedAt: Schema.Attribute.DateTime;
    show: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiGroomingServiceGroomingService
  extends Struct.CollectionTypeSchema {
  collectionName: 'grooming_services';
  info: {
    displayName: ' Grooming service';
    pluralName: 'grooming-services';
    singularName: 'grooming-service';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    anyOffer: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    Booking_Accept: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    desc: Schema.Attribute.Text;
    endPrice: Schema.Attribute.BigInteger;
    grooming_bookings: Schema.Attribute.Relation<
      'oneToMany',
      'api::grooming-booking.grooming-booking'
    >;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::grooming-service.grooming-service'
    > &
      Schema.Attribute.Private;
    offer: Schema.Attribute.String;
    PriceVary: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    publishedAt: Schema.Attribute.DateTime;
    startPrice: Schema.Attribute.BigInteger;
    type: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHomeAddressHomeAddress extends Struct.SingleTypeSchema {
  collectionName: 'home_addresses';
  info: {
    displayName: 'home_address';
    pluralName: 'home-addresses';
    singularName: 'home-address';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    House_no: Schema.Attribute.String;
    landmark: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::home-address.home-address'
    > &
      Schema.Attribute.Private;
    Pincode: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    state: Schema.Attribute.String;
    street_address: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHomePageSliderHomePageSlider
  extends Struct.CollectionTypeSchema {
  collectionName: 'home_page_sliders';
  info: {
    displayName: 'Home Page slider';
    pluralName: 'home-page-sliders';
    singularName: 'home-page-slider';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::home-page-slider.home-page-slider'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiLabAndVaccinationBookingLabAndVaccinationBooking
  extends Struct.CollectionTypeSchema {
  collectionName: 'lab_and_vaccination_bookings';
  info: {
    description: '';
    displayName: 'Lab_And_Vaccination_Booking';
    pluralName: 'lab-and-vaccination-bookings';
    singularName: 'lab-and-vaccination-booking';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    auth: Schema.Attribute.Relation<'manyToOne', 'api::auth.auth'>;
    Booking_Date: Schema.Attribute.Date;
    cancel_reason: Schema.Attribute.String;
    clinic: Schema.Attribute.Relation<'manyToOne', 'api::clinic.clinic'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    is_order_complete: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    isBookingCancel: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::lab-and-vaccination-booking.lab-and-vaccination-booking'
    > &
      Schema.Attribute.Private;
    offer: Schema.Attribute.Relation<'manyToOne', 'api::offer.offer'>;
    Payable_Amount: Schema.Attribute.BigInteger;
    publishedAt: Schema.Attribute.DateTime;
    Test: Schema.Attribute.Component<'test-books.test', true>;
    Time_Of_Test: Schema.Attribute.String;
    Total_Discount: Schema.Attribute.BigInteger;
    Total_Price: Schema.Attribute.BigInteger;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    whatsapp_notification_done: Schema.Attribute.Boolean;
  };
}

export interface ApiLabOrderNewAppLabOrderNewApp
  extends Struct.CollectionTypeSchema {
  collectionName: 'lab_order_new_apps';
  info: {
    description: '';
    displayName: 'Lab_Order_new_App';
    pluralName: 'lab-order-new-apps';
    singularName: 'lab-order-new-app';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    applied_offer: Schema.Attribute.String;
    clinic_name: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    home_address: Schema.Attribute.Component<'address.address', false>;
    isHomeCollection: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::lab-order-new-app.lab-order-new-app'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
    offer_discount: Schema.Attribute.Float;
    payable_amount: Schema.Attribute.Float & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    Tests_And_Vaccine: Schema.Attribute.Component<'cart-lab-items.items', true>;
    time: Schema.Attribute.DateTime & Schema.Attribute.Required;
    total_discount: Schema.Attribute.Float;
    total_price: Schema.Attribute.Float & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user_id: Schema.Attribute.Relation<'oneToOne', 'api::auth.auth'>;
  };
}

export interface ApiLabTestLabTest extends Struct.CollectionTypeSchema {
  collectionName: 'lab_tests';
  info: {
    description: '';
    displayName: 'LabTest';
    pluralName: 'lab-tests';
    singularName: 'lab-test';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    clinics: Schema.Attribute.Relation<'manyToMany', 'api::clinic.clinic'>;
    common_disease_cat: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    common_disease_dog: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Details: Schema.Attribute.RichText;
    discountPercentage: Schema.Attribute.BigInteger;
    discountPrice: Schema.Attribute.BigInteger;
    is_available_at_main_branch: Schema.Attribute.Boolean;
    Is_common_disease: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    isAdsOnTest: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isPopular: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::lab-test.lab-test'
    > &
      Schema.Attribute.Private;
    OtherImages: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    PetType: Schema.Attribute.String;
    Position: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    Sample_Image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    test_name: Schema.Attribute.String;
    test_price: Schema.Attribute.BigInteger;
    TestAvailability: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMainCategoryMainCategory
  extends Struct.CollectionTypeSchema {
  collectionName: 'main_categories';
  info: {
    displayName: 'Main category';
    pluralName: 'main-categories';
    singularName: 'main-category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    active: Schema.Attribute.Boolean;
    createAt: Schema.Attribute.Date;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::main-category.main-category'
    > &
      Schema.Attribute.Private;
    position: Schema.Attribute.Integer;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiOfferOffer extends Struct.CollectionTypeSchema {
  collectionName: 'offers';
  info: {
    description: '';
    displayName: 'Offer';
    pluralName: 'offers';
    singularName: 'offer';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    active: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    Code: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    desc: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    lab_and_vaccination_bookings: Schema.Attribute.Relation<
      'oneToMany',
      'api::lab-and-vaccination-booking.lab-and-vaccination-booking'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::offer.offer'> &
      Schema.Attribute.Private;
    minimum_amount: Schema.Attribute.Decimal & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    TermAndCondition: Schema.Attribute.RichText;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    upto_off: Schema.Attribute.Decimal;
  };
}

export interface ApiPackagejsonPackagejson extends Struct.CollectionTypeSchema {
  collectionName: 'packagejsons';
  info: {
    displayName: 'Packagejson';
    pluralName: 'packagejsons';
    singularName: 'packagejson';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    json: Schema.Attribute.JSON;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::packagejson.packagejson'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPetBakeryPetBakery extends Struct.CollectionTypeSchema {
  collectionName: 'pet_bakeries';
  info: {
    description: '';
    displayName: 'Pet bakery';
    pluralName: 'pet-bakeries';
    singularName: 'pet-bakery';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    active: Schema.Attribute.Boolean;
    bakery_sliders: Schema.Attribute.Relation<
      'oneToMany',
      'api::bakery-slider.bakery-slider'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::pet-bakery.pet-bakery'
    > &
      Schema.Attribute.Private;
    Postion: Schema.Attribute.Integer;
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    publishedAt: Schema.Attribute.DateTime;
    screen_name: Schema.Attribute.String;
    tag: Schema.Attribute.String;
    titile: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPetShopAndBakeryOrderPetShopAndBakeryOrder
  extends Struct.CollectionTypeSchema {
  collectionName: 'pet_shop_and_bakery_orders';
  info: {
    description: '';
    displayName: 'Pet_Shop_And_bakery_order';
    pluralName: 'pet-shop-and-bakery-orders';
    singularName: 'pet-shop-and-bakery-order';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    admin_cancel_reason: Schema.Attribute.String;
    auth: Schema.Attribute.Relation<'manyToOne', 'api::auth.auth'>;
    Billing_Details: Schema.Attribute.Component<
      'billing-details.billing-details',
      false
    >;
    Cancel_user_reason: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    isCancelbyAdmin: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    isCancelbyUser: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::pet-shop-and-bakery-order.pet-shop-and-bakery-order'
    > &
      Schema.Attribute.Private;
    Order_Status: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    Shop_bakery_cart_items: Schema.Attribute.Component<
      'shop-cart.shop-bakery-cart-items',
      true
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPetShopCategoryPetShopCategory
  extends Struct.CollectionTypeSchema {
  collectionName: 'pet_shop_categories';
  info: {
    description: '';
    displayName: 'Pet_shop_category';
    pluralName: 'pet-shop-categories';
    singularName: 'pet-shop-category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bakery_sliders: Schema.Attribute.Relation<
      'oneToMany',
      'api::bakery-slider.bakery-slider'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::pet-shop-category.pet-shop-category'
    > &
      Schema.Attribute.Private;
    pet_shop_products: Schema.Attribute.Relation<
      'manyToMany',
      'api::pet-shop-product.pet-shop-product'
    >;
    petshops: Schema.Attribute.Relation<'manyToMany', 'api::petshop.petshop'>;
    Position: Schema.Attribute.Integer & Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPetShopProductPetShopProduct
  extends Struct.CollectionTypeSchema {
  collectionName: 'pet_shop_products';
  info: {
    description: '';
    displayName: 'Pet_Shop_Product';
    pluralName: 'pet-shop-products';
    singularName: 'pet-shop-product';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category_foods: Schema.Attribute.Relation<
      'manyToMany',
      'api::pet-shop-category.pet-shop-category'
    >;
    COD_AVAILABLE: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Delivery_fee: Schema.Attribute.BigInteger;
    Descrption: Schema.Attribute.RichText;
    Disc_Price: Schema.Attribute.BigInteger;
    Discount_Percentage: Schema.Attribute.BigInteger;
    Exchange_policy: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    Free_Delivery: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    Images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    isAnyDeliveryFee: Schema.Attribute.Boolean;
    isVarient: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::pet-shop-product.pet-shop-product'
    > &
      Schema.Attribute.Private;
    Price: Schema.Attribute.BigInteger;
    publishedAt: Schema.Attribute.DateTime;
    Tag: Schema.Attribute.String;
    Title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Variants_price: Schema.Attribute.Component<'variants.variants', true>;
    which_company_food: Schema.Attribute.String;
  };
}

export interface ApiPetshopPetshop extends Struct.CollectionTypeSchema {
  collectionName: 'petshops';
  info: {
    description: '';
    displayName: 'petshop';
    pluralName: 'petshops';
    singularName: 'petshop';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    active: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    bakery_sliders: Schema.Attribute.Relation<
      'oneToMany',
      'api::bakery-slider.bakery-slider'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::petshop.petshop'
    > &
      Schema.Attribute.Private;
    pet_shop_categories: Schema.Attribute.Relation<
      'manyToMany',
      'api::pet-shop-category.pet-shop-category'
    >;
    postion: Schema.Attribute.Integer & Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    screen: Schema.Attribute.String;
    Title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPhysioBookingPhysioBooking
  extends Struct.CollectionTypeSchema {
  collectionName: 'physio_bookings';
  info: {
    description: '';
    displayName: 'Physio_booking';
    pluralName: 'physio-bookings';
    singularName: 'physio-booking';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    BookingID: Schema.Attribute.String;
    cancel_reason: Schema.Attribute.String;
    Clinic: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Branch'>;
    contactNumber: Schema.Attribute.BigInteger;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Date_of_appoinment: Schema.Attribute.Date;
    is_cancel: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isPhysio: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::physio-booking.physio-booking'
    > &
      Schema.Attribute.Private;
    PetID: Schema.Attribute.Relation<'manyToOne', 'api::auth.auth'>;
    Petname: Schema.Attribute.String;
    physiotherapy: Schema.Attribute.Relation<
      'manyToOne',
      'api::physiotherapy.physiotherapy'
    >;
    publishedAt: Schema.Attribute.DateTime;
    rate: Schema.Attribute.Integer;
    service_done: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    TypeOfBooking: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPhysiotherapyPhysiotherapy
  extends Struct.CollectionTypeSchema {
  collectionName: 'physiotherapies';
  info: {
    displayName: 'Physiotherapy';
    pluralName: 'physiotherapies';
    singularName: 'physiotherapy';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Description: Schema.Attribute.RichText;
    discount_price: Schema.Attribute.BigInteger;
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::physiotherapy.physiotherapy'
    > &
      Schema.Attribute.Private;
    physio_bookings: Schema.Attribute.Relation<
      'oneToMany',
      'api::physio-booking.physio-booking'
    >;
    Popular: Schema.Attribute.Boolean;
    price: Schema.Attribute.BigInteger;
    price_minute: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    small_desc: Schema.Attribute.String;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiProductProduct extends Struct.CollectionTypeSchema {
  collectionName: 'products';
  info: {
    description: '';
    displayName: 'product';
    pluralName: 'products';
    singularName: 'product';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    catgory: Schema.Attribute.Relation<
      'manyToOne',
      'api::pet-bakery.pet-bakery'
    >;
    content: Schema.Attribute.Blocks;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    disc_price: Schema.Attribute.Decimal;
    images: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::product.product'
    > &
      Schema.Attribute.Private;
    off_dis_percentage: Schema.Attribute.Decimal;
    price: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    small_desc: Schema.Attribute.String;
    suitable_for: Schema.Attribute.String;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    variant: Schema.Attribute.Component<'variants.variants', true>;
    varient_stauts: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface ApiQuantityQuantity extends Struct.CollectionTypeSchema {
  collectionName: 'quantities';
  info: {
    displayName: 'quantity';
    pluralName: 'quantities';
    singularName: 'quantity';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::quantity.quantity'
    > &
      Schema.Attribute.Private;
    price: Schema.Attribute.BigInteger;
    publishedAt: Schema.Attribute.DateTime;
    type_of_qunatity: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSettingSetting extends Struct.CollectionTypeSchema {
  collectionName: 'settings';
  info: {
    description: '';
    displayName: 'Setting';
    pluralName: 'settings';
    singularName: 'setting';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Clinic_booking_time_end: Schema.Attribute.Time;
    Clinic_booking_time_start: Schema.Attribute.Time;
    Clinic_slots_gap: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Home_Collection_End_time: Schema.Attribute.Time;
    Home_Collection_Start_time: Schema.Attribute.Time;
    Home_slots_gap: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::setting.setting'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    ultrasound_booking_end_time: Schema.Attribute.Time;
    ultrasound_booking_time_start: Schema.Attribute.Time;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTimeManagementTimeManagement
  extends Struct.CollectionTypeSchema {
  collectionName: 'time_managements';
  info: {
    description: '';
    displayName: 'Time_Management';
    pluralName: 'time-managements';
    singularName: 'time-management';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    End_Time: Schema.Attribute.Time;
    For_What: Schema.Attribute.String;
    Is_Sunday_off: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::time-management.time-management'
    > &
      Schema.Attribute.Private;
    Max_Booking_Allowed_in_per_slots: Schema.Attribute.BigInteger;
    publishedAt: Schema.Attribute.DateTime;
    Start_Time: Schema.Attribute.Time;
    Times_Block: Schema.Attribute.Component<'times.time-block', true>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Which_Date_booking_Closed: Schema.Attribute.Date;
  };
}

export interface ApiVaccinationVaccination extends Struct.CollectionTypeSchema {
  collectionName: 'vaccinations';
  info: {
    description: '';
    displayName: 'Vaccination';
    pluralName: 'vaccinations';
    singularName: 'vaccination';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    clinics: Schema.Attribute.Relation<'manyToMany', 'api::clinic.clinic'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    desc: Schema.Attribute.RichText;
    discount_price: Schema.Attribute.BigInteger;
    forage: Schema.Attribute.String;
    HomePriceOfPackage: Schema.Attribute.BigInteger;
    HomePriceOfPackageDiscount: Schema.Attribute.BigInteger;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    isActive: Schema.Attribute.Boolean;
    isCat: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isDog: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    isPackage: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    isPopular: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::vaccination.vaccination'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.Component<'list.list', true>;
    off_percentage: Schema.Attribute.BigInteger;
    price: Schema.Attribute.BigInteger;
    publishedAt: Schema.Attribute.DateTime;
    small_dsec: Schema.Attribute.Text;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.String;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::ad-on.ad-on': ApiAdOnAdOn;
      'api::auth.auth': ApiAuthAuth;
      'api::bakery-slider.bakery-slider': ApiBakerySliderBakerySlider;
      'api::blog.blog': ApiBlogBlog;
      'api::booking-consultation.booking-consultation': ApiBookingConsultationBookingConsultation;
      'api::cake-booking.cake-booking': ApiCakeBookingCakeBooking;
      'api::clinic.clinic': ApiClinicClinic;
      'api::collection-type.collection-type': ApiCollectionTypeCollectionType;
      'api::consultation.consultation': ApiConsultationConsultation;
      'api::design-data.design-data': ApiDesignDataDesignData;
      'api::display-doctor.display-doctor': ApiDisplayDoctorDisplayDoctor;
      'api::doctor.doctor': ApiDoctorDoctor;
      'api::flavour.flavour': ApiFlavourFlavour;
      'api::grooming-booking.grooming-booking': ApiGroomingBookingGroomingBooking;
      'api::grooming-package.grooming-package': ApiGroomingPackageGroomingPackage;
      'api::grooming-service.grooming-service': ApiGroomingServiceGroomingService;
      'api::home-address.home-address': ApiHomeAddressHomeAddress;
      'api::home-page-slider.home-page-slider': ApiHomePageSliderHomePageSlider;
      'api::lab-and-vaccination-booking.lab-and-vaccination-booking': ApiLabAndVaccinationBookingLabAndVaccinationBooking;
      'api::lab-order-new-app.lab-order-new-app': ApiLabOrderNewAppLabOrderNewApp;
      'api::lab-test.lab-test': ApiLabTestLabTest;
      'api::main-category.main-category': ApiMainCategoryMainCategory;
      'api::offer.offer': ApiOfferOffer;
      'api::packagejson.packagejson': ApiPackagejsonPackagejson;
      'api::pet-bakery.pet-bakery': ApiPetBakeryPetBakery;
      'api::pet-shop-and-bakery-order.pet-shop-and-bakery-order': ApiPetShopAndBakeryOrderPetShopAndBakeryOrder;
      'api::pet-shop-category.pet-shop-category': ApiPetShopCategoryPetShopCategory;
      'api::pet-shop-product.pet-shop-product': ApiPetShopProductPetShopProduct;
      'api::petshop.petshop': ApiPetshopPetshop;
      'api::physio-booking.physio-booking': ApiPhysioBookingPhysioBooking;
      'api::physiotherapy.physiotherapy': ApiPhysiotherapyPhysiotherapy;
      'api::product.product': ApiProductProduct;
      'api::quantity.quantity': ApiQuantityQuantity;
      'api::setting.setting': ApiSettingSetting;
      'api::time-management.time-management': ApiTimeManagementTimeManagement;
      'api::vaccination.vaccination': ApiVaccinationVaccination;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
