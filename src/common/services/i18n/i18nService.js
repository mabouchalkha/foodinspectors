angular.module('common.services.i18n.i18nService', [
    'pascalprecht.translate'
    ])
    .config(['$translateProvider', function($translateProvider) {
        $translateProvider.translations('en', translationsEn);
        $translateProvider.preferredLanguage('en');
         
         
        var translationsEn = {
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

        $translateProvider.translations('fr', translationsFr);

        var translationsFr = {
            NAV: {
                DASHBOARD : 'Tableau de bord',
                PARAGRAPH: 'Et il est livré avec des fonctionnalités impressionnantes!'
            },
            HEADER: {
                PARAGRAPH: "@:NAV.PARAGRAPH"
            }
        };
              
    }]);