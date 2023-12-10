const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/moneyTrackerDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a transaction schema
const transactionSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    type: String
});

const Transaction = mongoose.model('Transaction', transactionSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    // Fetch all transactions from the database
    Transaction.find({}, (err, transactions) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index.ejs', { transactions: transactions });
        }
    });
});

app.post('/add', (req, res) => {
    const newTransaction = new Transaction({
        description: req.body.description,
        amount: req.body.amount,
        type: req.body.type
    });

    // Save the new transaction to the database
    newTransaction.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const transactionSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    type: String,
    date: { type: Date, default: Date.now }
});
