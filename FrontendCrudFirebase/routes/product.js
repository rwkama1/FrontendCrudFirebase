'use strict';
var express = require('express');
var DProduct=require("crudfirebase/dproduct").DProduct;
var Product=require("crudfirebase/dproduct").Product;
var router = express.Router();

/* GETS */

router.get('/', async function (req, res) {
    try
    {
        var listproduct=await DProduct.getInstance().listproducts();
        res.send(listproduct);
    }
    catch(error)
    {
         res.status(400).send(error.toString());
    }
  
});
router.get('/getProduct/(:barcode)', async function (req, res) {
    try
    {
        var getp=await DProduct.getInstance().getproduct(req.params.barcode);
        res.send(getp);
    }
    catch(error)
    {
         res.status(400).send(error.toString());
    }
  
});
router.get('/listproductsexp', async function (req, res) {
    try
    {
        
        var listpx=await DProduct.getInstance().listproductsexpression(req.body.name);
        res.send(listpx);
        
    }
    catch(error)
    {
         res.status(400).send(error.toString());
    }
  
});
//************************************************************/

router.post('/addProduct', async function (req, res) {
    try
    {
        var aproduct=new Product(req.body.barcode, req.body.name,req.body.price);
        var adproduct=await DProduct.getInstance().addProduct(aproduct);
        res.send("Product added");

    }
    catch(error)
    {
         res.status(400).send(error.toString());
    }
  
});
router.delete('/deleteProduct', async function (req, res) {
    try
    {
        var dproduct=new Product(req.body.barcode,"",0);
        var delproduct=await DProduct.getInstance().deleteProduct(dproduct);
        res.send("Product deleted");
        
    }
    catch(error)
    {
         res.status(400).send(error.toString());
    }
  
});
router.put('/updateProduct', async function (req, res) {
    try
    {
        var uprod=new Product(req.body.barcode, req.body.name,req.body.price);
        var updproduct=await DProduct.getInstance().updateProduct(uprod);
        res.send("Product updated");
        
    }
    catch(error)
    {
         res.status(400).send(error.toString());
    }
  
});

module.exports = router;