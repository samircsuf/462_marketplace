var Provider = require('../models/provider')

module.exports = function(req, res) {
    Provider.findById(req.params.id, function(err, provider) {
        if (err) {
            res.status(500).send(err);
        } else {
            //Update each attribute with any possible attribute that may have been submited
            //If that attribute isn't in the request body, default back to whatever it was.
            provider.first_name = req.body.firstName || provider.first_name;
            provider.last_name = req.body.lastName || provider.last_name;
            provider.organization = req.body.org || provider.organization;
            provider.last_name = req.body.last_name || provider.last_name;
            provider.radius = req.body.radius || provider.radius;
            $currentDate: { modified: true };
            //update contact information if changed
            prvoider.contact.address = req.body.streetAddress || provider.contact.address;
            provider.contact.phone = req.body.tel || provider.contact.phone;
            provider.contact.email = req.body.email || provider.contact.email;
            provider.contact.zip = req.body.zip || provider.contact.zip;
            provider.contact.state = req.body.state || provider.contact.state;

            //Save the updated document back to the database
            provider.save(function(err, provider) {
                if (err) {
                    res.status(500).send(err);
                }
                res.send(provider);
            });
        }
    });
};