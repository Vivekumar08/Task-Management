
const mongoose = require('mongoose');
const uri = "mongodb+srv://vivekumar08:vivekumar08@cluster0.pl3z2ee.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", false)
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`connection successful`);
}).catch((err) => console.log(err));
