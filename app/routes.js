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

// Register to have your say journey
router.post('/03_over18', function(req, res) {
    if (req.session.data['whoFor'] == 'On behalf of another person, a household or an organisation I do not work for') {
        res.redirect('/FrontOffice/rthys/04_orgName');
    } else {
        res.redirect('/FrontOffice/rthys/03_over18');
    }
});

router.post('/04_orgName', function(req, res) {
    if (req.session.data['whoFor'] == 'Myself') {
        res.redirect('/FrontOffice/rthys/05_email');
    } else {
        res.redirect('/FrontOffice/rthys/04_orgName');
    }
});

router.post('/04-1_jobRole', function(req, res) {
    if (req.session.data['whoFor'] == 'An organisation I work or volunteer for') {
        res.redirect('/FrontOffice/rthys/04-1_jobRole');
    } else {
        res.redirect('/FrontOffice/rthys/05_email');
    }
});

router.post('/13_agent-over18', function(req, res) {
    if (req.session.data['agent-whoFor'] == 'An organisation or charity I do not work for') {
        res.redirect('/FrontOffice/rthys/15_agent-email');
    } else {
        res.redirect('/FrontOffice/rthys/13_agent-over18');
    }
});

router.post('/08_comments', function(req, res) {
    if (req.session.data['whoFor'] == 'On behalf of another person, a household or an organisation I do not work for') {
        res.redirect('/FrontOffice/rthys/11_agent-whoFor');
    } else {
        res.redirect('/FrontOffice/rthys/08_comments');
    }
});

// relevant representation status
router.post('/RelRep_status', function(req, res) {
    if (req.session.data['RelRep-status'] == 'invalid') {
        //res.redirect('/BackOffice/ProjectDocumentation/rel-reps/RelRep_status_invalid');
        res.redirect('/BackOffice/ProjectDocumentation/rel-reps/RelRep_rejection_reason');
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
        //res.redirect('/BackOffice/ProjectDocumentation/rel-reps/RelRep_status_valid');
        res.redirect('/BackOffice/ProjectDocumentation/rel-reps/RelRep_notify');
    }
});