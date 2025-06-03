# Introduction
Powerhouse is a cutting-edge B2C eCommerce platform dedicated to gym enthusiasts, athletes, and anyone passionate about fitness. Specializing in high-quality gymwear and top-tier fitness equipment, Powerhouse offers a seamless online shopping experience tailored to individuals who demand both performance and style. From breathable, functional activewear to heavy-duty home gym gear, every product is curated to support serious training and everyday workouts. With user-friendly navigation and fast delivery, Powerhouse is the go-to online destination for fitness lovers looking to gear up and level up—all in one powerful platform.

![responsive view](public/readme-images/app-responsive-view.png)

This website has been created as a learning exercise for the [Code Institute](https://codeinstitute.net/) fifth portfolio project.

Access the live app [here](https://ci-pp-5-react-frontend.vercel.app/)

### Project Goals

- To create a visually appealing website
- To create a website that is easy to navigate
- To create a website that is responsive across all devices
- To create an interactive website
- To create a website that is fun and easy to use

# User Stories

### User Goals

- As a user, I want to view the site on any device to shop.
- As a user, I want to create an account to save my details for future purchases.
- As a user, I want to log in and out of my account to manage my profile securely.
- As a user, I want to find products easily so I can easily locate what I want.
- As a user, I want to view product details to decide whether I want to buy it.
- As a user, I want to add products to my shopping cart to prepare for buying.
- As a user, I want to be able to edit the quantity of products in my shopping cart to get the exact amount I need.
- As a user, I want to delete products from my shopping cart if I change my mind.
- As a user, I want to view my shopping cart to see the total cost of my items.
- As a user, I want to check out securely to purchase my items safely.
- As a user, I want to view my orders to track past purchases.
- As a user, I want to filter products by category to find them easily.
- As a user, I want to be able to view and update my profile.


## Agile development

Link to my [GitHub Agile Project](https://github.com/users/raed-nimer/projects/4)

I felt more confident implementing the Agile methodology since I had experience with it from the last project. I decided to use Kanban and the MOSCOW prioritization method for this project.

Epics and User stories helped me organize the project better. And it can be even more efficient when used within a team. I will continue using this methodology for my future projects, considering it very helpful. I will also start exploring Jira, which is also considered a good agile and project management tool.

I created four columns: Backlog, In Progress, In review, and Done. I also created 9 labels:

For MoSCoW prioritization: Must-have, Should-have, Could-have, Won't-have
5 helper labels: bug, Epic, documentation, enhancement, User-story

## Tools and technologies used

### Languages and Frameworks

### React Packages

### Other tools and programs

# Features

# Features

### Home page

- The Home page is the first page that appears when a user visits the website.

- The page features a hero section with a promotional heading, a short tagline, and a clear call-to-action button ("Shop Now").

- The page contains a "Latest Products" section with product listings including images, prices, and action buttons (View Details, Add to Cart).

- The footer includes branding and copyright.

![Home page](public/readme-images/home-page.png)

### About page

- The About page provides a clear and concise overview of the brand's mission and values.

- It introduces Powerhouse as a modern B2C eCommerce platform for gym enthusiasts and fitness lovers.

- A featured "Our Products" section showcases key product categories with images, helping users understand the offerings at a glance.

![About page](public/readme-images/about-page.png)

### Contact page

- The contact page can be used to contact the Powerhouse team for inquiries, support, or feedback.

- The contact page consists of four inputs to fill out: Name, Email, Subject, and Description.

- If a user has any questions or concerns, they can go to the contact page, fill in their name, the email they wish to be contacted at, the subject of the matter, and then describe the matter in more detail in the description section for the support team.

![Contact page](public/readme-images/contact-page.png)

### Products page

- The Products page showcases the products available on Powerhouse, including gym equipment, wearables, and fitness machines.

- Users can easily filter products by categories such as Men’s Gym Wear, Gym Shoes, Gym Equipment, Fitness Gloves etc.

- Each product card includes product image, product name, short description, price, and two action buttons (View Details, Add to Cart)

![Products page](public/readme-images/products-page.png)

### Product Details page

- The Product Details page is used to view detailed information about a specific product.

- It displays an image of the product, the product category, the product name, price, a short description, and interactive buttons for purchasing.

- Users can choose to "Add to Cart" or directly "Go to Cart" from this page. It also includes a “You may also like” section to recommend similar items to users.

![Product Details page](public/readme-images/details-page.png)

### Cart page

- The Cart page is used to review selected products, update quantities, and proceed to checkout.

- It displays an itemized list showing the product image, name, quantity adjustment controls (plus/minus), and price per unit multiplied by quantity.

- On the right side, the Order Summary includes the total number of products, shipping cost, and the overall total. A clear call-to-action button allows users to continue to the checkout process.

![Cart page](public/readme-images/cart-page.png)

### Checkout page

- The Checkout page is used to finalize the purchase by providing billing details and selecting a payment method.

- It includes a Billing Address form with fields for First Name, Last Name, Email, Address, Country, State, and Zip code.

- The page offers a Payment Method section with a selectable option (e.g., Cash on Delivery).

- On the right, there is an Order Summary showing the number of products, shipping cost, and total amount.

- A “Place Order” button allows users to complete the transaction.

![Checkout page](public/readme-images/checkout-page.png)

### My Orders page

- The My Orders page displays all previous orders placed by the user in an organized layout.

- Each order shows the order ID, order date and time, and a list of purchased items with their images, names, quantities, and prices at the time of purchase.

![My Orders page](public/readme-images/myorders-page.png)

### Profile page

- The profile page allows you to update your personal information, including your name, last name and email.

- It provides a simple interface for managing your account details, ensuring your profile stays up-to-date.

![Profile page](public/readme-images/profile-page.png)

### Register page

- The register page is where a first-time user can create their account.

- It has a form with the first name, last name, email, and password.

![register page](public/readme-images/register-page.png)

### Login page

- The login page is where a registered user can log in to their account.

- It has a form with the email address and password fields.

![Login page](public/readme-images/login-page.png)

# Testing

## Code Validation

### HTML Validation

- All pages were checked and passed through the official [W3C](https://validator.w3.org/nu/) validator.
- Validation was done on the live app deployed on Vercel.

| Page                 | Validation image                                                                |
| -------------------- | ------------------------------------------------------------------------------- |
| Home page            | ![Homepage-validation](public/readme-images/Home-validator.png)                 |
| About page           | ![Aboutpage-validation](public/readme-images/About-validator.png)               |
| Cart page            | ![Cartpage-validation](public/readme-images/Cart-validator.png)                 |
| Checkout page        | ![Checkoutpage-validation](public/readme-images/Checkout-validator.png)         |
| Contact page         | ![Contactpage-validation](public/readme-images/Contact-validator.png)           |
| Login page           | ![Login-validation](public/readme-images/Login-validator.png)                   |
| Register page        | ![Register-validation](public/readme-images/Register-validator.png)             |
| Profile page         | ![Profile-validation](public/readme-images/Profile-validator.png)               |
| Product Details page | ![Products-validation](public/readme-images/ProductDetails-validator.png)       |
| Products page        | ![ProductsDetails-validation](public/readme-images/Product-validator.png)       |
| My Orders page       | ![My-orders-page-validation](public/readme-images/My-Orders-validator.png)      |

### CSS Validation

- No errors were found when passing it through the official [jigsaw](https://jigsaw.w3.org/css-validator/) validator.

![CSS validation](public/readme-images/css-validator.jpg)

## Manual Testing
### Devices and browsers used for testing

### User Stories Testing


| Expectation                                                                               | Solution                                                                                                                               | Image                                                                                                                                                       |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| As a user, I want to be able to easily navigate the web App.                              | The navigation bar is added to the top of the page.                                                                                    | ![Navigation bar](/public/readme-images/manual-testing/Testing-navbar.png)                                                                             |
| As a user, I want to be able to easily see the cart items.                                | All pages have a cart button in the navigation bar.                                                                                    | ![Cart button](/public/readme-images/manual-testing/Testing-cart.png)                                                                                  |
| As a user, I want to be able to register an account.                                      | Register button is in the navbar, and available on all pages.                                                                          | ![Sign-up button](/public/readme-images/manual-testing/Testing-register.png)                                                                           |
| As a user, I want to be able to easily log in and log out of my account.                  | Login and Logout buttons are in the navbar and available on all pages. Logout button is included inside a dropdown.                    | ![Login button](/public/readme-images/manual-testing/Testing-login.png) ![Logout button](/staticfiles/readme-images/manual-testing/Testing-logout.png) |
| As an authenticated user, I want to be able to see my orders.                             | The My Orders button is available inside the dropdown of navbar.                                                                       | ![My Orders Button](/public/readme-images/manual-testing/testing-my-orders.png)                                                                        |
| As an authenticated user, I want to be able to go to checkout page to complete the order. | The Go to Checkout button is available in cart page.                                                                                   | ![Go to Checkout button](/public/readme-images/manual-testing/testing-go-to-checkout.png)                                                              |
| As a user, I want to be able to easily contact Powerhouse team.                           | The Contact button is available on the navbar on all pages.                                                                            | ![Contact button](/public/readme-images/manual-testing/testing-contact.png)                                                                            |
| As a user, I want to be able to view and edit my profile.                                 | The current user profile button is available under the dropdown by the username. User can view and edit profile from the profile page. | ![Profile button](/public/readme-images/manual-testing/testing-profile.png)                                                                            |

