const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./product");
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

const productData = [];

//mongoose bağlantı 

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://mucomarley:admin123@cluster0.rtxhydr.mongodb.net/flutter", (error) => {
    if (!error) {
        console.log("mongo db bağlandı");
        //post api 

        app.post("/api/add_product", async (req, res) => {
            console.log("result", req.body);

            let data = Product(req.body);
            try {
                let dataToStore = await data.save();
                res.status(200).json(dataToStore);
            } catch (error) {
                res.status(400).json({
                    'status': error.message
                })
            }
            //        const pdata = {
            //          'id': productData.length + 1,
            ///        'pname': req.body.pname,
            //     'pprice': req.body.pprice,
            //          'pdesc': req.body.pdesc
            //    };
            //
            //          productData.push(pdata);
            //
            //         res.status(200).send({
            ///           'status': "basarili",
            ///        'message': "Ürün ekleme başarili.",
            // });
        })

        //get api 

        app.get("/api/get_product/", async (req, res) => {

            try {
                let data = await Product.find();
                res.status(200).json(data);
            } catch (error) {
                res.status(500).json(error.message)
            }


            //           if (productData.length > 0) {
            //             res.status(200).send({
            //               'status_code': 200,
            //             'products': productData
            //       });
            // } else {
            //   res.status(200).send({
            //     'status_code': 200,
            //   'products': []
            // });
            // }
        })

        // update api

        app.patch("/api/update/:id", async (req, res) => {

            let id = req.params.id;
            let UpdatedData = req.body;
            let options = { new: true };

            try {
                const data = await Product.findByIdAndUpdate(id, UpdatedData, options);
                res.send(data);
            } catch(error) {
                res.send(error.message);
            }


            //let id = req.params.id * 1;
            //let productToUpdate = productData.find(p => p.id === id);
            //let index = productData.indexOf(productToUpdate);

            //productData[index] = req.body;

            //res.status(200).send({
            //'status': "basarili",
            //'message': "ürün güncellendi"
            //})
        })

        //delete api 

        app.post("/api/delete/:id", async (req, res) => {

            let id = req.params.id;
            try {
                const data = await Product.findByIdAndDelete(id);
                res.json({
                    'status': 'ürün silidi. ${pname}'
                });
            } catch (error) {
                res.json(error.message);
            }

            //let id = req.params.id * 1;
            //let productToUpdate = productData.find(p => p.id === id);
            //let index = productData.indexOf(productToUpdate);

            //productData.splice(index, 1);
            //res.status(204).send({
              //  'status': 'basarili',
              //  'message': 'Ürün Silindi'
            //});

        })
    }


})


app.listen(2000, () => {
    console.log("bağlandı sağlandı...");
})

