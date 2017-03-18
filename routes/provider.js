var express = require('express');
var Provider = require('../models/provider')

app.put('/profile/:id', function(req, res) {
    Provider.findById(req.params.id, function(err, provider) {
        if (err) {
            res.status(500).send(err);
        } else {
            //Update each attribute with any possible attribute that may have been submited
            //If that attribute isn't in the request body, default back to whatever it was.
            provider.first_name = req.body.first_name || provider.first_name;
            provider.last_name = req.body.last_name || provider.last_name;
            provider.organization = req.body.organization || provider.organization;
            provider.contractorID = req.body.contractorID || provider.contractorID;
            provider.last_name = req.body.last_name || provider.last_name;
            provider.radius = req.body.radius || provider.radius;
            $currentDate: { modified: true };
            //update contact information if changed
            provider.contact.phone = req.body.phone || provider.contact.phone;
            provider.contact.email = req.body.email || provider.contact.email;
            provider.contact.zip = req.body.zip || provider.contact.zip;
            provider.contact.state = req.body.state || provider.contact.state;
            //Not sure how to implement updating "services"


            //Save the updated document back to the database
            provider.save(function(err, provider) {
                if (err) {
                    res.status(500).send(err);
                }
                res.send(provider);
            });
        }
    });
});