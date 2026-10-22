# Cornerstone Toys – Mobile App (Customer Side)

React Native + Expo mobile app for Cornerstone Toys.

## Features (Checklist 1–11)

1. **Mobile User Authentication** – Login, Register, Forgot Password
2. **Mobile Home Screen** – Featured products, categories, search, recommended
3. **Product Browsing** – Listing, details, search, filter, sort
4. **Shopping Cart** – Add, update qty, remove, summary
5. **Mobile Checkout** – Address, payment method, order review, place order
6. **Order Management** – Current orders, history, tracking, status
7. **Customer Profile** – View/edit, change password, addresses
8. **Wishlist** – Add, remove, move to cart
9. **Notifications** – UI ready (connect push later)
10. **Reviews and Ratings** – Submit & view on product page
11. **Customer Support** – Contact form, FAQs, live chat placeholder

## Project structure

```
app/
  (tabs)/          → Home, Shop, Cart, Profile (bottom tabs)
  auth/            → Login, Register, Forgot Password
  product/         → Product details + reviews
  checkout/        → Checkout flow
  orders/          → Order list + tracking
  profile/         → Edit profile, password, addresses
  wishlist/        → Wishlist
  support/         → Contact + FAQs
constants/         → Colors (matches web theme)
```

## Theme

- Background: `#111213`
- Primary gold: `#f6ad21`
- Dark surface cards

## Next steps (backend)

- Connect to the same Supabase project used by the web app
- Wire auth, products, cart, orders to real data
- Add Expo push notifications

## Notes

- UI is fully built and navigable with sample data
- No real API calls yet – ready for backend integration
