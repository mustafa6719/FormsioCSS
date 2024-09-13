(function () {
    // Your current JavaScript code goes here
    let db = null;
    const APP_DB_NAME = 'db_app_1';
    const QUEUED_SUBMISSIONS_STORE_NAME = 'store_queued_submissions'
  
    // All the existing formHelper logic
    var formHelper = (function () {
        // Existing code...
        // All the logic, including load(), submit(), etc.
        var load = async function (elementId, formAdmin, idSet, data, debug) {
            var formPanel = document.getElementById(elementId);
            _formAdmin = formAdmin;
            _idSet = idSet;
            _debugJson = debug;
  
            var endpoint = _formAdmin.authoringEndpoint + '/' + _formAdmin.folderName;
  
            await showSubmissionQueue("", _formAdmin.formIOUniqueId);
  
            Formio.createForm(formPanel, endpoint)
                .then(function (form) {
                    _form = form;
  
                    form.nosubmit = true;
                    var submission = { data: data };
                    form.submission = submission;
  
                    form.on('change', function (event) { change(event); });
                    form.on('submit', async function (submission) { await submit(submission) });
                    form.on('submitDone', function (submission) { submitDone(submission) });
                }).catch(function (e) {
                    appendWarning("An error occurred loading the form, please check that the form id is valid: " + _formAdmin.formIOUniqueId, true, false);
                });
        };
  
        // Expose only what is necessary
        return {
            load: load,
            submit: submit,
            sendSubmissionData: sendSubmissionData,
            hideSubmissionQueue: hideSubmissionQueue
        }
    })();
  
    // Initialization logic
    function initForm(formAdmin, idSet, data, debug) {
      const containerId = 'formio-embed';
      let container = document.getElementById(containerId);
  
      if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        document.body.appendChild(container);
      }
  
      formHelper.load(containerId, formAdmin, idSet, data, debug);
    }
  
    // Expose initForm globally so it can be called from anywhere
    window.initForm = initForm;
  
  })();
  