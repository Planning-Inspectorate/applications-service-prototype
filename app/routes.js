//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
const govukPrototypeKit = require('govuk-prototype-kit')

const {applyAzureHostingFix} = require('./azure-hosting-fix');
applyAzureHostingFix();


const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// Logging session data 
router.use((req, res, next) => { 
    const log = { 
        method: req.method, 
        url: req.originalUrl, 
        data: req.session.data 
    } 
    console.log(JSON.stringify(log, null, 2)) 
   
    next() 
})

// Redaction journey
router.post('/upload_amends', function(req, res) {
    if (req.session.data['redactionscorrect'] == 'ready') {
        res.redirect('/BackOffice/ProjectDocumentation/airedaction/4a');
    } else {
        res.redirect('/BackOffice/ProjectDocumentation/airedaction/upload_amends');
    }
});

// relevant representation status
router.post('/RelRep_status', function(req, res) {
    if (req.session.data['RelRep-status'] == 'invalid') {
        res.redirect('/BackOffice/ProjectDocumentation/rel-reps/RelRep_status_invalid');
    }
    else if (req.session.data['RelRep-status'] == 'referred') {
        res.redirect('/BackOffice/ProjectDocumentation/rel-reps/RelRep_status_referred');
    }
    else if (req.session.data['RelRep-status'] == 'awaiting-review') {
        res.redirect('/BackOffice/ProjectDocumentation/rel-reps/RelRep_status_awaiting');
    }
    else if (req.session.data['RelRep-status'] == 'withdrawn') {
        res.redirect('/BackOffice/ProjectDocumentation/rel-reps/RelRep_status_withdrawn');
    }
    else {
        res.redirect('/BackOffice/ProjectDocumentation/rel-reps/RelRep_details');
    }
    //console.log(req.session.data);
});