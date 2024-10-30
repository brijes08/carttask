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
    const cvv = document.getElementById("cvv").value;

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
        document.getElementById("dateError").innerText = "Select a valid month and year.";
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
    const customerId = document.getElementById("Netbanking").value;
    const errorMessage = document.getElementById("NetbankingError");

    if (/^\d{8}$/.test(customerId)) {
        errorMessage.textContent = "";
        alert("Form submitted successfully!");
    } else {
        errorMessage.textContent = "Please enter a valid 8-digit Customer ID.";
    }
}

function validateFormUPI() {
    const upiId = document.getElementById("UPIID").value;
    const errorMessage = document.getElementById("UPIIDError");

    if (/^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/.test(upiId)) {
        errorMessage.textContent = "";
        alert("Form submitted successfully!");
    } else {
        errorMessage.textContent = "Please enter a valid UPI ID (e.g., example@bank).";
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
});

function updateOrder() {
    const orderItems = document.querySelectorAll("#orderItems .products");
    let subtotal = 0;
    const deliveryCharge = 10;

    orderItems.forEach(item => {
        const priceElement = item.querySelector(".product-price");
        const quantityElement = item.querySelector(".product-quantity");
        const savedElement = item.querySelector(".saved-amount");

        const originalPrice = parseFloat(priceElement.getAttribute("data-price"));
        const quantity = parseInt(quantityElement.value);
        const savings = quantity * 1;
        const adjustedPrice = originalPrice - 1;
        const itemTotal = adjustedPrice * quantity;

        priceElement.textContent = `$${itemTotal.toFixed(2)}`;
        savedElement.textContent = `You have saved ${formatCurrency(savings)}`;

        subtotal += itemTotal;
    });

    const totalPayment = subtotal + deliveryCharge;
    document.getElementById("totalPayment").textContent = formatCurrency(totalPayment);

    updatePaymentButton();
}

function updatePaymentButton() {
    const totalPayment = parseFloat(document.getElementById("totalPayment").textContent.replace('$', ''));

    document.querySelectorAll(".payment_btn").forEach(paymentButton => {
        paymentButton.textContent = `Pay ${formatCurrency(totalPayment)}`;
    });
}

function removeItem(element) {
    const productItem = element.closest(".products");
    productItem.remove();
    updateOrder();
}

function formatCurrency(value) {
    return value % 1 === 0 ? `$${value.toFixed(0)}` : `$${value.toFixed(2)}`;
}















$(document).ready(function () {
    let addresses = [
        '123 Main St, Springfield, IL, USA, 62701',
        '456 Elm St, Springfield, IL, USA, 62702'
    ];

    const renderAddresses = () => {
        $('.modal-body .row').empty();
        addresses.forEach(address => addAddressToList(address));
    };

    const addAddressToList = (address) => {
        $('.modal-body .row').append(`
            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                <div class="adress_setting">
                    <p>${address}</p>
                    <form>
                        <label><input type="checkbox" class="billingCheckbox" data-address="${address}">Set Billing Address</label>
                        <label><input type="checkbox" class="shippingCheckbox" data-address="${address}">Set Shipping Address</label>
                    </form>
                </div>
            </div>
        `);
    };

    $('.add_address_form').on('submit', function (e) {
        e.preventDefault();
        const flatNumber = $('input[name="flatNumber"]').val().trim();
        const streetName = $('input[name="streetName"]').val().trim();
        const city = $('input[name="city"]').val().trim();

        if (!flatNumber || !streetName || !city) return alert('Fill out Flat Number, Street Name, and City.');
        
        addresses.push(`${flatNumber}, ${streetName}, ${city}, ${$('input[name="country"]').val().trim()}, ${$('input[name="zipCode"]').val().trim()}`);
        renderAddresses();
        $(this).trigger('reset');
    });

    $('.set-address-btn').on('click', function () {
        const selectedBilling = $('input.billingCheckbox:checked').map((_, el) => $(el).data('address')).get();
        const selectedShipping = $('input.shippingCheckbox:checked').map((_, el) => $(el).data('address')).get();

        if (!selectedBilling.length) return alert('Select at least one billing address.');
        if (!selectedShipping.length) return alert('Select at least one shipping address.');

        $('.billing-address .address-content').text(selectedBilling.join('; ') || "No billing address set.");
        $('.shipping-address .address-content').text(selectedShipping.join('; ') || "No shipping address set.");

        $('#exampleModalToggle').modal('hide');
    });

    renderAddresses();
});

