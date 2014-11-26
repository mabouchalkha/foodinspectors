angular.module('services.i18n', ['pascalprecht.translate'])
    .app.config(['$translateProvider', function($translateProvider) {
          $translateProvider
            .translations('en', translations)
            .preferredLanguage('en');
         
         
        var translations = {
            NAV: {
                DASHBOARD : 'Dashboard',
                PARAGRAPH: 'And it comes with awesome features!'
            },
            HEADER: {
                PARAGRAPH: "@:NAV.PARAGRAPH"
            }
              
            // {
            //     "TRANSLATION_ID": "{{username}} is logged in."
            // }
            // $translate('TRANSLATION_ID', { username: 'mohamed amine' });
        };
    }]);