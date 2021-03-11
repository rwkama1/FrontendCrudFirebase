'use strict';
var express = require('express');
var DProduct=require("crudfirebase/dproduct").DProduct;
var Product=require("crudfirebase/dproduct").Product;
var router = express.Router();

/* GET home page. */
router.get('/',async  function (req, res) {
    try
    {
        var listproduct=await DProduct.getInstance().listproducts();
        res.render('index',{ products:listproduct});
    }
    catch(error)
    {
        res.render('index', { errorm: error.toString()});
    } 
    // res.render('index', { title: 'APICrudFirebase' });
});
router.post('/addProduct',async  function (req, res) {
    try
    {
        var aproduct=new Product(req.body.barcode, req.body.name,req.body.price);
        var adproduct=await DProduct.getInstance().addProduct(aproduct);
        res.redirect(req.get('referer'));
    }
    catch(error)
    {
        res.render('index', { errorm: error.toString()});
    } 
    // res.render('index', { title: 'APICrudFirebase' });
});
router.get('/getProduct/(:barcode)', async function (req, res) {
    try
    {
        // var aproduct=new Product(req.body.barcode, req.body.name,req.body.price);
        var getp=await DProduct.getInstance().getproduct(req.params.barcode);
        console.log(getp);
        res.render('detailproduct',{product: getp});
    }
    catch(error)
    {
        res.render('detailproduct', { errorm: error.toString()});
    } 
});
router.post('/updateProduct',async function (req, res) {
    try
    {
        var aproduct=new Product(req.body.barcode, req.body.name,req.body.price);
        var adproduct=await DProduct.getInstance().updateProduct(aproduct);
        res.redirect('/');
    }
    catch(error)
    {
        res.render('index', { errorm: error.toString()});
    } 
    // res.render('index', { title: 'APICrudFirebase' });
});
router.get('/deleteProduct/(:barcode)',async function (req, res) {
    try
    {
        var aproduct=new Product(req.params.barcode,"",0);
        var adproduct=await DProduct.getInstance().deleteProduct(aproduct);
        res.redirect('/');
    }
    catch(error)
    {
        res.render('index', { errorm: error.toString()});
    } 
    // res.render('index', { title: 'APICrudFirebase' });
});

module.exports = router;
// .table-responsive
// .table-wrapper
//   .table-title