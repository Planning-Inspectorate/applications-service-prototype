//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
const govukPrototypeKit = require('govuk-prototype-kit')

const {applyAzureHostingFix} = require('./azure-hosting-fix');
applyAzureHostingFix();


const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// Redaction journey
router.post('/upload_amends', function(req, res) {
    if (req.session.data['redactionscorrect'] == 'yes') {
        res.redirect('/ProjectDocumentation/airedaction/4a');
    } else {
        res.redirect('/ProjectDocumentation/airedaction/upload_amends');
    }
});