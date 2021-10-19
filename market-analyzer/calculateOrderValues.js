const locations = require('./locations.json')

function calculateOrderValues(offers, requests) {
    
    const newProfitOrder = {
        Item: {
            Id: offers[0].ItemTypeId,
            Name: "",
            Enchantment: offers[0].EnchantmentLevel,
            Quality: offers[0].QualityLevel
        },
        BuyFrom: {
            Id: offers[0].LocationId,
            Name: locations[offers[0].LocationId]
        },
        SellTo: {
            Id: requests[0].LocationId,
            Name: locations[requests[0].LocationId]
        },
        Quantity: 0,
        TotalBuyPrice: 0,
        TotalSellPrice: 0,
        Profit: 0,
        Orders: {
            BuyFrom: new Set(),
            SellTo: new Set()
        }
    }

    while(true) {
        if (!requests[0].Amount) {            
            requests.shift();
            if (!requests.length) {
                break;
            }
        }

        if (!offers[0].Amount) {
            offers.shift();
            if (!offers.length) {
                break;
            }
        }
        
        if (requests[0].UnitPriceSilver * 0.94 > offers[0].UnitPriceSilver) {
            newProfitOrder.Quantity++;
            newProfitOrder.TotalSellPrice += requests[0].UnitPriceSilver;
            newProfitOrder.TotalBuyPrice += offers[0].UnitPriceSilver;
            newProfitOrder.Orders.SellTo.add(requests[0]._id);
            newProfitOrder.Orders.BuyFrom.add(offers[0]._id);
            offers[0].Amount--;
            requests[0].Amount--;

        }
        else {
            break;
        }

    }

    newProfitOrder.Orders.SellTo = Array.from(newProfitOrder.Orders.SellTo);
    newProfitOrder.Orders.BuyFrom = Array.from(newProfitOrder.Orders.BuyFrom);
    newProfitOrder.TotalSellPrice = Math.ceil(newProfitOrder.TotalSellPrice * 0.94);
    newProfitOrder.Profit = newProfitOrder.TotalSellPrice - newProfitOrder.TotalBuyPrice;
    
    return newProfitOrder;
}

module.exports = { calculateOrderValues }