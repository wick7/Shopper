var express = require("express");
var app = express();
var path = require("path")
var http = require("http");
var fs = require("fs");
// var cartData = require("./data/cartData");



// var PORT = 3030;
const port = process.env.PORT || 8080


//app.use(express.static('public')); // this wont work
app.use(express.static('views'));

app.use('/views', express.static(__dirname + '/views'));



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");
var Handlebars = require("handlebars")
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var mysql = require("mysql");

var connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "Root@2019@",
    database: "store"

});

connection.connect(function (err) {
    if (err) {
        console.log("1", err);
        return;
    }
    console.log("connected as id " + connection.threadId);
});




app.get("/", function (req, res) {
    // console.log("something")
    // res.send("hi")
    connection.query("SELECT * FROM merchant3;", function (err, data1) {
        connection.query("SELECT * FROM cart;", function (err, data2) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }

      
        var total = 0;
        var totalStock = 0;
        var final = []
        

        for(var i of data2) {
            total += i.stock_quantity * i.price
            totalStock += i.stock_quantity
        }

        // data2.push({total: total})
        final.push({total: total, stockT: totalStock})
        // console.log(final[0].stockT)

        res.render("index",  {
            merchant3: data1,
            cart: data2,
            totals: final
        });
    });
});

});

app.get("/cartData", function (req, res) {
    // console.log("something")
    // res.send("hi")
    connection.query("SELECT * FROM cart;", function (err, data) {
        
        if (err) {
            console.log(err);
            return res.status(500).end();
        }

      
        var total = 0;
        var totalStock = 0;
        var final = [];
        var indTotal = []; 
     

        for(var i of data) {
            total += i.stock_quantity * i.price // price total of all items
            totalStock += i.stock_quantity // stock total of all items
            indTotal.push(i.stock_quantity * i.price)
        }

        // data2.push({total: total})
        final.push({total: total, stockT: totalStock, itemT: indTotal})
        

        res.json({
            cart: data,
            totals: final
        });
    });

});

app.get("/:searched", function (req, res) {

  connection.query("SELECT * FROM merchant3 WHERE product_name = ?", [req.params.searched], function (err, data1) {
    connection.query("SELECT * FROM merchant3;", 
    function (err, data2) {
      if (err) {
          console.log(err);
          return res.status(500).end();
      }

      
      console.log("this one " + req.params.searched)

   
      res.render("item", {
          items: data1,
          others: data2
      });
  });
});

});



app.get("/purchase/cart", function (req, res) {
    connection.query("SELECT * FROM cart;", function (err, data) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }

      
        var total = 0;
        var totalStock = 0;
        var final = [];
        var indTotal = []; 
     

        for(var i of data) {
            console.log(i)
            total += i.stock_quantity * i.price // price total of all items
            totalStock += i.stock_quantity // stock total of all items
            i['itemT'] = i.stock_quantity * i.price;
        }

     
        final.push({total: total, stockT: totalStock})
        console.log(data)
        res.render("cart",  {
            cart: data,
            totals: final
        });
    });
});

app.get("/purchase/products", function (req, res) {
    connection.query("SELECT * FROM merchant3;", 
    function (err, data) {
      if (err) {
          console.log(err);
          return res.status(500).end();
      }
   
      res.render("product", {
          items: data
      });
  });
    
});


app.post("/add/cart", function(req, res) {
    console.log(req.body.name, req.body.stock)

    connection.query("SELECT * FROM cart WHERE product_name=(?);", [req.body.name], function (err, data) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }

        console.log(data)
        //If data is = 0 that means the item that just came in doesnt exist in the cart table, if it does, we adjust the stock.
        if(data.length <= 0) {
            connection.query("INSERT INTO cart (product_name, price, stock_quantity,photolink) VALUES (?, ?, ?, ?) ", [req.body.name, req.body.price, req.body.stock, req.body.photo ], function (err, data) {
        
                if (err) {
                    console.log(err);
                    console.log(data)
                    return res.status(500).end();
                }
                
            });
        }else {
            connection.query("UPDATE cart SET stock_quantity= stock_quantity + (?) WHERE product_name=(?)", [req.body.stock, req.body.name], function (err, data) {
        
                if (err) {
                    console.log(err);
                    console.log(data)
                    return res.status(500).end();
                }
                
            });
        }
    });
});

app.post("/update/cartStock", function(req, res) {
    console.log(req.body.name, req.body.stock)

    connection.query("SELECT * FROM cart WHERE product_name=(?);", [req.body.name], function (err, data) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }

        console.log(data)
        //If data is = 0 that means the item that just came in doesnt exist in the cart table, if it does, we adjust the stock.
        if(data.length <= 0) {
            connection.query("INSERT INTO cart (product_name, price, stock_quantity,photolink) VALUES (?, ?, ?, ?) ", [req.body.name, req.body.price, req.body.stock, req.body.photo ], function (err, data) {
        
                if (err) {
                    console.log(err);
                    console.log(data)
                    return res.status(500).end();
                }
                
            });
        }else {
            connection.query("UPDATE cart SET stock_quantity= (?) WHERE product_name=(?)", [req.body.stock, req.body.name], function (err, data) {
        
                if (err) {
                    console.log(err);
                    console.log(data)
                    return res.status(500).end();
                }
                
                
            });
        }
    });
});


app.put("/delete/cart", function(req, res) {
    console.log(req.body.name)
    connection.query("DELETE FROM cart WHERE id = (?)", [req.body.name], function(err, result) {
        if (err) {
          // If an error occurred, send a generic server failure
          return res.status(500).end();
        }
        else if (result.affectedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        res.status(200).end();
    });
});

app.put("/delete/cartStock", function(req, res) {
    console.log(req.body.name)
    connection.query("DELETE FROM cart WHERE id = (?)", [req.body.name], function(err, result) {
        if (err) {
          // If an error occurred, send a generic server failure
          return res.status(500).end();
        }
        else if (result.affectedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        res.status(200).end();
    
    });
});

app.get("/purchase/checkout", function (req, res) {
   
    //  connection.query("UPDATE cart SET stock_quantity= (?) WHERE product_name=(?)", [req.body.stock, req.body.name], function (err, data1) {
        
    //          if (err) {
    //              console.log(err);
    //             return res.status(500).end();
    //         }
            
    //  });

    res.render("checkout"); 


});

Handlebars.registerHelper('grouped_each', function(every, context, options) {
    var out = "", subcontext = [], i;
    if (context && context.length > 0) {
        for (i = 0; i < context.length; i++) {
            if (i > 0 && i % every === 0) {
                out += options.fn(subcontext);
                subcontext = [];
            }
            subcontext.push(context[i]);
        }
        out += options.fn(subcontext);
    }
    return out;
});



app.listen(port, function () {
    console.log("Server listening on PORT: " + port)
});