$(document).ready(function() {
    $('#accordian1').addClass('active');
    $('#accordian1').next('.form').addClass('visible');
    $('#accordian1').find('.accordion-radio').prop('checked', true);

    $('.accordian-toggle').click(function(e) {
        e.preventDefault();

        let isActive = $(this).hasClass('active');

        $(this).toggleClass('active', !isActive);

        $(this).next('.form').toggleClass('visible', !isActive);

        $(this).find('.accordion-radio').prop('checked', !isActive);

        $('.accordian-toggle').not(this).removeClass('active');
        $('.form').not($(this).next('.form')).removeClass('visible');
        $('.accordion-radio').not($(this).find('.accordion-radio')).prop('checked', false);
    });
});




















function validateForm() {
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;
    const cvv = document.getElementById("cvv").value.trim();

    let isValid = true;

    document.getElementById("cardNumber").classList.remove("error");
    document.getElementById("month").classList.remove("error");
    document.getElementById("year").classList.remove("error");
    document.getElementById("cvv").classList.remove("error");
    document.getElementById("cardNumberError").innerText = "";
    document.getElementById("dateError").innerText = "";
    document.getElementById("cvvError").innerText = "";

    if (cardNumber.length !== 16 || !/^\d{16}$/.test(cardNumber)) {
        document.getElementById("cardNumber").classList.add("error");
        document.getElementById("cardNumberError").innerText = "Card number must be 16 digits.";
        isValid = false;
    }

    if (month === "MM" || year === "YYYY") {
        document.getElementById("month").classList.add("error");
        document.getElementById("year").classList.add("error");
        document.getElementById("dateError").innerText = "Please select a valid month and year.";
        isValid = false;
    }

    if (cvv.length !== 3 || !/^\d{3}$/.test(cvv)) {
        document.getElementById("cvv").classList.add("error");
        document.getElementById("cvvError").innerText = "CVV must be 3 digits.";
        isValid = false;
    }

    if (isValid) {
        alert("Payment submitted successfully!");
    }
}

function validateCustomerID() {
    var customerId = document.getElementById("Netbanking").value;
    var errorMessage = document.getElementById("NetbankingError");

    var customerIdPattern = /^\d{8}$/;

    if (customerIdPattern.test(customerId)) {
        errorMessage.textContent = "";
        alert("Form submitted successfully!");
    } else {
        errorMessage.textContent = "Please enter a valid 8-digit Customer ID.";
        errorMessage.style.color = "red";
    }
}

function validateFormUPI() {
    var upiId = document.getElementById("UPIID").value;
    var errorMessage = document.getElementById("UPIIDError");
    
    var upiPattern = /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/;
    
    if (upiPattern.test(upiId)) {
        errorMessage.textContent = "";
        alert("Form submitted successfully!");
    } else {
        errorMessage.textContent = "Please enter a valid UPI ID (e.g., example@bank).";
        errorMessage.style.color = "red";
    }
}

















document.addEventListener("DOMContentLoaded", function () {
    updateOrder();

    document.querySelectorAll(".product-quantity").forEach(select => {
        select.addEventListener("change", updateOrder);
    });

    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            removeItem(this);
        });
    });

    document.querySelectorAll(".accordian-toggle").forEach(accordion => {
        accordion.addEventListener("click", function (event) {
            event.preventDefault();
            
            updatePaymentButton();

            toggleAccordionContent(accordion);
        });
    });
});

function updateOrder() {
    const orderItems = document.querySelectorAll("#orderItems .products");
    let subtotal = 0;
    let totalSavings = 0;
    const deliveryCharge = 10;

    orderItems.forEach(item => {
        const priceElement = item.querySelector(".product-price");
        const quantityElement = item.querySelector(".product-quantity");
        const savedElement = item.querySelector(".saved-amount");

        const originalPrice = parseFloat(priceElement.getAttribute("data-price"));
        const quantity = parseInt(quantityElement.value);
        const itemTotal = originalPrice * quantity;
        const savings = quantity * 1;

        priceElement.textContent = `$${itemTotal.toFixed(2)}`;

        savedElement.textContent = `You have saved $${savings.toFixed(2)}`;

        subtotal += itemTotal;

        totalSavings += savings;
    });

    const finalSubtotal = subtotal - totalSavings;
    const totalPayment = finalSubtotal + deliveryCharge;

    document.getElementById("totalPayment").textContent = `$${totalPayment.toFixed(2)}`;

    updatePaymentButton();
}

function updatePaymentButton() {
    const totalPayment = parseFloat(document.getElementById("totalPayment").textContent.replace('$', ''));

    document.querySelectorAll(".accordion-radio").forEach(radio => {
        const paymentButton = radio.closest("li").querySelector(".payment_btn");
        if (paymentButton) {
            paymentButton.textContent = `Pay $${totalPayment.toFixed(2)}`;
        }
    });
}

function toggleAccordionContent(accordion) {
    const content = accordion.nextElementSibling;

    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        document.querySelectorAll(".form").forEach(form => {
            form.style.display = "none";
        });

        content.style.display = "block";
    }
}

function removeItem(element) {
    const productItem = element.closest(".products");
    productItem.remove();
    updateOrder();
}




















$(document).ready(function () {
    // Default addresses array
    let addresses = [
        '123 Main St, Springfield, IL, USA, 62701',
        '456 Elm St, Springfield, IL, USA, 62702'
    ];

    // Function to render addresses
    function renderAddresses() {
        // Clear current address listings
        $('.modal-body .row').empty();
        addresses.forEach(function (address) {
            addAddressToList(address);
        });
    }

    // Function to add a new address to the modal
    function addAddressToList(address) {
        var newAddressHtml = `
            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                <div class="adress_setting">
                    <p>${address}</p>
                    <form>
                        <label><input type="checkbox" name="billingAddress" class="billingCheckbox" data-address="${address}"> Set Billing Address</label>
                        <label><input type="checkbox" name="shippingAddress" class="shippingCheckbox" data-address="${address}"> Set Shipping Address</label>
                    </form>
                </div>
            </div>
        `;
        $('.modal-body .row').append(newAddressHtml);
    }

    renderAddresses();

    $('.add_address_form').on('submit', function (e) {
        e.preventDefault();

        var flatNumber = $('input[name="flatNumber"]').val();
        var streetName = $('input[name="streetName"]').val();
        var city = $('input[name="city"]').val();
        var country = $('input[name="country"]').val();
        var zipCode = $('input[name="zipCode"]').val();

        var fullAddress = flatNumber + ', ' + streetName + ', ' + city + ', ' + country + ', ' + zipCode;

        addresses.push(fullAddress);

        renderAddresses();

        $('.add_address_form').trigger('reset');
    });

    $('.set-address-btn').on('click', function () {
        
        var selectedBillingAddresses = [];
        $('input.billingCheckbox:checked').each(function () {
            selectedBillingAddresses.push($(this).data('address'));
        });

        var selectedShippingAddresses = [];
        $('input.shippingCheckbox:checked').each(function () {
            selectedShippingAddresses.push($(this).data('address'));
        });

        if (selectedBillingAddresses.length > 0) {
            $('.billing-address .address-content').text(selectedBillingAddresses.join('; '));
        } else {
            $('.billing-address .address-content').text("No billing address set.");
        }

        if (selectedShippingAddresses.length > 0) {
            $('.shipping-address .address-content').text(selectedShippingAddresses.join('; '));
        } else {
            $('.shipping-address .address-content').text("No shipping address set.");
        }

        $('#exampleModalToggle').modal('hide');
    });
});








