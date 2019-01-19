var express = require("express");
var app = express();
var path = require("path")
var http = require("http");
var fs = require("fs");
// var cartData = require("./data/cartData");



// var PORT = 3030;
const port = process.env.PORT || 8020


app.use(express.static('public')); // this wont work
app.use(express.static('views'));



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");
var Handlebars = require("handlebars")
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var mysql = require("mysql");

var connection = mysql.createConnection({

    host: "aa1jzhhmamar4by.ch3xjofnzimh.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "ctw",
    password: "password",
    database: "store"

});

connection.connect(function (err) {
    if (err) {
        console.log("1", err);
        return;
    }
    console.log("connected as id " + connection.threadId);
});


// // app.get("/", function(req, res) {
// //     res.sendFile(path.join(__dirname, "main.handlears"));
// //   });




app.get("/", function (req, res) {
    // console.log("something")
    // res.send("hi")
    connection.query("SELECT * FROM merchant3;", function (err, data) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }

        

        res.render("index", {
            merchant3: data
        });
    });

    // res.render("index");

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

// app.get("/new/:searched", function (req, res) {

    
//     connection.query("SELECT * FROM merchant3 WHERE product_name = ?", [req.params.searched], function (err, data) {
//         if (err) {
//             console.log(err);
//             return res.status(500).end();
//         }

//         //var hbsObj = {items: data}


//         console.log(data),
//         console.log("this one " + req.params.searched)

//         //res.render("item", {
//           //  items: data
//         //});

//         res.render("item", {
//             items: data
//         });
//     });

// });

// app.get("/api/cart", function(req, res) {
//     res.json(cartData);
//   });

app.get("/cart", function (req, res) {

    res.render("cart")
    
});

// app.post("/api/cart/:id", function(req, res) {
//     console.log(req.params.id)
//     connection.query("SELECT * FROM merchant3 WHERE id = ?", [req.params.id], function (err, data) {
        
//         if (err) {
//             console.log(err);
//             return res.status(500).end();
//         }
        
//         console.log(data[0])
        
//         cartData.push(data[0])

//     });
  
// });

// app.put("/api/delete/cart/:item", function(req, res) {
//     console.log(req.params.item)
//     var itemIndex = req.params.item;
//     cartData.splice(itemIndex,1)
  
// });


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

// app.get('/la', (req, res) => {
//     res.send("yee")
// })

app.listen(port, function () {
    console.log("Server listening on PORT: " + port)
});