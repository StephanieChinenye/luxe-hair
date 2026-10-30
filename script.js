// =========================
// PRODUCT DATA
// =========================

const products = [

    {
        id: 1,
        name: "Pixie curls",
        type: "caramel brown lace full frontal",
        price: 150000,
        image: "images/pixie curls.jpg",
        description:
            "Soft, luxurious pixie curls hair with beautiful movement and a natural finish."
    },

    {
        id: 2,
        name: "bouncy",
        type: "16inches bouncy",
        price: 165000,
        image: "images/supadrawn bodywave.jpg",
        description:
            "Full and defined bouncy hair designed to give you a glamorous, effortless look."
    },

    {
        id: 3,
        name: "Bone Straight",
        type: "Silky Straight",
        price: 180000,
        image: "images/bone straight.jpg",
        description:
            "Smooth, silky straight hair with a sleek finish and luxurious movement."
    },

    {
        id: 4,
        name: "super soft bounce curl",
        type: "bouncy curl",
        price: 170000,
        image: "images/ginger bounce.jpg",
        description:
            "20inches lace ginger bouncy curl"
    }

];


// =========================
// VARIABLES
// =========================

let cart = [];

let selectedProduct = null;


const productsContainer =
    document.getElementById("products");

const cartButton =
    document.getElementById("cartButton");

const cartPanel =
    document.getElementById("cartPanel");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");


const whatsappOrder =
    document.getElementById("whatsappOrder");


const productModal =
    document.getElementById("productModal");

const closeModal =
    document.getElementById("closeModal");

const modalImage =
    document.getElementById("modalImage");

const modalName =
    document.getElementById("modalName");

const modalPrice =
    document.getElementById("modalPrice");

const modalDescription =
    document.getElementById("modalDescription");

const modalAdd =
    document.getElementById("modalAdd");


const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


// =========================
// FORMAT PRICE
// =========================

function formatPrice(price) {

    return new Intl.NumberFormat("en-NG", {

        style: "currency",

        currency: "NGN",

        maximumFractionDigits: 0

    }).format(price);

}


// =========================
// DISPLAY PRODUCTS
// =========================

function displayProducts() {

    productsContainer.innerHTML = "";

    products.forEach(product => {

        const card =
            document.createElement("div");

        card.classList.add("product-card");


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="product-info">

                <div>

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="product-type">
                        ${product.type}
                    </p>

                </div>

                <p>
                    ${formatPrice(product.price)}
                </p>

            </div>

        `;


        card.addEventListener("click", () => {

            openProduct(product);

        });


        productsContainer.appendChild(card);

    });

}


// =========================
// OPEN PRODUCT MODAL
// =========================

function openProduct(product) {

    selectedProduct = product;

    modalImage.src = product.image;

    modalImage.alt = product.name;

    modalName.textContent =
        product.name;

    modalPrice.textContent =
        formatPrice(product.price);

    modalDescription.textContent =
        product.description;


    productModal.classList.add("active");

}


// =========================
// CLOSE PRODUCT MODAL
// =========================

closeModal.addEventListener("click", () => {

    productModal.classList.remove("active");

});


productModal.addEventListener("click", (event) => {

    if (event.target === productModal) {

        productModal.classList.remove("active");

    }

});


// =========================
// ADD TO CART
// =========================

function addToCart(product) {

    const existingProduct =
        cart.find(item => item.id === product.id);


    if (existingProduct) {

        existingProduct.quantity++;

    }

    else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();

    productModal.classList.remove("active");

    openCart();

}


// =========================
// MODAL ADD BUTTON
// =========================

modalAdd.addEventListener("click", () => {

    if (selectedProduct) {

        addToCart(selectedProduct);

    }

});


// =========================
// UPDATE CART
// =========================

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    let quantity = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">
                Your cart is empty.
            </p>

        `;

    }


    cart.forEach(item => {

        total +=
            item.price * item.quantity;

        quantity += item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >


            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ${formatPrice(item.price)}
                </p>


                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>


                <button
                    class="remove-item"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent =
        quantity;

    cartTotal.textContent =
        formatPrice(total);

}


// =========================
// CHANGE QUANTITY
// =========================

function changeQuantity(id, amount) {

    const item =
        cart.find(product => product.id === id);


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(product => product.id !== id);

    }


    updateCart();

}


// =========================
// REMOVE FROM CART
// =========================

function removeFromCart(id) {

    cart =
        cart.filter(product => product.id !== id);

    updateCart();

}


// =========================
// OPEN CART
// =========================

function openCart() {

    cartPanel.classList.add("active");

    cartOverlay.classList.add("active");

}


// =========================
// CLOSE CART
// =========================

function closeCartPanel() {

    cartPanel.classList.remove("active");

    cartOverlay.classList.remove("active");

}


cartButton.addEventListener(
    "click",
    openCart
);


closeCart.addEventListener(
    "click",
    closeCartPanel
);


cartOverlay.addEventListener(
    "click",
    closeCartPanel
);


// =========================
// WHATSAPP ORDER
// =========================

whatsappOrder.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    // Replace this with the
    // customer's WhatsApp number.

    const phoneNumber =
        "2349126346863";


    let message =
        "Hello Luxe Hair! 👋🏽%0A%0A";

    message +=
        "I would like to order:%0A%0A";


    cart.forEach(item => {

        message +=
            `• ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}%0A`;

    });


    const total =
        cart.reduce(

            (sum, item) =>
                sum + item.price * item.quantity,

            0

        );


    message +=
        `%0ATotal: ${formatPrice(total)}%0A%0A`;

    message +=
        "Please let me know how I can complete my order.";


    window.open(

        `https://wa.me/${phoneNumber}?text=${message}`,

        "_blank"

    );

});


// =========================
// MOBILE MENU
// =========================

menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

        });

    });


// =========================
// START WEBSITE
// =========================

displayProducts();

updateCart();