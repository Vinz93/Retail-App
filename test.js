var assert = require('assert');
var superagent = require('superagent');
var Product = require('./models/product');
var Category = require('./models/category');
var User = require('./models/user');
var app = require('./app');

const APIURL = "http://localhost:3000/";

describe('Mongoose Schemas', function() {

    describe('Product', function() {
        it('has an name field that\'s a required string', function(done) {
            var product = new Product({});

            product.validate(function(err) {
                assert.ok(err);
                assert.equal(err.errors['name'].kind, 'required');
                product.name = 'Iphone 6';
                assert.equal(product.name, 'Iphone 6');
                done();
            });
        });

        it('has an price field with an amount required', function(done) {
            var product = new Product({});

            product.validate(function(err) {
                assert.ok(err);
                assert.equal(err.errors['price.amount'].kind, 'required');
                product.price.amount = 300;
                assert.equal(product.price.amount, 300);
                done();
            });

        });

        it('has an array of photos', function(done) {
            var product = new Product({
                photos: ["https://www.foto1.com", "https://www.foto2.com"]
            });
            product.validate(function (err) {
              assert.ok(err);
              assert.equal(err.errors['photos'],undefined);
              assert.equal(product.photos[0],"https://www.foto1.com");
              assert.equal(product.photos[1],"https://www.foto2.com");
              done();
            })
        });

        it('Price field with an currency required and values "USD","EUR","GBP"', function(done) {
            var product = new Product({});

            product.validate(function(err) {
                assert.ok(err);
                assert.equal(err.errors['price.currency'].kind, 'required');
                product.price.currency = "USD";
                assert.equal(product.price.currency, "USD");

                product.price.currency = "USDD";

                product.validate(function(err) {
                    assert.ok(err);
                    assert.equal(err.errors['price.currency'].kind, 'enum');
                    done();
                });
            });
        });

        it('Can display amount + currencySymbol (Virtual)', function() {
            var product = new Product({
                name: "Iphone 6",
                price: {
                    amount: 300,
                    currency: "USD"
                }
            });
            assert.equal(product.displayPrice, "300 $");
        });

        it('Computed internal field to aproximate the Price in USD (Setter)', function() {
            var product = new Product({
                name: "Iphone 6",
                price: {
                    amount: 300,
                    currency: "USD"
                }
            });
            assert.equal(product.internal.aproximatePriceUSD, 300);
        });

        it('the aproximatePriceUSD change whith the amount and currency (Setter)', function(done) {
            var product = new Product({
                name: "Iphone 6",
                price: {
                    amount: 300,
                    currency: "USD"
                }
            });
            assert.equal(product.internal.aproximatePriceUSD, 300);
            product.price.amount = 100;
            assert.equal(product.internal.aproximatePriceUSD, 100);
            product.price.currency = "EUR";
            assert.equal(product.internal.aproximatePriceUSD, 110.00);
            done();

        });

        it('The product has a field category = Category Schema', function(done) {
            Product.findOne({
                    _id: 1
                })
                .exec(function(err, product) {
                    assert.ifError(err);
                    assert.equal(product.category._id, "Notebooks");
                    assert.equal(product.category.ancestors[0], "Electronics");
                    assert.equal(product.category.ancestors[1], "Laptops");
                    done();
                });
        });

        it('The product has reference to other categories by category field (populate)', function(done) {
            Product.findOne({
                    _id: 1
                })
                .populate("category.parent")
                .exec(function(err, product) {
                    assert.ifError(err);
                    assert.equal(product.category._id, "Notebooks");
                    assert.equal(product.category.parent.parent, "Electronics");
                    assert.equal(product.category.parent.ancestors.length, 1);
                    done();
                });
        });

    });

    describe('Category', function() {
        it('has a String field _id required ', function(done) {
            var electronics = new Category({});
            electronics.validate(function(err) {
                assert.ok(err);
                assert.equal(err.errors['_id'].kind, 'required');
                electronics._id = "Electronics";
                assert.equal(electronics._id, "Electronics");
                done();
            });
        });
        it('A Category has reference to other Category by field parent', function() {
            Category.findOne({
                    _id: "Gamer Laptops"
                })
                .populate("parent")
                .exec(function(err, category) {
                    if (err) throw err;
                    assert.equal(category.parent.parent, "Electronics");
                });
        });
        it('A Category has reference to other Categories by field Ancestors []', function(done) {

            Category.findOne({
                    _id: "Gamer Laptops"
                })
                .populate("ancestors")
                .exec(function(err, category) {
                    if (err) throw err;
                    // Gamer category
                    assert.equal(category.ancestors.length, 2);
                    assert.equal(category.ancestors[1]._id, "Laptops");
                    assert.equal(category.ancestors[0]._id, "Electronics");
                    //Laptops category via populate
                    assert.equal(category.ancestors[1].ancestors.length, 1);
                    assert.equal(category.ancestors[1].parent, "Electronics");
                    assert.equal(category.ancestors[1].ancestors[0], "Electronics");
                    done();
                });
        });


    });
    describe("User", function() {
        it("User _id , picture and data.oauth are required", function(done) {
            var user = new User({});
            user.validate(function(err) {
                assert.ok(err);
                assert.equal(err.errors["picture"].kind, "required");
                assert.equal(err.errors["data.oauth"].kind, "required");
                done();
            })
        });

    })
    before(function() {
        //nota : no hace falta conectar a mongo, porque ./app.js
        // ya hace una conexion.
        // mongoose.connect('mongodb://localhost:27017/movies');

        // Reomoving all the collections from the db
        Category.remove({}, function(err) {
            if (err) throw err;
        });
        Product.remove({}, function(err) {
            if (err) throw err;
        });

        var categories = [{
            _id: "Electronics"
        }, {
            _id: "Laptops",
            parent: "Electronics",
            ancestors: ["Electronics"]
        }, {
            _id: "Phones",
            parent: "Electronics",
            ancestors: ["Electronics"]
        }, {
            _id: "Gamer Laptops",
            parent: "Laptops",
            ancestors: ["Electronics", "Laptops"]
        }, {
            _id: "Notebooks",
            parent: "Laptops",
            ancestors: ["Electronics", "Laptops"]
        }];
        var products = [{
            _id: 1,
            name: "Asus Vivo Book",
            price: {
                amount: 500,
                currency: "USD"
            },
            category: {
                _id: "Notebooks",
                parent: "Laptops",
                ancestors: ["Electronics", "Laptops"]
            }
        }, {
            _id: 2,
            name: "Moto G4",
            price: {
                amount: 300,
                currency: "USD"
            },
            category: {
                _id: "Phones",
                parent: "Electronics",
                ancestors: ["Electronics"]
            }
        }];
        Category.create(categories, function(err) {
            if (err) throw err;
        });
        Product.create(products, function(err) {
            if (err) throw err;
        });
    });

});
describe("API", function() {
    describe("Categories", function() {
        it("/categories/:id loads the detail of a category", function(done) {
            superagent.get(APIURL + "categories/Notebooks", function(err, res) {
                assert.ifError(err);
                var category = JSON.parse(res.text);
                assert.equal(category._id, "Notebooks");
                done();
            });
        });
        it("/categories/parents/:id return child categories sorted", function(done) {
            superagent.get(APIURL + "categories/parent/Laptops", function(err, res) {
                assert.ifError(err);
                var categories = JSON.parse(res.text);
                assert.equal(categories.length, 2);
                assert.equal(categories[0]._id, "Gamer Laptops");
                assert.equal(categories[1]._id, "Notebooks");
                done();
            });
        });
    });
    describe("Products", function() {

        it("/products/:id loads the detail of a product", function(done) {
            superagent.get(APIURL + "products/1", function(err, res) {
                assert.ifError(err);
                var product = JSON.parse(res.text);
                assert.equal(product.name, "Asus Vivo Book");
                assert.equal(product.category._id, "Notebooks");
                done();
            });
        });

        it("/products/category/:id loads all products in a category with subcategories", function(done) {
            superagent.get(APIURL + "products/category/Electronics", function(err, res) {
                assert.ifError(err);
                var products = JSON.parse(res.text);
                assert.equal(products.length, 2);
                assert.equal(products[0].name, "Asus Vivo Book");
                assert.equal(products[1].name, "Moto G4");
                superagent.get(APIURL + "products/category/Electronics?price=1", function(err, res) {
                    assert.ifError(err);
                    var products = JSON.parse(res.text);
                    assert.equal(products.length, 2);
                    assert.equal(products[0].name, "Moto G4");
                    assert.equal(products[1].name, "Asus Vivo Book");
                    superagent.get(APIURL + "products/category/Electronics?price=-1", function(err, res) {
                        assert.ifError(err);
                        var products = JSON.parse(res.text);
                        assert.equal(products.length, 2);
                        assert.equal(products[0].name, "Asus Vivo Book");
                        assert.equal(products[1].name, "Moto G4");
                        done();
                    });
                });
            });
        });
    });
    describe('User', function() {
        it('/users/me loads the user information', function(done) {
            superagent.get(APIURL + "users/me", function(err, res) {
                assert.ifError(err);
                done();
            });
        });
    });
    before(function() {
        //start the api
        app.listen(3000);
        // Reomoving all the collections from the db
        Category.remove({}, function(err) {
            if (err) throw err;
        });
        Product.remove({}, function(err) {
            if (err) throw err;
        });

        var categories = [{
            _id: "Electronics"
        }, {
            _id: "Laptops",
            parent: "Electronics",
            ancestors: ["Electronics", "Laptops"]
        }, {
            _id: "Phones",
            parent: "Electronics",
            ancestors: ["Electronics", "Phones"]
        }, {
            _id: "Gamer Laptops",
            parent: "Laptops",
            ancestors: ["Electronics", "Laptops", "Gamer Laptops"]
        }, {
            _id: "Notebooks",
            parent: "Laptops",
            ancestors: ["Electronics", "Laptops", "Notebooks"]
        }];
        var products = [{
            _id: 1,
            name: "Asus Vivo Book",
            price: {
                amount: 500,
                currency: "USD"
            },
            category: {
                _id: "Notebooks",
                parent: "Laptops",
                ancestors: ["Electronics", "Laptops", "Notebooks"]
            }
        }, {
            _id: 2,
            name: "Moto G4",
            price: {
                amount: 300,
                currency: "USD"
            },
            category: {
                _id: "Phones",
                parent: "Electronics",
                ancestors: ["Electronics", "Phones"]
            }
        }];
        Category.create(categories, function(err) {
            if (err) throw err;
        });
        Product.create(products, function(err) {
            if (err) throw err;
        });
    });
});
