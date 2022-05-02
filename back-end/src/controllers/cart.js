const Cart = require('../models/cart')

exports.addItemsTocart = function(req ,res){
    
    Cart.findOne({user: req.user._id} , function(err , cart){
        if(err) {
            res.send(err);
        } else if (cart) {

            const itemExist = cart.cartItem.find(c => c.product === req.body.cartItem.product);
            if(itemExist)
            {
                Cart.findOneAndUpdate({'user' : req.user._id , 'cartItem.product' : req.body.cartItem.product} , {
                        '$set' : {
                            'cartItem.$' : {
                                ...req.body.cartItem,
                                quantity : itemExist.quantity + req.body.cartItem.quantity
                            }
                        }
                    } , (err , _cart) => {
                    if(err) {
                        res.send(err);
                    } else {
                        res.send(_cart);
                    }
                });

            } else {
                Cart.findOneAndUpdate({user : req.user._id} , {'$push' : {'cartItem' : req.body.cartItem}} , (err , _cart) => {
                    if(err) {
                        res.send(err);
                    } else {
                        res.send(_cart);
                    }
                });
            } 


        } else {
            //if not exist
            const _cart = new Cart({
                user : req.user._id,
                cartItem : [req.body.cartItem]
            });
        
            _cart.save(function(err , __cart){
                if(err) {
                    res.send(err);
                } else if(__cart) {
                    res.send(__cart);
                }
            });
        }
    })

}

