CREATE TABLE ShippingAddresses (
    id SERIAL PRIMARY KEY,                -- Primary key, auto-incremented
    user_id INTEGER NOT NULL,             -- Foreign key for user, if applicable
    fname VARCHAR(255) NOT NULL,          -- First name for shipping
    lname VARCHAR(255) NOT NULL,          -- Last name for shipping
    email VARCHAR(255),                   -- Email address for shipping (optional)
    phone VARCHAR(20),                    -- Phone number for shipping
    address TEXT NOT NULL,                -- Full address (optional)
    street VARCHAR(255),                  -- Street name
    country VARCHAR(255) NOT NULL,        -- Country
    city VARCHAR(255) NOT NULL,           -- City
    state VARCHAR(255),                   -- State
    zipcode VARCHAR(20),                 -- Zip code
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Creation timestamp
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Update timestamp

    FOREIGN KEY (user_id) REFERENCES Users(id) -- Foreign key reference to Users table
);

-- Orders Table
CREATE TABLE Orders (
    id SERIAL PRIMARY KEY,                -- Primary key, auto-incremented
    user_id INTEGER NOT NULL,             -- Foreign key for user
    subtotal DECIMAL(10, 2) NOT NULL,     -- Subtotal with 2 decimal places
    total DECIMAL(10, 2) NOT NULL,        -- Total amount with 2 decimal places
    delivery_fee VARCHAR(255),            -- Delivery fee (optional)
    payment_mode VARCHAR(10) NOT NULL,    -- Payment mode (e.g., 'cod', 'online')
    payment_status VARCHAR(10) DEFAULT 'pending', -- Payment status with default value
    status VARCHAR(20) DEFAULT 'pending', -- Order status with default value
    comment TEXT,                         -- Additional comments (optional)
    shipping_address_id INTEGER,          -- Foreign key reference to ShippingAddresses
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Creation timestamp
    processed_at TIMESTAMP,               -- Processed timestamp (optional)
    delivered_at TIMESTAMP,              -- Delivered timestamp (optional)
    returned_at TIMESTAMP,               -- Returned timestamp (optional)
    cancelled_at TIMESTAMP,              -- Cancelled timestamp (optional)
    paused_at TIMESTAMP,                 -- Paused timestamp (optional)

    FOREIGN KEY (user_id) REFERENCES Users(id), -- Foreign key reference to Users table
    FOREIGN KEY (shipping_address_id) REFERENCES ShippingAddresses(id) -- Foreign key reference to ShippingAddresses table
);

-- SubOrders Table
CREATE TABLE SubOrders (
    id SERIAL PRIMARY KEY,                -- Primary key, auto-incremented
    order_id INTEGER NOT NULL,            -- Foreign key for order
    vendor_id INTEGER NOT NULL,           -- Foreign key for vendor
    subtotal DECIMAL(10, 2) NOT NULL,     -- Subtotal with 2 decimal places
    taxes DECIMAL(10, 2),                 -- Taxes applied (optional)
    discounts DECIMAL(10, 2),             -- Discounts applied (optional)
    total_amount DECIMAL(10, 2) NOT NULL, -- Total amount with 2 decimal places
    shipping_status VARCHAR(20),          -- Shipping status
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Creation timestamp
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Update timestamp

    FOREIGN KEY (order_id) REFERENCES Orders(id), -- Foreign key reference to Orders table
    FOREIGN KEY (vendor_id) REFERENCES Vendors(id) -- Foreign key reference to Vendors table
);

-- Items Table
CREATE TABLE Items (
    id SERIAL PRIMARY KEY,                -- Primary key, auto-incremented
    suborder_id INTEGER NOT NULL,         -- Foreign key for suborder
    description VARCHAR(255) NOT NULL,    -- Description of the item
    quantity INTEGER NOT NULL,            -- Quantity of the item
    unit_price DECIMAL(10, 2) NOT NULL,   -- Price per unit with 2 decimal places
    total_price DECIMAL(10, 2) NOT NULL,  -- Total price (quantity * unit price)

    FOREIGN KEY (suborder_id) REFERENCES SubOrders(id) -- Foreign key reference to SubOrders table
);