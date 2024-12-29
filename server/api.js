var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");

var conStr = "mongodb://127.0.0.1:27017";

var app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Routes

app.get("/admin",(req, res)=>{

    mongoClient.connect(conStr).then(clientObj =>{

        var database = clientObj.db("videolibrary");
        database.collection("admin").find({}).toArray().then(documents=>{

            res.send(documents);
            res.end();

        });
    });
});


app.get("/videos",(req, res)=>{

    mongoClient.connect(conStr).then(clientObj =>{

        var database = clientObj.db("videolibrary");
        database.collection("videos").find({}).toArray().then(documents=>{

            res.send(documents);
            res.end();

        });
    });
});

app.get("/categories",(req, res)=>{

    mongoClient.connect(conStr).then(clientObj =>{

        var database = clientObj.db("videolibrary");
        database.collection("categories").find({}).toArray().then(documents=>{

            res.send(documents);
            res.end();

        });
    });
});

app.get("/users",(req, res)=>{

    mongoClient.connect(conStr).then(clientObj =>{

        var database = clientObj.db("videolibrary");
        database.collection("users").find({}).toArray().then(documents=>{

            res.send(documents);
            res.end();

        });
    });
});

app.get("/video/:id",(req, res)=>{

    mongoClient.connect(conStr).then(clientObj =>{

        var database = clientObj.db("videolibrary");
        database.collection("videos").find({VideoId:parseInt(req.params.id)}).toArray().then(documents=>{

            res.send(documents);
            res.end();

        });
    });
});


app.get("/videos/:categoryid",(req, res)=>{

    mongoClient.connect(conStr).then(clientObj =>{

        var database = clientObj.db("videolibrary");
        database.collection("videos").find({CategoryId:parseInt(req.params.categoryid)}).toArray().then(documents=>{

            res.send(documents);
            res.end();

        });
    });
});

app.post('/register-user', async (req, res) => {
    try {
        const client = await mongoClient.connect(conStr, { useNewUrlParser: true, useUnifiedTopology: true });
        const database = client.db("videolibrary");

        const lastUser = await database.collection("users").findOne({}, { sort: { UserId: -1 } });
        const newUserId = lastUser ? lastUser.UserId + 1 : 1;

        const newUser = {
            UserId: newUserId,
            UserName: req.body.UserName,
            Password: req.body.Password,
            Email: req.body.Email,
            Mobile: req.body.Mobile
        };

        await database.collection("users").insertOne(newUser);
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send('There was an error registering the user');
    }
});
app.post("/add-video",(req, res)=>{

    var video = {
        VideoId: parseInt(req.body.VideoId),
        Title: req.body.Title,
        Url: req.body.Url,
        Likes: parseInt(req.body.Likes),
        Dislikes: parseInt(req.body.Dislikes),
        Views: parseInt(req.body.Views),
        CategoryId: parseInt(req.body.CategoryId)
    }

    mongoClient.connect(conStr).then(clientObj=>{

        var database = clientObj.db("videolibrary");

        database.collection("videos").insertOne(video).then(()=>{

                console.log('Video Added');
                res.end();
        });
    });
});



app.put("/edit-video/:id",(req, res)=>{

    var video = {
        VideoId: parseInt(req.body.VideoId),
        Title: req.body.Title,
        Url: req.body.Url,
        Likes: parseInt(req.body.Likes),
        Dislikes: parseInt(req.body.Dislikes),
        Views: parseInt(req.body.Views),
        CategoryId: parseInt(req.body.CategoryId)
    }

    mongoClient.connect(conStr).then(clientObj=>{

        var database = clientObj.db("videolibrary");

        database.collection("videos").updateOne({VideoId:parseInt(req.params.id)},{$set:video}).then(()=>{

                console.log('Video Updated');
                res.end();
        });
    });
});

app.delete("/delete-video/:id",(req, res)=>{

    
    mongoClient.connect(conStr).then(clientObj=>{

        var database = clientObj.db("videolibrary");

        database.collection("videos").deleteOne({VideoId:parseInt(req.params.id)}).then(()=>{

                console.log('Video Deleted');
                res.end();
        });
    });
});

app.listen(5000);
console.log(`Server Started http://127.0.0.1:5000`);
