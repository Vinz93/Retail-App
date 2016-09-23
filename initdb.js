const assert = require('assert');
var Product = require('./models/product');
var Category = require('./models/category');
var User = require('./models/user');
var app = require('./app');

describe('inserting in db', function() {
    it('categories', function(done) {
      Category.find()
      .exec(function (err,categories) {
        assert.ifError(err);
        assert.equal(categories.length,11);
        done();
      });
    });
    it('products', function(done) {
      Product.find()
      .exec(function (err,products) {
        assert.ifError(err);
        assert.equal(products.length,11);
        done();
      });
    });
    before(function() {
        // Reomoving all the collections from the db
        Category.remove({}, function(err) {
            if (err) throw err;
        });
        Product.remove({}, function(err) {
            if (err) throw err;
        });

        var categories = [{
            _id: "Electronics",
            ancestors: ["Electronics"]
        }, {
            _id: "Laptops",
            parent: "Electronics",
            ancestors: ["Electronics","Laptops"]
        }, {
            _id: "Phones",
            parent: "Electronics",
            ancestors: ["Electronics","Phones"]
        }, {
            _id: "Gamer Laptops",
            parent: "Laptops",
            ancestors: ["Electronics", "Laptops","Gamer Laptops"]
        }, {
            _id: "Notebooks",
            parent: "Laptops",
            ancestors: ["Electronics", "Laptops","Notebooks"]
        }, {
            _id: "Sports",
            ancestors: ["Sports"]
        }, {
            _id: "Longboard",
            parent: "Sports",
            ancestors: ["Sports","Longboard"]
        }, {
            _id: "Surf",
            parent: "Sports",
            ancestors: ["Sports","Surf"]
        }, {
            _id: "Skate",
            parent: "Sports",
            ancestors: ["Sports","Skate"]
        }, {
            _id: "DownHill",
            parent: "Longboard",
            ancestors: ["Sports", "Longboard","DownHill"]
        }, {
            _id: "Freeride",
            parent: "Longboard",
            ancestors: ["Sports", "Longboard","Freeride"]
        }];
        var products = [{
            name: "Asus Vivo Book",
            price: {
                amount: 500,
                currency: "USD"
            },
            photos: ["https://dlcdnimgs.asus.com/websites/global/products/latm32feTKbHlUm8/img/common/response/asus-vivobook.png",
              "http://www.driversfree.org/images/catalog/laptops/asus/asus-vivobook-x202e/asus-vivobook-x202e-6.jpg"],
            category: {
                _id: "Notebooks",
                parent: "Laptops",
                ancestors: ["Electronics", "Laptops","Notebooks"]
            }
        }, {
            name: "Moto G4",
            price: {
                amount: 300,
                currency: "USD"
            },
            photos: ["http://www.motorola.com.mx/sites/default/files/library/storage/products/smartphones/moto-g4-10003b5a6yku.jpg",
          "http://drop.ndtv.com/TECH/product_database/images/517201670004PM_635_moto_g4_plus.jpeg"],
            category: {
                _id: "Phones",
                parent: "Electronics",
                ancestors: ["Electronics","Phones"]
            }
        }, {
            name: "Asus VZen Book",
            price: {
                amount: 600,
                currency: "USD"
            },
            photos:["https://www.bhphotovideo.com/images/images2500x2500/asus_ux501vw_ds71t_15_6_zenbook_pro_multi_touch_1202579.jpg",
          "http://laptoping.com/specs/wp-content/uploads/2015/03/Asus-ZenBook-UX305FA-USM1-Signature-Edition-UX305FA-ASM1-2.jpg"],
            category: {
                _id: "Notebooks",
                parent: "Laptops",
                ancestors: ["Electronics", "Laptops", "Notebooks"]
            }
        }, {
            name: "Huaweii kavak 5' ",
            price: {
                amount: 80.99,
                currency: "USD"
            },
            photos: ["https://images01.olx-st.com/ui/52/27/15/76/o_1470321090_a095468a984a8dd97cba324c967ccd8c.jpg",
          "http://img.clasf.co.ve/2016/03/17/Telfono-Smartphone-HUAWEI-Y635-Nuevo-20160317225503.jpg"],
            category: {
                _id: "Phones",
                parent: "Electronics",
                ancestors: ["Electronics","Phones"]
            }
        }, {
            name: "Iphone 6",
            price: {
                amount: 600.76,
                currency: "USD"
            },
            photos: ["http://store.storeimages.cdn-apple.com/4973/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone6/silver/iphone6-silver-select-2014_GEO_US?wid=470&hei=556&fmt=png-alpha&qlt=95&.v=FYgkD2",
          "http://actualidadwatch.com/wp-content/uploads/2014/07/iphone-6-colores.jpg"],
            category: {
                _id: "Phones",
                parent: "Electronics",
                ancestors: ["Electronics","Phones"]
            }
        }, {
            name: "HTC One X",
            price: {
                amount: 200.00,
                currency: "USD"
            },
            photos:["http://www.htc.com/managed-assets/shared/desktop/smartphones/htc-one-x-plus/features/onexplus-f5-1.png",
          "http://static6.businessinsider.com/image/4fa0114769bedd264500000f/htc-one-x-att.jpg"],
            category: {
                _id: "Phones",
                parent: "Electronics",
                ancestors: ["Electronics"]
            }
        }, {
            name: "Asus Gamer tx",
            price: {
                amount: 1200.81,
                currency: "USD"
            },
            photos: ["https://www.techpowerup.com/img/14-03-12/ASUS_G750_02.jpg",
          "https://i.ytimg.com/vi/6BB9wyFMDqU/maxresdefault.jpg"],
            category: {
                _id: "Gamer Laptops",
                parent: "Laptops",
                ancestors: ["Electronics", "Laptops","Gamer Laptops"]
            }
        }, {
            name: "Arbitrer",
            price: {
                amount: 100,
                currency: "USD"
            },
            photos:["https://www.muirskate.com/photos/products/4896/hd_product_Original-Arbiter-KT_-180mm-Cal.-Black_-70mm-Butterballs-White-(Complete-HD).png",
          "https://stokedskateboards.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/r/arbiter-kt-36-deck-web.jpg"],
            category: {
                _id: "Freeride",
                parent: "Longboard",
                ancestors: ["Sports", "Longboard"]
            }
        }, {
            name: "Powel peralta Byron Essert",
            price: {
                amount: 120.12,
                currency: "USD"
            },
            photos: ["http://skateslate.jp/wp-content/uploads/sites/7/2015/07/1-640x480.jpg",
            "http://www.wheelbasemag.com/wp-content/uploads/2014/03/byron_these.jpg"],
            category: {
                _id: "DownHill",
                parent: "Longboard",
                ancestors: ["Sports", "Longboard"]
            }
        }, {
            name: "Rip Curl x2",
            price: {
                amount: 300.10,
                currency: "USD"
            },
            photos:["http://www.bakio.com/wp-content/uploads/2012/04/quiver_slater_bells_abr_12_11.jpg",
          "http://s391.photobucket.com/user/Baluverxa/media/Kellyquiver.jpg.html"],
            category: {
                _id: "Surf",
                parent: "Sports",
                ancestors: ["Sports"]
            }
        }, {
            name: "Plan B",
            price: {
                amount: 80,
                currency: "USD"
            },
            photos:["http://scene7.zumiez.com/is/image/zumiez/pdp_hero/Plan-B-Pudwill-Nebula-8.0%26quot%3B--Skateboard-Deck-_242904-front.jpg",
          "https://www.sk8board.com/uploads/images/1DPLNPUDSHP82UB.png?w=400&h=400&scale=canvas&404=default"],
            category: {
                _id: "Skate",
                parent: "Sports",
                ancestors: ["Sports"]
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
