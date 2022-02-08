export const cartItemsHandler = (cartItems, newItemToAdd) => {
    const existing = cartItems.find(
        item => item.id === newItemToAdd.id
    )
    if (existing) {
        return cartItems.map(item =>
            item.id === newItemToAdd.id ?
                { ...item, quantity: item.quantity + 1 }
                :
                item
        )
    }
    return [...cartItems, { ...newItemToAdd, quantity: 1 }]
}

export const totalItemsHandler = (cartItems) => {
    let count = 0
    cartItems.forEach(item => {
        count += item.quantity
    })
    return count
}

export const totalPriceHandler = (cartItems) => {
    let total = 0
    cartItems.forEach(item => {
        total += item.price * item.quantity
    })
    return total
}

export const reduceItemQuantityHandler = (cartItems, itemToReduce) => {
    if (itemToReduce.quantity === 1) {
        return cartItems.filter(item => item.id !== itemToReduce.id)
    }
    else {
        return cartItems.map(item =>
            item.id === itemToReduce.id ?
                { ...item, quantity: item.quantity - 1 }
                :
                item
        )
    }
}